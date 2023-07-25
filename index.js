import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const port = 3000;
const app = express();

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/tododb");

const taskSchema = { name: String };

const Task = mongoose.model("Task", taskSchema);

const task1 = new Task({
  name: " ",
});

const task2 = new Task({
  name: " ",
});

const task3 = new Task({
  name: " ",
});

const defaultTasks = [task1, task2, task3];

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

let i = 0;
function addList(task) {
  if (i <= 2) {
    if (defaultTasks[i].name == " ") {
      const newTask = new Task({ name: task });

      Task.findByIdAndUpdate(defaultTasks[i], {
        $set: { name: task },
      }).then(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("update!", defaultTasks[i], "to: ", newTask, ".");
        }
      });

      console.log("repetição:", i);
    } else {
      const newTask = new Task({ name: task });
      defaultTasks.push(task);
      newTask.save();
      console.log(defaultTasks);
    }
    i++;
  } else {
    const newTask = new Task({ name: task });

    defaultTasks.push(task);
    newTask.save();
    console.log(defaultTasks);
  }
}

app.get("/", async (req, res) => {
  await Task.find({}).then(function (findItems) {
    if (findItems.length === 0) {
      i = 0;
      Task.insertMany(defaultTasks)
        .then(function () {
          console.log("Data inserted");
          console.log(findItems); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
      res.redirect("/");
    } else {
      res.render("index.ejs", {
        content: findItems,
        day: day,
        month: month,
        date: d.getDate(),
      });
    }
  });
});

app.post("/", (req, res) => {
  const task = req.body.newItem;

  addList(task);

  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const delTask = req.body.checkbox;
  console.log("Task ID select: ", delTask);

  Task.findByIdAndRemove(delTask).then(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("task excluded!");
    }
  });

  res.redirect("/");
});

app.listen(port, function () {
  console.log("server is running on", +port);
});
