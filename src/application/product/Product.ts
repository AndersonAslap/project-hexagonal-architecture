import { UUID } from "crypto";
import { PRODUCT_STATUS, ProductInterface } from "./interfaces/ProductInterface";

export class Product implements ProductInterface {
    private status: PRODUCT_STATUS

    constructor(readonly id: UUID, readonly name: string, private price: number){
        this.status = PRODUCT_STATUS.DISABLED 
        this.isValid()
    }

    setPrice(price: number): void {
        this.price = price
        this.isValid() 
    }

    getStatus(): string {
        return this.status
    }

    getPrice(): number {
        return this.price
    }
    
    enable(): Error | void {
        if (this.price > 0) {
            this.status = PRODUCT_STATUS.ENABLED
            this.isValid()
            return
        } 
        throw new Error("the price must be greater than zero to enable the product")
    }
    
    disable(): Error | void {
        if (this.price === 0) {
            this.status = PRODUCT_STATUS.DISABLED
            this.isValid()
            return
        }
        throw new Error("the price must be zero in order to have the product disabled")
    }

    isValid(): Error | void {
        if (!this.id) throw new Error("Id is missing")
        if (!this.name) throw new Error("Name is missing") 
        if (this.price < 0) throw new Error("Price is invalid")
        if (this.status !== PRODUCT_STATUS.ENABLED && this.status !== PRODUCT_STATUS.DISABLED) throw new Error("Status is invalid")
    }
}