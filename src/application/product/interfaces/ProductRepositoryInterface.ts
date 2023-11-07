import { UUID } from "crypto";
import { Product } from "../Product";

interface ProductReader {
    get(id: UUID): Promise<Product>
}

interface ProductWriter {
    save(product: Product): Promise<Product>
}

export interface ProductRepositoryInterface extends ProductReader, ProductWriter {}