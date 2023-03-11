import express from "express";
import morgan from "morgan";
//Myrouters
import astroRoutes from "./routes/astro.routes";
import userRoutes from "./routes/user.routes";
import { sequelize } from "./config/db.config";

const Apstro = {
  main: async () => {
    const app = express();

    const port = process.env.PORT || 4000;

    // Settings
    app.set("port", port);

    // Middlewares
    app.use(morgan("dev"));
    app.use(express.json());

    //Myroutes
    app.use("/api/astros", astroRoutes);
    app.use("/api/users", userRoutes);

    // start the server
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);

    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
};

export default Apstro;
