import express from "express";
import cors from "cors";
import {readdirSync} from "fs";
import mongoose from "mongoose";

require("dotenv").config();


// create express app
const app = express();

// db
mongoose
    .connect("mongodb+srv://galaya:galaya@cluster0.65hny.mongodb.net/MERN?retryWrites=true&w=majority", {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR => ", err));

// apply middlewares
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json({limit: "5mb"}));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));


// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
