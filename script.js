const myFunction = () => {
  let navBar = document.getElementById("my-links");
  if (navBar.style.display === "none") {
    navBar.style.display = "flex";
  } else {
    navBar.style.display = "none";
  }
};
const productsContainer = document.getElementById("productsContainer");
const addProductForm = document.getElementById("addProductForm");

let products = [
  { id: '18th Nov. 2024', name:'Yam', description:"Used for making panded yam", price:"400" }

]; // Array to store products

// Add Product
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = document.getElementById("productPrice").value;

  const product = { id: Date.now(), name, description, price };
  products.push(product);

  renderProducts();
  addProductForm.reset();
});

// Render Products
function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.className = "product-item";

    productItem.innerHTML = `
      <div class="product-details">
        <strong>${product.name}</strong>
        <p>${product.description}</p>
        <p><strong>Price:</strong> ${product.price} coins</p>
      </div>
      <div class="product-actions">
        <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `;

    productsContainer.appendChild(productItem);
  });
}

// Edit Product
function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("productName").value = product.name;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productPrice").value = product.price;

  deleteProduct(id);
}

// Delete Product
function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  renderProducts();
}
