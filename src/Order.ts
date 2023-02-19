import Product from "./Product"
import Consumer from "./Consumer"

export default class Order {
    consumer: Consumer;
    products: Product[];
    discount: number;

    constructor (consumer: Consumer) {
        this.consumer = consumer;
        this.products = [];
        this.discount = 0;
    }

    addProduct (description: string, price: number, quantity: number) {
        this.products.push(new Product(description, price, quantity));
    }

    addTicket (ticket: string){
        const activeTickets = [ { ticket: "sunday10", discount: 0.1 }];
        this.discount = activeTickets.find(item => item.ticket === ticket)?.discount || 0;
    }

    calculateTotal () {
        const totalProducts = this.products.reduce((partialSum, product) => partialSum + (product.price * product.quantity), 0);
        const totalDiscount = (this.discount * totalProducts);
        return totalProducts - totalDiscount;
    }
}