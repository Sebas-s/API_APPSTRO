import express from "express";
import morgan from "morgan";
//Myrouters
import astroRoutes from "./routes/astro.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());


//Myroutes
app.use("/api/astros", astroRoutes);
app.use("/api/users", userRoutes);

export default app;
