import Order from "../src/Order";
import Consumer from "../src/Consumer";

test("Deve criar um pedido com 3 produtos (com descrição, preço e quantidade) e calcular o valor total", function(){
    const consumer = new Consumer("Welligton", "18300920064");
    const order = new Order(consumer);
    order.addProduct("Luva", 10, 1);
    order.addProduct("Resina", 15, 2);
    order.addProduct("Autoclave", 5000, 1);
    const total = order.calculateTotal();
    expect(total).toBe(5040);
});

test("Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total (percentual sobre o total do pedido)", function(){
    const consumer = new Consumer("Welligton", "18300920064");
    const order = new Order(consumer);
    order.addProduct("Luva", 10, 1);
    order.addProduct("Resina", 15, 2);
    order.addProduct("Autoclave", 5000, 1);
    order.addTicket("sunday10");
    const total = order.calculateTotal();
    expect(total).toBe(4536);
});

test("Não deve criar um pedido com cpf inválido (lançar algum tipo de erro)", function(){
    // expect(() => new Consumer("Welligton", null)).toThrow(new Error("Invalid cpf"));
    // expect(() => new Consumer("Welligton", undefined)).toThrow(new Error("Invalid cpf"));
    expect(() => new Consumer("Welligton", "11111111111")).toThrow(new Error("Invalid cpf"));
});