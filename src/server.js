import express from "express";
import cors from "cors";
import listEndpoints from "list-endpoints-express";
import { pgConnect } from "./db.js";
import productRouter from "./api/products/product.js";
import categoryRouter from "./api/category/category.js";
import usersRouter from "./api/users/user.js";
import reviewRouter from "./api/review/review.js";
import { syncModels } from "./db.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/users", usersRouter);
server.use("/reviews", reviewRouter);

await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("server listening on port " + port);
});
