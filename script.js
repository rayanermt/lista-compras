let arrProducts = JSON.parse(localStorage.getItem("products")) || [];    // Vetor de objetos 

const ulProductsList = document.querySelector(".product-list");
const btnAddProduct = document.querySelector(".home__add-product-btn");
const formNewProduct = document.querySelector(".product-form");
const productTemplate = document.querySelector("#li-card-template");
const btnIncrement = document.querySelectorAll(".btn-quantity");

const spnTotalValue = document.querySelector(".total-value");
let totalValue;

calculateTotal();

// Calulcar valor total dos produtos
function calculateTotal() {
    totalValue = 0;
    arrProducts.forEach((product) => {
        totalValue += product.subTotal;
    });

    spnTotalValue.textContent = `${totalValue.toFixed(2)}`;
};

// Template pra criar o card de cada produto
class listItem {
    constructor (product) {
        this.cardElement = productTemplate.content.cloneNode(true),
        this.product = product;

        this.productInfoEl = this.cardElement.querySelector(".product-info-container");
        this.nameEl = this.cardElement.querySelector(".product-name");
        this.quantityEl = this.cardElement.querySelector(".product-quantity");
        this.unPriceEl = this.cardElement.querySelector(".product-un-price");
        this.subtotalEl = this.cardElement.querySelector(".product-subtotal");
        
        this.nameEl.textContent = `${product.name}`;
        this.quantityEl.textContent = `${product.quantity}`;

        // Ocultas informações vazias automaticamente
        if (isFinite(product.unPrice)) {
            console.log("não nulo")
            this.unPriceEl.textContent = `${product.unPrice}`;
            this.calculateSubtotal();
            this.unPriceEl.classList.remove("hidden");
            this.subtotalEl.classList.remove("hidden");
        } else {
            this.unPriceEl.textContent = "0.00";
            this.subtotalEl.textContent = "0.00";
        }
        
        this.btnsQuantity =  this.cardElement.querySelectorAll(".btn-quantity");
        this.btnEdit = this.cardElement.querySelector(".btn-item-edit");
        this.btnRemove = this.cardElement.querySelector(".btn-item-remove");

        changeQuantity(this);
        editProduct(this);
        removeProduct(this);

        return this.cardElement;
    }

    calculateSubtotal() {
        let newSubtotal = Number(this.product.unPrice * this.product.quantity).toFixed(2);
        this.subtotalEl.textContent = `${newSubtotal}`;
        return this.subTotal = Number(newSubtotal);
    }
};

// Editar nome e valor do produto
function editProduct(listItem) {

    listItem.btnEdit.addEventListener('click', () => {
        listItem.unPriceEl.classList.remove("hidden");
        listItem.subtotalEl.classList.remove("hidden");

        listItem.nameEl.toggleAttribute("contentEditable");
        listItem.unPriceEl.toggleAttribute("contentEditable");
        listItem.productInfoEl.addEventListener("keydown", (key) => {
            if (key.key == "Enter")
            {
                console.log(key)
                listItem.nameEl.removeAttribute("contentEditable");
                listItem.unPriceEl.removeAttribute("contentEditable");

                listItem.product.name = listItem.nameEl.textContent;
                listItem.product.unPrice = Number(listItem.unPriceEl.textContent);
                listItem.product.subTotal = listItem.calculateSubtotal();
                
                calculateTotal();
                updateLocalStorage();
            }
        });
    });
};

// Remover produto da lista
function removeProduct(listItem) {
    let btnRemove = listItem.btnRemove;

    btnRemove.addEventListener('click', () => {
        let index = arrProducts.indexOf(listItem.product);
        arrProducts.splice(index, 1);
        btnRemove.closest(".product-card").remove();
        updateLocalStorage();
    });
};

function changeQuantity(listItem) {
    let newQuantity = Number(listItem.quantityEl.textContent);

    listItem.btnsQuantity.forEach((btn) => {
        btn.addEventListener('click', () => {
            debugger
            if(btn.name == "-"  && listItem.product.quantity > 1) {
                newQuantity--;
                listItem.product.quantity--;
            } else if (btn.name == "+") {
                newQuantity++;
                listItem.product.quantity++;
            } 
            else {
                // TODO: Adicionar alerta mais user-friendly
                alert("Você não pode ter menos de um item.");
            }
            listItem.product.subTotal = listItem.calculateSubtotal();

            listItem.quantityEl.textContent = (`${newQuantity}`); 
            updateLocalStorage();
        });
    });
};

// Atualizar o localStorage
function updateLocalStorage() {
    
    calculateTotal();
    localStorage.setItem("products", JSON.stringify(arrProducts));
    localStorage.setItem("totalValue", totalValue)

};

// Alternar visibilidade do formulário 
function toggleForm () {
    formNewProduct.classList.toggle("hidden");
    document.querySelector(".dark-overlay").classList.toggle("hidden");
};

// Cria e adiciona um novo objeto de produto ao vetor com todos os produtos.
function createNewProduct ( ) {
    const inputName = document.querySelector("#input-name");
    const inputUnPrice = document.querySelector("#input-un-price");
    const inputQuantity = document.querySelector("#input-quantity");

    const newProduct = {
        name: inputName.value,
        unPrice: parseFloat([inputUnPrice.value]),
        quantity: parseInt([inputQuantity.value]),
        subTotal: parseFloat(inputUnPrice.value * inputQuantity.value),
    };

    let newListItem = new listItem(newProduct);
    ulProductsList.prepend(newListItem);
    arrProducts.push(newProduct);
    updateLocalStorage();
};

//Renderizar todos os produtos da lista
arrProducts.forEach((product) => {
    let productCard = new listItem(product)
    ulProductsList.prepend(productCard);
});


// Mostra o formulário ao clicar em "Adicionar produto"
btnAddProduct.addEventListener('click', () => {
    toggleForm();
});

// Submissão de um novo produto pelo formulário
formNewProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewProduct();
    formNewProduct.reset();
    toggleForm();
});

document.querySelector("#btn-cancel").addEventListener('click', () => toggleForm());