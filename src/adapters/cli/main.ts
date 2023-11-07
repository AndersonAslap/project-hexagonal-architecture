import { UUID, randomUUID } from "crypto"
import { ProductService } from "../../application/product/ProductService"
import { SqliteConnectionDatabase } from "../database/adapter/SqliteConnectionDatabase"
import { ProductRepositoryDatabase } from "../database/adapter/ProductRepositoryDatabase"

const connection = new SqliteConnectionDatabase()
SqliteConnectionDatabase.initializeDatabase(connection.connect())
const productRepository = new ProductRepositoryDatabase(connection)
const productService = new ProductService(productRepository)

process.stdin.on("data", async function(data){
    const command = data.toString().replace(/\n/g, '')

    if(command.startsWith("create-product")){
        const input = command.replace('create-product ', '')
        const inputData = input.split(" ")
        const productInput = {
            id: randomUUID(),
            name: inputData[0].replace('_', ' '),
            price: parseFloat(inputData[1])
        }
        try {
            const output = await productService.create(productInput.id, productInput.name, productInput.price)    
            console.log('\x1b[32m%s\x1b[0m', `Product ID: ${output.id} has been created`);
        } catch(e: any) {
            console.log('\x1b[31m%s\x1b[0m', e.message)
        }
        return
    }
    if(command.startsWith("enable-product")){
        const input = command.replace('enable-product ', '') as UUID
        const productInput = { id: input }
        try {
            const product = await productService.get(productInput.id)  
            const output = await productService.enable(product)
            console.log('\x1b[32m%s\x1b[0m', `Product ID: ${output.id} has been ${output.getStatus()}`);
        } catch(e: any) {
            console.log('\x1b[31m%s\x1b[0m', e.message)
        }
        return
    }
    if(command.startsWith("disable-product")){
        const input = command.replace('disable-product ', '') as UUID
        const productInput = { id: input }
        try {
            const product = await productService.get(productInput.id)  
            const output = await productService.disable(product)
            console.log('\x1b[32m%s\x1b[0m', `Product ID: ${output.id} has been ${output.getStatus()}`);
        } catch(e: any) {
            console.log('\x1b[31m%s\x1b[0m', e.message)
        } 
        return
    }
    console.log('\x1b[31m%s\x1b[0m', 'Invalid command');
})