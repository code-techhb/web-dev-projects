const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./module/replaceTemplate");

// read files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const dataObj = JSON.parse(data);

// Basic routing
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCTCARD%}", cardsHTML);

    res.end(output);
  }

  // PRODUCT
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    res.writeHead(200, { "content-type": "text/html" });
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server has been started on port 8000");
});
