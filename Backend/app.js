const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());

const PORT = 3000;

app.use(express.json());
app.use("/api", taskRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
