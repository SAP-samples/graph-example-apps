let debug1              = true;
let skipValue           = 0;
let topValue            = debug1 === true? 1 : 10;

/**
 * function fetchSalesQuotes() uses SAP Graph to fetch an ordered list of quotes
 */
async function fetchSalesQuotes() {

  const query = `/sap.graph/SalesQuote`
      + `?$top=${topValue}&$skip=${skipValue}`

  try {
    const response = await getFromGraph(query);
    
    if (debug1) { document.getElementById("dumpQuotes").innerHTML = JSON.stringify(response, null, 2); }
    else { listQuotesOrdered(response.value); }

    skipValue += topValue;

  } catch (error) { console.error(error); }
}

/**
 * listQuotesOrdered() prints out a nice clickable list of quotes
 */
function listQuotesOrdered(elements) {
  let listElements = "";

  let loadMoreButton = document.getElementById("load-mode-btn");
  if (loadMoreButton) {
    loadMoreButton.remove();
  }

  elements.forEach((dataRow) => {
    listElements += `
              <li role="listitem" class="fd-list__item fd-list__item--interractive" title="${dataRow.id}" 
                     onClick="fetchProductsOfCorporateAccount('${dataRow._soldToParty.id}')">
                ${dataRow._soldToParty.name} (${dataRow.orderDate})
                <div> <i>${dataRow.netAmount} ${dataRow.netAmountCurrency}</i> </div>
              </li>`;
  });

  listElements += `<li id="load-mode-btn" role="listitem" class="fd-list__item fd-list__item--action">  
                      <button class="fd-list__title" onclick="fetchSalesQuotes()"> Load more </button>
                   </li>`

  customerList.innerHTML += listElements;
} 