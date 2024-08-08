import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { AdminRouter} from "./controllers";

const app = new Elysia();
app.use(cors());

const URL= "mongodb+srv://rasla:cADTsBBN1imb7ZXx@cluster0.b2zxaqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try {
  await mongoose.connect(URL as string, {
    dbName: "sunstar",
  });

  console.log("Connected to Database");
} catch (e) {
  console.log(e);
}

app.onError(({ code, error }) => {
  if (code === "VALIDATION") {
    return {
      status: 400,
      body: error.all,
    };
  }
});

app.use(AdminRouter)
export { app };
