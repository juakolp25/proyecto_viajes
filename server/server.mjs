import app from "./server/index.js";
import dotenv from "dotenv";

import "./db/conn.mjs";

dotenv.config();

const port = process.env.PORT || 5050;


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
