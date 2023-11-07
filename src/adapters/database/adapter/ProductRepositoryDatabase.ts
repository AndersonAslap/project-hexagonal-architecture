import { UUID } from "crypto";
import { ProductRepositoryInterface } from "../../../application/product/interfaces/ProductRepositoryInterface";
import { ConnectionDatabase } from "../ConnectionDatabase";
import { Product } from "../../../application/product/Product";

export class ProductRepositoryDatabase implements ProductRepositoryInterface {

    constructor(readonly connection: ConnectionDatabase) {}

    async get(id: UUID): Promise<Product> {
        const [productData] = await this.connection.query('SELECT * FROM products WHERE id = ?', [id])
        if (!productData) throw new Error("product not exists")
        const product = new Product(productData.id, productData.name, productData.price)
        if (productData.status === "enabled") 
            product.enable()
        return product;
    }
    
    async save(product: Product): Promise<Product> {
        const [productData] = await this.connection.query('SELECT * FROM products WHERE id = ?', [product.id]);
        if (!productData) {
            await this.connection.query('INSERT INTO products(id, name, price, status) VALUES (?, ?, ?, ?)', [product.id, product.name, product.getPrice(), product.getStatus()]);
        } else {
            await this.connection.query('UPDATE products SET status = ? WHERE id = ?', [product.getStatus(), product.id]);
        }
        return product;
    }
}
