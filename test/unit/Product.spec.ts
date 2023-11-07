import { randomUUID } from "crypto"
import { Product } from "../../src/application/product/Product"

describe("Product unit tests", () => {

    it("should throw error when enable a product with the price < 0", () => {
        const product = new Product(randomUUID(), "product - 01", 0)
        expect(() => {
            product.enable()
        }).toThrowError("the price must be greater than zero to enable the product")
    })

    it("should be able enable a product", () => {
        const product = new Product(randomUUID(), "product - 01", 100.50);
        product.enable()
        expect(product.getStatus()).toBe("enabled")
    })

    it("should throw error when disable a product with the price > 0", () => {
        const product = new Product(randomUUID(), "product - 01", 10)
        expect(() => {
            product.disable()
        }).toThrowError("the price must be zero in order to have the product disabled")
    })

    it("should be able disable a product", () => {
        const product = new Product(randomUUID(), "product - 01", 100.50);
        product.setPrice(0)
        product.disable()
        expect(product.getStatus()).toBe("disabled")
    })

    it("should be able the price to be zero", () => {
        const product = new Product(randomUUID(), "product - 01", 100.50);
        product.setPrice(0)
        expect(product.getPrice()).toBe(0)
    })
})