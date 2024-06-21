const arrProducts = JSON.parse(localStorage.getItem("products")) || [];    // Vetor de objetos
const ulProductsList = document.querySelector(".product-list");
const btnAddProduct = document.querySelector(".home__add-product-btn");
const formNewProduct = document.querySelector(".product-form");
const productTemplate = document.querySelector("#li-card-template");
const btnIncrement = document.querySelectorAll(".btn-quantity");

arrProducts.forEach(element => {
    addProductCard(element);
});

function test() {
    let template = document.querySelector("#test-template");
    let newEl = template.content.cloneNode(true);
    ulProductsList.appendChild(newEl);
}

// Adiciona mais um produto na lista, a partir de um template
function addProductCard(product) {
    let newLi = productTemplate.content.cloneNode(true);

    let nameEl =  newLi.querySelector(".product-name");
    let quantityEl = newLi.querySelector(".product-quantity")
    let unPriceEl = newLi.querySelector(".product-un-price");
    let subtotalEl =  newLi.querySelector(".product-subtotal");
    let btnsQuantity = newLi.querySelectorAll(".btn-quantity");
    
    nameEl.textContent = `${product.name}`;
    unPriceEl.textContent = `R$ ${product.unPrice.toFixed(2)}`;
    quantityEl.textContent = `${product.quantity}`;
    subtotalEl.textContent = `R$ ${product.subTotal.toFixed(2)}`;
    
    incrementButton(btnsQuantity, quantityEl, subtotalEl, product);

    ulProductsList.appendChild(newLi);
}

// Botões para incrementar quantiade

function incrementButton(btnsQuantity, quantityEl, subtotalEl, product) {
    
    let newQuantity = Number(quantityEl.textContent);
    let newSubtotal;

    btnsQuantity.forEach((btn) => {
        btn.addEventListener('click', () => {
            switch (btn.name) {
                case "-":
                    newQuantity--;
                    product.quantity--;
                    break;

                case "+":
                    newQuantity++;
                    product.quantity++;
                    break;
            }
            
            newSubtotal = (product.unPrice * product.quantity);
            product.subTotal = newSubtotal;

            quantityEl.textContent = (`${newQuantity}`); 
            subtotalEl.textContent = (`R$ ${newSubtotal.toFixed(2)}`);
            updateLocalStorage();
        });
    });
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
        subTotal: parseFloat(inputUnPrice.value * inputQuantity.value),

        decreaseQuantity() {
            this.quantity -= 1;
            this.subTotal = parseFloat(inputUnPrice.value * inputQuantity.value);
        }
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