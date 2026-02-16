async function loadProduct() {

  // FIX: Correct path to products.json
  const response = await fetch("js/products.json");
  const data = await response.json();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = data.products.find(p => p.id === id);

  if (!product) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  document.getElementById("productTitle").textContent = product.name || "";
  document.getElementById("productTagline").textContent = product.tagline || "";

  // If you later add images inside JSON
  document.getElementById("productImage").src = product.image || "images/default.jpg";

  const container = document.getElementById("dynamicSections");

  function createSection(title, content) {

    const block = document.createElement("div");
    block.className = "section-block";

    let html = `<h4>${title}</h4>`;

    if (Array.isArray(content)) {
      html += "<ul>";
      content.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
    } else {
      html += `<p>${content}</p>`;
    }

    block.innerHTML = html;
    container.appendChild(block);
  }

  // Dynamically detect fields

  if (product.composition) createSection("Composition", product.composition);
  if (product.main_ingredients) createSection("Main Ingredients", product.main_ingredients);
  if (product.details) createSection("Details", product.details);
  if (product.benefits) createSection("Benefits", product.benefits);
  if (product.indications) createSection("Indications", product.indications);
  if (product.dosage) createSection("Dosage", product.dosage);
  if (product.dosage_application) createSection("Dosage & Application", product.dosage_application);
  if (product.method_of_application) createSection("Method of Application", product.method_of_application);
  if (product.presentation) createSection("Presentation", product.presentation);
  if (product.warning) createSection("Warning", product.warning);
  if (product.additional_info) createSection("Additional Information", product.additional_info);

}

loadProduct();