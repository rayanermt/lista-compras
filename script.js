const arrProducts = JSON.parse(localStorage.getItem("products")) || [];    // Vetor de objetos

const ulProductsList = document.querySelector(".product-list");
const btnAddProduct = document.querySelector(".app__add-new-product");
const formAddProduct = document.querySelector(".form-add-product");

const blackOverlay = document.querySelector(".black-overlay");

// Adicionar novo ítem na lista de produtos, com as informações digitadas no formulário

function updateLocalStorage() {
    localStorage.setItem("products", JSON.stringify(arrProducts));
};

function showProductForm () {
    formAddProduct.classList.toggle("hidden");
    blackOverlay.classList.toggle("hidden");
};

arrProducts.forEach(product => {
    const newLi = createDOMProductItem(product);
    ulProductsList.append(newLi);
});

// Recebe como parâmetro um único produto, cria um list item para esse produto.
function createDOMProductItem (product) {
    const productLi = document.createElement("li");
    productLi.innerHTML = `
            <li class="product-list__item">
                    <input type="radio" class="product-list__radio">
                    <div class="product-list__item-info-container">
                        <h3 class="product-list__item-name">${product.name}</h3>
                        <span class="product-list__item-un-price">R$${product.unPrice}</span>
                        <div class="product-list__buttons-wrapper">
                            <button class="product-list__button btn-item-edit"><i class="fa-solid fa-pen"></i></button>
                            <button class="product-list__button btn-item-remove"><i class="fa-solid fa-trash"></i></button>
                            <!-- Categoria -->
                        </div>
                    </div>
                    <div class="product-list__item-subtotal-container">
                        <input type="number" class="product-list__item-quantity">
                        <span class="product-list__item-subtotal">50,00</span>
                    </div>
                 </li>
        `;

    return productLi;
}

// Cria e adiciona um novo objeto de produto ao vetor com todos os produtos.
function createNewProduct () {
    const inputName = document.querySelector("#product-name");
    const inputUnPrice = document.querySelector("#product-un-price");
    const inputQuantity = document.querySelector("#product-quantity");

    const newProduct = {
        name: inputName.value,
        unPrice: inputUnPrice.value,
        quantity: inputQuantity.value
    };

    arrProducts.push(newProduct)
    ulProductsList.append( createDOMProductItem (newProduct) )
    console.log(newProduct);
};

btnAddProduct.addEventListener('click', () => {
    showProductForm();
});

formAddProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewProduct();
    updateLocalStorage();
    showProductForm();
    console.log("submit no form");
});

