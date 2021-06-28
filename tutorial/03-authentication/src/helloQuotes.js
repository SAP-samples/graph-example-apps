// Hello Quote - our first SAP Graph extension app

const express = require("express");
const Graph = require("./graph");
const Auth = require("./auth");
const app = express();
const port = 3003;

const auth = new Auth();

app.use(auth.getMiddleware());
const graph = new Graph(auth);

// ------------------ 1) get and display a list of CustomerQuotes ------------------
app.get('/', async (req, res) => {
    const quotes = await graph.get(req, "sap.odm.sales/CustomerQuote", "$top=20");
    const qlist = quotes.value.map(q => `<p> <a href="/quote/${q.id}">${q.effectiveDate} </a> (${q.totalAmount} USD) </p>`).join("");
    res.send(`
      <h1>Hello Quotes</h1>
      ${qlist}
`);
});

// ------------------ 2) show one quote and its items ------------------

app.get('/quote/:id', async (req, res) => {
    const id = req.params.id;
    const singleQuote = await graph.get(req, `sap.odm.sales/CustomerQuote/${id}`, "$expand=items&$select=items");
    res.send(`
      <h1>Customer Quote - Detail</h1>
      <h4><code>id: ${id}</code></h4>
      <a href="/quote/${id}/product"><button>Product Details</button></a>
      <pre><code>${JSON.stringify(singleQuote, null, 2)}</code></pre>
    `);
});

// ------------------ 3) navigate to the product details for all the items in the quote ------------------
app.get('/quote/:id/product', async (req, res) => {
    const id = req.params.id;
    const singleQuote = await graph.get(req, `sap.odm.sales/CustomerQuote/${id}`, "$expand=items($expand=product($select=displayId))&$select=items");
    const productIds = singleQuote.items.map(i => i.product.displayId);
    const filterClause = productIds.map(p => `displayId eq '${p}'`).join(" or ");
    const products = await graph.get(req, `sap.odm.product/Product`, `$filter=${filterClause}`);
    res.send(`
      <h1>Products for Customer Quote</h1>
      <h4><code>id: ${id}</code></h4>
      <pre><code>${JSON.stringify(products, null, 2)}</code></pre>
    `);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
