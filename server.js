const express = require("express");
const http = require("http");
const path = require("path");
const { features } = require("process");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const publicPathDirectory = path.join(__dirname, "dist");

app.use(express.static(publicPathDirectory));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPathDirectory, "index.html"));
});

server.listen(port, () => {
  console.log(`Server is running ${port}`);
});

// prob State
// features
// implementation
// scope
