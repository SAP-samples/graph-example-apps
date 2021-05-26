const fetch = require("node-fetch");
class Graph {
    async get(req, entity, params) {
        const url = `https://sandbox.api.sap.com/sapgraph/${entity}${params ? `?${params}` : ""}`;
        console.log(url) //for debugging 
        const options = {
            method: "get",
            headers:{
                "Accept": "application/json",
                "apiKey": "your APIkey"
            }
        };
        const response = await fetch(url, options);
        console.log(`${response.status} (${response.statusText})`) // for debugging
        const json = await response.json();
        return json;
    }
}

module.exports = Graph;
