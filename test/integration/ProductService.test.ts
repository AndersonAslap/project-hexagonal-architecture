import { UUID, randomUUID } from "crypto"
import { ProductRepositoryInterface } from "../../src/application/product/interfaces/ProductRepositoryInterface"
import { Product } from "../../src/application/product/Product"
import { ProductServiceInterface } from "../../src/application/product/interfaces/ProductServiceInterface"
import { ProductService } from "../../src/application/product/ProductService"
import { SqliteConnectionDatabase } from "../../src/adapters/database/adapter/SqliteConnectionDatabase"
import { ConnectionDatabase } from "../../src/adapters/database/ConnectionDatabase"
import { ProductRepositoryDatabase } from "../../src/adapters/database/adapter/ProductRepositoryDatabase"

let connection: ConnectionDatabase
let productRepository: ProductRepositoryInterface
let productService: ProductServiceInterface

describe("product service test integration", () => {

    beforeEach(async () => {
        connection = new SqliteConnectionDatabase()
        productRepository = new ProductRepositoryDatabase(connection)
        productService = new ProductService(productRepository)
        await SqliteConnectionDatabase.initializeDatabase(connection.connect())
    })

    afterEach(async () => {
        await connection.close()
    })

    it("should throw error get a product inexistent", async () => {
        await expect(async () => {
            await productService.get(randomUUID())
        }).rejects.toThrowError("product not exists")
    })

    it("should be able to get a product", async () => {
        const idProduct = randomUUID()
        await productService.create(idProduct, "product - 01", 10) 
        const product = await productService.get(idProduct)
        expect(product.id).toBe(idProduct)
        expect(product.name).toBe("product - 01")
        expect(product.getPrice()).toBe(10)
    })

    it("should be able to create a product", async () => {
        const product = await productService.create(randomUUID(), "product - 01", 77) 
        await productService.get(product.id)
        expect(product.getPrice()).toBe(77)
    })

    it("should be able enable a product", async () => {
        const product = await productService.create(randomUUID(), "product - 01", 13) 
        const output = await productService.enable(product)
        expect(output.getStatus()).toBe("enabled")
    })

    it("should be able disable a product", async () => {
        const product = await productService.create(randomUUID(), "product - 01", 15) 
        product.setPrice(0)
        const output = await productService.disable(product)
        expect(output.getStatus()).toBe("disabled")
    })
})