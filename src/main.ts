import express, { Request, Response } from "express";
import { validate } from "./validator";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

app.post("/checkout", async function (req: Request, res: Response) {
	const output: Output = {
		total: 0
	};
	const connection = pgp()("postgres://postgres:123456@localhost:5432/cccat10");

	if (req.body?.items?.some((item: any) => item.quantity < 0)) {
		output.message = "Invalid quantity";
	} else if (req.body?.items?.some((item: any) => req.body.items.filter((i: any) => i.idProduct === item.idProduct)?.length >= 2)) {
		output.message = "Repeated products";
	} else {
		if (req.body.items) {
			let products = [];
			for (const item of req.body.items) {
				const [productData] = await connection.query("select * from cccat10.product where id_product = $1", item.idProduct);
				output.total += parseFloat(productData.price) * item.quantity;
				products.push(productData);
			}

			if (products.some((item: Product) => parseFloat(item.height) < 0 || parseFloat(item.width) < 0 || parseFloat(item.depth) < 0)){
				output.message = "Invalid dimension";
			}
	
			if (req.body.coupon) {
				const [couponData] = await connection.query("select * from cccat10.coupon where code = $1", [req.body.coupon]);
				const expiration = couponData.expiration;
				if (expiration >= new Date().getTime()){
					const percentage = parseFloat(couponData.percentage);
					output.total -= (output.total * percentage)/100;
				}
			}
		}
	}
	const isValid = validate(req.body.cpf);
	if (!isValid) output.message = "Invalid cpf";
	await connection.$pool.end();
	res.json(output);
});

type Product = {
	height: string,
	width: string,
	depth: string
}

type Output = {
	total: number,
	message?: string
}

app.listen(3000);