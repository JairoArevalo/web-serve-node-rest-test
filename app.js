import  "dotenv/config";
import { Server } from "./models/serve.js";

const serve = new Server();


serve.listen();