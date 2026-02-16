/* -------- LOAD PRODUCTS PAGE -------- */
const container = document.getElementById("productContainer");

if (container) {
  fetch("js/products.json")
    .then(res => res.json())
    .then(data => {
      data.products.forEach(product => {
        container.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img src="${product.image || 'images/default.jpg'}" class="card-img-top product-img">
              <div class="card-body">
                <h5>${product.name}</h5>
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary">Know More</a>
              </div>
            </div>
          </div>
        `;
      });
    });
}

/* -------- LOAD DETAIL PAGE -------- */
const detailContainer = document.getElementById("productDetail");

if (detailContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = products.find(p => p.id === id);

  if (product) {
    detailContainer.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <img src="${product.image}" class="img-fluid rounded shadow">
        </div>
        <div class="col-md-6">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
        </div>
      </div>
    `;
  }
}
