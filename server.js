const express = require("express");
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 3000;
app.use("/", (req, res) => res.sendFile("index.html"));
app.listen(port, (req, res) => console.log("Listening on port 3000"));
