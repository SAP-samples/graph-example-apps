const express = require("express");
const app = express();
const Graph = require("./graph");
const port = 3004;

const graph = new Graph();

app.get('/*', async (req, res) => {
    const response = await graph.get(req, `${req.url}`, "");
    res.send(`<pre><code>${JSON.stringify(response, null, 2)}</code></pre>`);
});

app.listen(port, () => { console.log(`Explore SAP Graph at http://localhost:${port}`) });
