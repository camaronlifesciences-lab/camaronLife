/* -------- LOAD PRODUCTS PAGE -------- */
const container = document.getElementById("productContainer");

let allProducts = [];
let currentCategory = 'all';

if (container) {
  fetch("js/products.json")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      displayProducts('all');
    });
}

function displayProducts(category) {
  currentCategory = category;
  
  let filtered = allProducts;
  if (category !== 'all') {
    filtered = allProducts.filter(p => p.category === category);
  }

  container.innerHTML = '';
  filtered.forEach(product => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${product.image || 'images/default.jpg'}" class="card-img-top product-img">
          <div class="card-body">
            <h5>${product.name}</h5>
            <p class="text-muted small">${product.tagline || ''}</p>
            <a href="product-detail.html?id=${product.id}" class="btn btn-primary">Know More</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Category filter buttons
document.querySelectorAll('.btn-filter').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    displayProducts(this.dataset.category);
  });
});

/* -------- LOAD DETAIL PAGE -------- */
const detailContainer = document.getElementById("productDetail");

if (detailContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch("js/products.json")
    .then(res => res.json())
    .then(data => {
      const product = data.products.find(p => p.id === id);
      
      if (product) {
        detailContainer.innerHTML = `
          <div class="row">
            <div class="col-md-6">
              <img src="${product.image}" class="img-fluid rounded shadow">
            </div>
            <div class="col-md-6">
              <h2>${product.name}</h2>
              <p>${product.description || product.tagline || ''}</p>
            </div>
          </div>
        `;
      }
    });
}
