const express = require("express")
const hbs = require("hbs");
const axios = require("axios")
const path = require("path");
const tamplatesPath = path.join(__dirname, "../templates/views")
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT||3000
const app = express()
app.set("views", tamplatesPath)
app.set("view engine", "hbs")
app.get("/", (req, res) => {
    res.render("single_News_page")
    app.use(express.static(publicPath));
})

// endPoint of Server 

app.get("/api", async (req, res) => {
    let url = 'https://newsapi.org/v2/everything?'+ req._parsedUrl.query
    console.log(req._parsedUrl.query)
    try {
        // agar fullfil (resolve,reject)to val await se then and catch no
        const response = await axios(url)
        const responseData = response.data
        res.json(responseData)
    } catch (error) {
        console.log(error)
    }
});
app.listen(port, () => {
    console.log("server is start.....")
})
