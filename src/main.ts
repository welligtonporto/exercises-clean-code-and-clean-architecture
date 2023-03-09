import express, { Request, Response } from "express";
import { validate } from "./validator";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

const DISTANCE = 1000;

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
				const volume = (productData.width * productData.height * productData.depth);
				const density = parseInt(`${productData.weight / volume}`);
				const unitShipping = DISTANCE * volume * (density / 100);
				const shipping = unitShipping * item.quantity;
				products.push({
					...productData,
					shipping
				});
			}

			const totalShipping = products.reduce((partialSum, item) => partialSum + item.shipping, 0);
			output.shipping = totalShipping > 10 ? `R$ ${totalShipping}` : `R$ 10.00`;

			if (products.some((item: Product) => parseFloat(item.height) < 0 || parseFloat(item.width) < 0 || parseFloat(item.depth) < 0)){
				output.message = "Invalid dimension";
			} else if (products.some((item: Product) => parseFloat(item.weight) < 0)) {
				output.message = "Invalid weight";
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
	depth: string,
	weight: string
}

type Output = {
	total: number,
	shipping?: string,
	message?: string
}

app.listen(3000);