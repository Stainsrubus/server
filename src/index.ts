import { app } from "./setup";

const PORT = 4000;

app.listen(
  {
    port:PORT,
  },
  ()=>{
    console.log(`listening on port ${PORT}`);
  }
);