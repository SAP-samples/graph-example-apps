let debug2 = true;

/**
 * fetchProductsOfCorporateAccount() uses SAP Graph to fetch all the quotes for a specific customer account
 */
async function fetchProductsOfCorporateAccount(party) {

  const query = 
    `/sap.graph/CorporateAccount/${party}`

  try {
    const response = await getFromGraph(query);
   
    productsSectionTitle.innerHTML = `Quoted products of ${response.name}`;

    if (debug2) { 
      document.getElementById("dumpItems").innerHTML = JSON.stringify(response, null, 2); 
    }
    else {
      sumQuantities(response._salesQuotes);
    }

  } catch (error) { console.error(error); }
}

/**
 * sumQuantities() aggregates the quantities of quoted products from multiple historic quotes
 */
function sumQuantities(quotes) {
  const allProducts = {};
  
  // business logic: loop over all quotes and all products, sum the product quantities
  quotes.forEach(salesQuote => {
    salesQuote.items.forEach(item => {
      const productId = item.product;
      if (allProducts[productId]) {  
        allProducts[productId].quantity += item.quantity // add new quantity 
      } else {
        allProducts[productId] = item; //Add the product to the list
      }
    });
  });

  printProducts(Object.values(allProducts)); 
}

/**
 * printProducts() prints out a list of all product quantities quoted to a specific customer account
 */
function printProducts(elements) {
  let listElements = "";
  elements.forEach((p) => {
    listElements += `
      <li title="${p.product}" role="listitem" class="fd-list__item fd-list__item--interractive" onClick="fetchProduct('${p.product}')">
        ${p.itemText}
         <div> <i>${p.quantity}</i> </div>
      </li>`;
  });
  productsList.innerHTML = listElements;
} 