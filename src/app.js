const express = require("express");
const hbs = require("hbs");
const path = require("path");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no value entered"
    });
  }
  geocode(req.query.address, (error, { location, longitude, latitude }) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(longitude, latitude, (error, { forecast }) => {
      res.send({
        forecast,
        location
      });
    });
  });
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
