import { UUID } from "crypto";
import { Product } from "../Product";

export interface ProductServiceInterface {
    get(id: UUID): Promise<Product>
    create(id: UUID, name: string, price: number): Promise<Product>
    enable(product: Product): Promise<Product>
    disable(product: Product): Promise<Product>
}