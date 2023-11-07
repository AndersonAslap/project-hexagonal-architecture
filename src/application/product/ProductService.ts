import { UUID } from "crypto";
import { Product } from "./Product";
import { ProductRepositoryInterface } from "./interfaces/ProductRepositoryInterface";
import { ProductServiceInterface } from "./interfaces/ProductServiceInterface";

export class ProductService implements ProductServiceInterface {

    constructor(readonly repository: ProductRepositoryInterface){}

    async get(id: UUID): Promise<Product> {
        const output = await this.repository.get(id)
        return output
    }

    async create(id: UUID, name: string, price: number): Promise<Product> {
        const product = new Product(id, name, price)
        const output = await this.repository.save(product)
        return output
    }

    async enable(product: Product): Promise<Product> {
        product.enable()
        const output = await this.repository.save(product)
        return output
    }

    async disable(product: Product): Promise<Product> {
        product.disable()
        const output = await this.repository.save(product)
        return output
    }
}