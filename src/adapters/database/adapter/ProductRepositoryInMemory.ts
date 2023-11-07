import { UUID } from "crypto";
import { ProductRepositoryInterface } from "../../../application/product/interfaces/ProductRepositoryInterface";
import { Product } from "../../../application/product/Product";

export class ProductRepositoryInMemory implements ProductRepositoryInterface {

    products: Array<Product>

    constructor() {
        this.products = []
    }

    async get(id: UUID): Promise<Product> {
        const product = this.products.find(product => product.id === id)
        if (!product) throw new Error("product not exists")
        return product
    }

    async save(product: Product): Promise<Product> {
        const index = this.products.findIndex(product_ => product_.id === product.id);
        if (index === -1) {
            this.products.push(product)
        } else {
            this.products[index] = product
        }
        return product
    }
}