const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;
const dateDuration = require("./src/helper/duration");

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set serving static file
app.use(express.static("src/assets"));

// parsing data from client
app.use(express.urlencoded({ extended: false }));

let dataBlog = [];

// routing
app.get("/", home);
app.get("/blog", blog);
app.post("/blog", addBlog);
app.get("/contact", contact);
app.get("/blog-detail/:id", blogDetail);
app.get("/form-blog", formBlog);
app.get("/delete-blog/:id", deleteBlog);
app.get("/edit-blog/:id", viewEditBlog);
app.post("/edit-blog/:id", updateBlog);
// app.post('/form-blog', addBlog)

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// index
function home(req, res) {
  let dataBlogRes = dataBlog.map((item) => {
    return {
      ...item,
      duration: dateDuration(item.startDate, item.endDate),
    };
  });
  res.render("index", { dataBlog: dataBlogRes });
}

// blog
function blog(req, res) {
  res.render("blog");
}

// form blog
function formBlog(req, res) {
  res.render("form-blog");
}

// contact me
function contact(req, res) {
  res.render("contact");
}

//delete blog
function deleteBlog(req, res) {
  const { id } = req.params;

  dataBlog.splice(id, 1);
  res.redirect("/");
}

// blog detail
function blogDetail(req, res) {
  const { id } = req.params;

  res.render("blog-detail", { blog: dataBlog[id] });
}

// add a new blog
function addBlog(req, res) {
  const {
    title,
    author,
    content,
    startDate,
    endDate,
    nodejs,
    js,
    react,
    vuejs,
  } = req.body;

  const data = {
    id: new Date().getTime(),
    title: title,
    author: author,
    content: content,
    startDate: startDate,
    endDate: endDate,
    nodeJs: nodejs,
    js: js,
    react: react,
    vuejs: vuejs,
    image: "image.png",
    postedAt: new Date(),
  };

  dataBlog.push(data);
  res.redirect("/");
}

// view edit Blog with index/id
function viewEditBlog(req, res) {
  const { id } = req.params;
  //   const dataIndex = parseInt(id);

  //   if (dataBlog.length > dataIndex && dataIndex >= 0) {
  //     const dataEdit = dataBlog[dataIndex];
  //     dataEdit.id = dataIndex;

  //     res.render("edit-blog", {
  //       edit: dataEdit,
  //       dataBlog,
  //     });
  //   } else {
  //     res.send('<h2 class="fw-bold m-3 text-center">Data Not Found</h2>');
  //   }
  //   console.log("datates:", dataBlog);
  // }

  res.render("edit-blog", { edit: dataBlog[id] });
  console.log("data masuk :", dataBlog);
}

// edit blog
function updateBlog(req, res) {
  const { id } = req.params;
  const {
    title,
    content,
    author,
    startDate,
    endDate,
    nodejs,
    js,
    react,
    vuejs,
  } = req.body;
  let updateDataBlog = {
    title: title,
    content: content,
    author: author,
    startDate: startDate,
    endDate: endDate,
    nodeJs: nodejs,
    js: js,
    react: react,
    vuejs: vuejs,
    image: "image.png",
    postedAt: new Date(),
  };
  // updateDataBlog = dataBlog.filter((item) => {
  //   return item.id != id;
  // });
  // updateDataBlog.unshift(dataBlog);
  dataBlog[parseInt(id)] = updateDataBlog;
  res.redirect("/");
  console.log("sudah terupdate :", dataBlog);
}
