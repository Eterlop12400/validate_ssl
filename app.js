"use strict"
let express = require("express");
let ejs = require("ejs");
let bodyParser = require("body-parser");
let request = require("request");

let router = express.Router();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express)

// Routes
router.get("/", (req, res) => {
    res.render("index", {
        pagename: "index"
    })
})

router.get("/about", (req, res) => {
    res.render("about", {
        pagename: "about"
    })
})

router.get("/portfolio", (req, res) => {
    res.render("portfolio", {
        pagename: "portfolio"
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        pagename: "register"
    })
})

router.post("/login", (req, res) => {
    console.log(req.body);
    let errors = [];
    // Validate the email not blank.
    if(req.body.email.trim() === "") {
        errors.push("Email cannot be blank");
    }

    // Validate the password not blank.
    if(req.body.password.trim() === "") {
        errors.push("Password cannot be blank");
    }

    // Validate the email incorrect format.
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/.test(req.body.email)) {
        errors.push("Invalid Email address");
    }

    // Validate the password incorrect format.
    if(!/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*.])[\w!@#&%^&*.]{8,}$/.test(req.body.password)) {
        errors.push("Invalid password format");
    }
    res.render("index", {
        pagename: "index",
        errs: errors,
    })
})






// Declare Static File Locations
app.use(express.static("views"));
app.use(express.static("public"));
app.use("/", router);
// Start Server
let server = app.listen("8080", () => {
    console.log("Server running on port 8080");
});