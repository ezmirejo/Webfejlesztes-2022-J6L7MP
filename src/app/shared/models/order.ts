import { Cart } from "./cart";

export interface Order {
    orderId: string,
    cart: Cart
    orderDate: Date
}