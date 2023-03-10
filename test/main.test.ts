import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Não deve aceitar um pedido com cpf inválido", async function () {
	const input = {
		cpf: "406.302.170-27"
	}
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Invalid cpf");
});

test("Deve criar um pedido vazio", async function () {
	const input = {
		cpf: "407.302.170-27"
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 produtos", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(4872);
});

test("Não deve aplicar cupom de desconto expirado", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE30"
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(6090);
});

test("Ao fazer um pedido, a quantidade de um item não pode ser negativa", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: -1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Invalid quantity");
});

test("Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 1, quantity: 3 }
		],
		coupon: "VALE30"
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Repeated products");
});

test("Nenhuma dimensão do item pode ser negativa", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 7, quantity: 1 },
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Invalid dimension");
});

test("O peso do item não pode ser negativo", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 8, quantity: 1 },
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Invalid weight");
});

test("Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 4, quantity: 2 },
			{ idProduct: 5, quantity: 1 },
			{ idProduct: 6, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.shipping).toBe("R$ 449.98");
});

test("Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 4, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.shipping).toBe("R$ 10.00");
});