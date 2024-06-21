const arrProducts = JSON.parse(localStorage.getItem("products")) || [];    // Vetor de objetos
const ulProductsList = document.querySelector(".product-list");
const btnAddProduct = document.querySelector(".home__add-product-btn");
const formNewProduct = document.querySelector(".product-form");
const productTemplate = document.querySelector("#li-card-template");
const btnQuantityIncrement = document.querySelectorAll(".btn-quantity");

function test() {
    let template = document.querySelector("#test-template");
    let newEl = template.content.cloneNode(true);
    ulProductsList.appendChild(newEl);
}

// Adiciona mais um produto na lista, a partir de um template
function addProductCard(product) {
    let newLi = productTemplate.content.cloneNode(true);

    newLi.querySelector("h3").textContent = `${product.name}`;
    newLi.querySelector(".product-un-price").textContent = `R$ ${product.unPrice.toFixed(2)}`;
    newLi.querySelector(".product-subtotal").textContent = `R$ ${product.subTotal.toFixed(2)}`;

    ulProductsList.appendChild(newLi);
}

// Atualizar o localStorage
function updateLocalStorage() {
    localStorage.setItem("products", JSON.stringify(arrProducts));
};

// Alternar visibilidade do formulário 
function toggleForm () {
    formNewProduct.classList.toggle("hidden");
    document.querySelector(".dark-overlay").classList.toggle("hidden");
};

// Cria e adiciona um novo objeto de produto ao vetor com todos os produtos.
function createNewProduct () {
    const inputName = document.querySelector("#input-name");
    const inputUnPrice = document.querySelector("#input-un-price");
    const inputQuantity = document.querySelector("#input-quantity");

    const newProduct = {
        name: inputName.value,
        unPrice: parseFloat([inputUnPrice.value]),
        quantity: parseInt([inputQuantity.value]),
        subTotal: parseFloat(inputUnPrice.value * inputQuantity.value)
    };

    arrProducts.push(newProduct);
    addProductCard(newProduct);
    console.log(newProduct);
};

// Mostra o formulário ao clicar em "Adicionar produto"
btnAddProduct.addEventListener('click', () => {
    toggleForm();
});

// Submissão de um novo produto pelo formulário
formNewProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewProduct();
    updateLocalStorage();
    toggleForm();
    console.log("submit no form");
});

document.querySelector("#btn-cancel").addEventListener('click', () => toggleForm());