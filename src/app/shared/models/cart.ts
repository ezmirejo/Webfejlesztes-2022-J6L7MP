import { CarpetInCart } from "./carpet-in-cart";
import { User } from "./user";

export interface Cart {
    userId: string,
    carpetsInCart: Array<CarpetInCart>
}
