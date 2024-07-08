import db from "../modelsSQL/indexSQL.js";

db.connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => db.connection.close());