import { CarpetType } from "./carpet-type";

export interface Carpet {
    name: string,
    priceInHuf: number,
    imageUrl: string,
    height: number,
    width: number,
    type: CarpetType
}
