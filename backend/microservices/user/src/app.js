import express from "express";
import userRouter from "./infrastructure/routes/userRouter.js";

const app = express();

app.use(express.json());

app.use(userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
