import { ProductService } from "../../application/product/ProductService";
import { SqliteConnectionDatabase } from "../database/adapter/SqliteConnectionDatabase";
import { ProductRepositoryDatabase } from "../database/adapter/ProductRepositoryDatabase";
import { HttpController } from "./HttpController";
import { ExpressAdapter } from "./adapter/ExpressAdapter";

const connection = new SqliteConnectionDatabase()
SqliteConnectionDatabase.initializeDatabase(connection.connect())
const productRepository = new ProductRepositoryDatabase(connection)
const productService = new ProductService(productRepository)
const httpServer = new ExpressAdapter()
new HttpController(httpServer, productService)
httpServer.listen(3031)