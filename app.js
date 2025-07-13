const PRODUCTS_LIST = "products";


function addProduct(event) {
    event.preventDefault();
    const data = collectProductFromList();
    const products = JSON.parse(localStorage.getItem(PRODUCTS_LIST) || "[]");
    products.push(data);
    localStorage.setItem(PRODUCTS_LIST, JSON.stringify(products));
    loadProductsFromStorage();
    clearForm();
}


function collectProductFromList() {
    const Pname = document.getElementById('ProductName');
    const Pprice = document.getElementById('ProductPrice');
    const Pselect = document.getElementById('catogoryProduct');
    const ImgProduct = document.getElementById('imgProduct');

    return {
        ProductName: Pname.value,
        ProductPrice: Pprice.value,
        catogoryProduct: Pselect.value,
        imgProduct: ImgProduct.value
    };
}


function createTheTR(data, index) {
    return `
        <tr data-index="${index}">
            <td>${data.ProductName}</td>
            <td>${data.ProductPrice}</td>
            <td>${data.catogoryProduct}</td>
            <td><img src="${data.imgProduct}" style="width:100px;"></td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
        </tr>
    `;
}

function injectToTR(trHTML) {
    document.getElementById('productList').innerHTML += trHTML;
}


function loadProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_LIST) || "[]");
    const tbody = document.getElementById('productList');
    tbody.innerHTML = ""; 

    products.forEach((product, index) => {
        const trHTML = createTheTR(product, index);
        injectToTR(trHTML);
    });
}


function clearForm() {
    document.getElementById('productForm').reset();
}


document.getElementById("productForm").addEventListener("submit", addProduct);


document.getElementById("productList").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        const index = parseInt(row.getAttribute("data-index"));

        let products = JSON.parse(localStorage.getItem(PRODUCTS_LIST) || "[]");
        products.splice(index, 1); 
        localStorage.setItem(PRODUCTS_LIST, JSON.stringify(products));
        loadProductsFromStorage(); 
    }
});


document.addEventListener("DOMContentLoaded", loadProductsFromStorage);
