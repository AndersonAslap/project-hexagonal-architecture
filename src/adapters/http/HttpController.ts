import { Product } from "../../application/product/Product";
import { ProductServiceInterface } from "../../application/product/interfaces/ProductServiceInterface";
import { HttpServer } from "./HttpServer";

export class HttpController {

    constructor(httpServer: HttpServer, productService: ProductServiceInterface) {
        httpServer.on('post', '/product', async function(params: any, body: any, headers: any) {
            const { id, name, price } = body
            const output = await productService.create(id, name, price)
            return output
        })

        httpServer.on('get', '/product/:id', async function(params: any, body: any, headers: any) {
            const id = params.id 
            const output = await productService.get(id)
            return output
        })

        httpServer.on('post', '/product/enable', async function(params: any, body: any, headers: any) {
            const { id, name, price } = body
            const product = new Product(id, name, price) 
            const output = await productService.enable(product)
            return output
        })

        httpServer.on('post', '/product/disable', async function(params: any, body: any, headers: any) {
            const { id, name, price } = body
            const product = new Product(id, name, price) 
            const output = await productService.disable(product)
            return output
        })
    }
}