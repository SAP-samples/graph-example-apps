// Hello Quote - our first SAP Graph extension app

const express = require("express");
const Graph = require("./graph");
const Auth = require("./auth");
const app = express();
const port = 3003;

const auth = new Auth();

app.use(auth.getMiddleware());
const graph = new Graph(auth);

// ------------------ 1) get and display a list of SalesQuotes ------------------
app.get('/', async (req, res) => {
    const quotes = await graph.get(req, "sap.graph/SalesQuote", "$top=20");
    const qlist = quotes.value.map(q => `<p> <a href="/quote/${q.id}">${q.pricingDate} </a> (${q.netAmount} ${q.netAmountCurrency}) </p>`).join("");
    res.send(`
      <h1>Hello Quotes</h1>
      ${qlist}
`);
});

// ------------------ 2) show one quote and its items ------------------

app.get('/quote/:id', async (req, res) => {
    const id = req.params.id;
    const singleQuote = await graph.get(req, `sap.graph/SalesQuote/${id}`, "$expand=items&$select=items");
    const allItemLinks = singleQuote.items.map(item => `<p><a href="/quote/${id}/item/${item.itemId}"><button>Product details for item ${item.itemId}: ${item.product}</button></a></p>`).join("");
    res.send(`
      <h1>SalesQuote - Detail</h1>
      <h4><code>id: ${id}</code></h4>
      ${allItemLinks}
      <pre><code>${JSON.stringify(singleQuote, null, 2)}</code></pre>
    `);
});

// ------------------ 3) navigate to the product details for an item in the quote ------------------
app.get('/quote/:id/item/:itemId', async (req, res) => {
    const id = req.params.id;
    const itemId = req.params.itemId;
    const product = await graph.get(req, `sap.graph/SalesQuote/${id}/items/${itemId}/_product`, "$expand=descriptions,distributionChains");
    res.send(`
      <h1>Product Detail</h1>
      <h4><code>For SalesQuote ${id} and item ${itemId}</code></h4>
      <pre><code>${JSON.stringify(product, null, 2)}</code></pre>
    `);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
