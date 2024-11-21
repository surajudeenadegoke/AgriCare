//Function to navigate to about page
function openPage() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // console.log(name);
  if (name && email && password) {
    window.open("about.html");
  } else {
    alert("Please enter the required field");
  }
}

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

let products = []; // Array to store products

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

document.addEventListener("DOMContentLoaded", function () {
  const getStarted = document.getElementsByClassName("start-btn");

  // Check if the user has visited before using localStorage
  if (!localStorage.getItem("hasVisited")) {
    // If not visited, show the element
    getStarted.style.display = "block";

    // Set a flag in localStorage to remember the visit
    localStorage.setItem("hasVisited", "true");
  }
});

// Reward conversion rate: 1 can = 10 points
const rewardRate = 10;

// Get DOM elements
const canInput = document.getElementById("canInput").value;
const sendButton = document.getElementById("sendButton");
const walletBalance = document.getElementById("walletBalance");
const output = document.getElementById("output");

// Initial wallet balance
let currentBalance = 0;
let cans = 0;
// Handle sending cans
const getCan = () => {
  if (isNaN(canInput.value) || canInput.value <= 0) {
    output.textContent = "Please enter a valid number of cans.";
  }
};
// sendButton.addEventListener("click", () => {
//   let cans = parseInt(canInput);
//   if (isNaN(cans) || cans <= 0) {
//     output.textContent = "Please enter a valid number of cans.";
//   }else{

//   }
//     output.style.color = "red";
//     return;
//   }

// Calculate rewards
const rewardPoints = cans * rewardRate;
currentBalance += rewardPoints;

// Update wallet and display
walletBalance.textContent = currentBalance;
output.textContent = `You sent ${cans} cans and earned ${rewardPoints} reward points!`;
output.style.color = "green";

// Clear input
canInput.value = "";
