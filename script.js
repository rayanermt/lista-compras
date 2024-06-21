const arrProducts = JSON.parse(localStorage.getItem("products")) || [];    // Vetor de objetos 

const ulProductsList = document.querySelector(".product-list");
const btnAddProduct = document.querySelector(".home__add-product-btn");
const formNewProduct = document.querySelector(".product-form");
const productTemplate = document.querySelector("#li-card-template");
const btnIncrement = document.querySelectorAll(".btn-quantity");

// Template pra criar o card de cada produto
class listItem {
    constructor (product) {
        this.cardElement = productTemplate.content.cloneNode(true),
        this.product = product;

        this.nameEl = this.cardElement.querySelector(".product-name");
        this.nameEl.textContent = `${product.name}`;

        this.quantityEl = this.cardElement.querySelector(".product-quantity");
        this.quantityEl.textContent = `${product.quantity}`;

        this.unPriceEl = this.cardElement.querySelector(".product-un-price");
        this.unPriceEl.textContent = `${product.unPrice}`;

        this.subtotalEl = this.cardElement.querySelector(".product-subtotal");
        this.subtotalEl.textContent = `${product.subTotal}`;

        this.btnsQuantity =  this.cardElement.querySelectorAll(".btn-quantity");
        this.btnEdit = this.cardElement.querySelector(".btn-item-edit");

        changeQuantity(this);
        editProduct(this);
        return this.cardElement;
    }
}

//Renderizar todos os produtos da lista
arrProducts.forEach((product) => {
    let productCard = new listItem(product)
    ulProductsList.append(productCard);
});

function editProduct(product) {
    product.btnEdit.addEventListener('click', () => {
        product.nameEl.toggleAttribute("contentEditable");
        product.unPriceEl.toggleAttribute("contentEditable");

        product.nameEl.addEventListener("keydown", (key) => {
            if (key.key == "Enter")//space
            {
                product.nameEl.removeAttribute("contentEditable");
                product.product.name = product.nameEl.textContent;
                updateLocalStorage();
            }
        });

        product.unPriceEl.addEventListener("keydown", (key) => {
            if (key.key == "Enter")//space
            {
                product.unPriceEl.removeAttribute("contentEditable");
                product.product.unPrice = Number(product.unPriceEl.textContent.tofixed(2));
                updateLocalStorage();
            }
        });
    })
   
}

function changeQuantity(obj) {
    let newQuantity = Number(obj.quantityEl.textContent);
    let newSubtotal;

    obj.btnsQuantity.forEach((btn) => {
        btn.addEventListener('click', () => {
            if(btn.name == "-"  && obj.product.quantity > 1) {
                newQuantity--;
                obj.product.quantity--;
            } else if (btn.name == "+") {
                newQuantity++;
                obj.product.quantity++;
            } 
            else {
                // TODO: Adicionar alerta mais user-friendly
                alert("Você não pode ter menos de um item.");
            }
            newSubtotal = (obj.product.unPrice * obj.product.quantity);
            obj.product.subTotal = newSubtotal;

            obj.quantityEl.textContent = (`${newQuantity}`); 
            obj.subtotalEl.textContent = (`R$ ${newSubtotal.toFixed(2)}`);
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
    ulProductsList.append(newListItem);
    arrProducts.push(newProduct);
    updateLocalStorage();
};

// Mostra o formulário ao clicar em "Adicionar produto"
btnAddProduct.addEventListener('click', () => {
    toggleForm();
});

// Submissão de um novo produto pelo formulário
formNewProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewProduct();
    toggleForm();
});

document.querySelector("#btn-cancel").addEventListener('click', () => toggleForm());