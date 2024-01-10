const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const { connectToMongoDB } = require("./connnection");



const URL = require("./models/url");
// const User = require("./models/url");

const userRoute = require("./routes/user")
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { restrictTo, checkForAuthentication} = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

// telling the express server that view engine is ejs
app.set("view engine", "ejs");
// and telling the server that ejs files are in views folder
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(checkForAuthentication)

// inline middleware
app.use("/", staticRoute);
app.use("/user",userRoute);
app.use("/url", restrictTo(['NORMAL']), urlRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          // not giving error on different fields name but not showing the data
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server listening on the port: ${PORT}`);
});
