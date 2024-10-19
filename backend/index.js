import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

app.listen(8000, () => console.log("Server running"));
