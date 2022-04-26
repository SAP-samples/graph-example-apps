let customersSection =     document.getElementById("customers-section");
let customerList =         document.getElementById("customers-list");
let productsSection =      document.getElementById("products-section");
let productsSectionTitle = document.getElementById("products-section-title");
let productsList =         document.getElementById("products-list");
let productDetailSection = document.getElementById("product-detail-section");
let productDetailCode =    document.getElementById("product-detail-code");


/**
 * getFromGraph returns the JSON response of a data query, using SAP Graph OData v4 syntax
 */
async function getFromGraph(graphQuery) {
  const graphUrl = "https://api-sandbox.graph.sap/api/v1";

  const httpOptions = {
    headers: {
      apiKey: `insert your API Key here`
    },
    method: "GET"
  };

  try {
    const response = await fetch(`${graphUrl}${graphQuery}`, httpOptions);

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    };

  } catch (error) { console.error(error); }
}
