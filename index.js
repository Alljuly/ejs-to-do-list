import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let month = months[d.getMonth()];

let day = days[d.getDay()];

let item = [" ", " ", " "];
let i = 0;

function addList(task) {
  if (i <= 2) {
    if (item[i] == " ") {
      item[i] = task;
    }
    i++;
  } else {
    item.push(task);
  }
}

const data = {
  items: item,
  day: day,
  month: month,
  date: d.getDate(),
};
app.get("/", (req, res) => {
  res.render("index.ejs", data);
  console.log(data.items);
});

app.post("/", (req, res) => {
  const task = req.body["newItem"];
  addList(task);

  res.redirect("/");
});

app.listen(port, function () {
  console.log("server ir running on", +port);
});
