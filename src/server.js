import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("server listening on port " + port);
});
