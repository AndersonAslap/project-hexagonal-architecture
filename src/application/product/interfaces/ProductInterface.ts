export enum PRODUCT_STATUS {
    DISABLED = "disabled",
    ENABLED = "enabled"
}

export interface ProductInterface {
    isValid(): Error | void
    enable(): Error | void
    disable(): Error | void
    setPrice(price: number): void
    getStatus(): string
    getPrice(): number
}