/**
 * function fetchProduct() uses SAP Graph to fetch an ordered list of products incl. the original object from Sales Cloud
 */
async function fetchProduct(productId) {
  try {

    const response = await getFromGraph(`/sap.graph/Product/${productId}?$expand=_cxsales`); 
    document.getElementById("product-detail-section-title").innerHTML = `Details of ${response.name}`;  
    document.getElementById("dumpProduct").innerHTML = JSON.stringify(response, null, 2); 
    // Optional TODO: Fancy UI

  } catch (error) {
    console.error(error);
  }
}
