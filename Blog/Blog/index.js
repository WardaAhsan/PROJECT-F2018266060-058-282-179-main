const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Blog = require("./models/blogs");

const app = express();
const port = process.env.PORT || 8080;

//data decode the data embeded inside request Body
app.use(express.urlencoded({ extended: true }));

//static assets
app.use(express.static(path.join(__dirname, "public")));

//view Engine
app.set("view Engine ", "ejs");
app.set("views", path.join(__dirname, "/views"));

//mongodb connection string
const connectionString =
  "mongodb://Warda:harris@cluster0-shard-00-00.vtx97.mongodb.net:27017,cluster0-shard-00-01.vtx97.mongodb.net:27017,cluster0-shard-00-02.vtx97.mongodb.net:27017/project?ssl=true&replicaSet=atlas-ge67i5-shard-0&authSource=admin&retryWrites=true&w=majority";

//Home Route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Render a form to create new Blog Route
app.get("/blogs/new", (req, res) => {
  res.render("blogs/new-blog.ejs");
});

// app.get("/blogs",(req,res)=>{
//   res.send("Get Request Data Receieved");
// });

// app.post("/blogs",(req,res)=>{
//   res.send("Post Request Data Receieved");
// });

//Read all blogs
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  //console.log(blogs);
  res.render("blogs/all-blogs.ejs", { blogs });
});

app.use(express.static(__dirname + "/public"));

//SHOW DETAIL ROUTE
app.get("/blogs/:id", async (req, res) => {
  //show details of a particuler blog
  const id = req.params.id;
  const blog = await Blog.findById(id);
  res.render("blogs/show-blog.ejs", { blog });
});

//RENDER UPDATE BLOG PAGE
app.get("/blogs/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/edit-blog.ejs", { blog });
});

app.post("/blogs/edit/", async (req, res) => {
  //console.log(req.body);
  const blogs = await Blog.find();
  const filter = { name: req.body.id };
  tBlog = await Blog.findOne(filter);
  //console.log(tBlog.Description)
  await tBlog.update({ Description: req.body.Description });
  res.render("blogs/all-blogs.ejs", { blogs });
});
// delete blog post
app.get('/delete/:id', async function (req, res) {
  try {
  await Blog.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.send(error.message);
  }
  res.redirect("/blogs");
});


// app.post("/blogs/edit", async (req, res) => {
//   console.log(req.params.id);
//   const blog = await Blog.findById(req.params.id);
//   res.render("blogs/edit-blog.ejs", { blog });
// });

//Create new blog
app.post("/blogs", async (req, res) => {
  //extract form data
  console.log(req.body);
  const Title = req.body.Title;
  const Author_Name = req.body.Author_name;
  const Description = req.body.Description;
  //save the extracted data into my mongoDB database
  const blog = new Blog({
    Title: Title,
    Author_Name: Author_Name,
    Description: Description,
  });

  await blog.save();
  res.redirect("/blogs");
});

app.listen(port, () => {
  console.log("Server Listening at Port:", port);
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.log(error.message);
  });
