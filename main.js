const express = require("express");
const path = require("path");
const { rootRouter } = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const pathPublicDirectory = path.join(__dirname, "./public");
app.use("./public", express.static(pathPublicDirectory));

// app router
app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/v1", rootRouter);
//

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Server Error",
    },
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("App listening on port", port);
  try {
    console.log("Connect to Database successfully");
  } catch (err) {
    console.error("Unable to connect to Database:", err);
  }
});
