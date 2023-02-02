import express from "express";
import cors from "cors";
import listEndpoints from "list-endpoints-express";
import { pgConnect } from "./db.js";
import productRouter from "./api/products/product.js";
import { syncModels } from "./db.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use("/products", productRouter);

await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("server listening on port " + port);
});
