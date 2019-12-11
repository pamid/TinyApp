const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine","ejs");


function generateRandomString(outputLength) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < outputLength; i ++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
})

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// new route submission form :
app.get("/urls/new", (req,res)=>{ 
  res.render("urls_new");
})
// the form in the urls/new generates 
app.post("/urls" ,(req,res) => {
  longURL = req.body.longURL;
  if(longURL.indexOf("http") == 0 ) {
      longURL = req.body.longURL;
  } else {   
      longURL = "http://" + req.body.longURL;
  }
  if (!Object.values(urlDatabase).includes(longURL)) {
    shortURL = generateRandomString(6); 
    urlDatabase[shortURL] = longURL;
  }
res.redirect(longURL);
    
})



app.get("/urls", (req, res) => {
  let templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);

  // res.render("urls_index", urlDatabase);
});





app.get("/urls/:shortURL", (req, res) => {
  let templateVars = {shortURL: req.params.shortURL,
                      longURL: urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
  // res.render("urls_index", urlDatabase);
});


app.get("/u/:shortURL", (req, res) => {
  longURL= urlDatabase[req.params.shortURL];
  res.redirect(longURL);
  // res.render("urls_index", urlDatabase);
});