const express = require("express");
const app = express();
const Graph = require("./graph");
const port = 3004;

const graph = new Graph();

app.get('/*', async (req, res) => {
    if (req.url !== "/"){
        const response = await graph.get(req, `${req.url}`, "");
        res.send(`<pre><code>${JSON.stringify(response, null, 2)}</code></pre>`);
    } else {
        res.send(`Please specify an entity query, for example: http://localhost:${port}/sap.graph/SalesQuote?$top=1`);
    }
});

app.listen(port, () => { console.log(`Explore SAP Graph: http://localhost:${port}/sap.graph/SalesQuote?$top=1`) });
