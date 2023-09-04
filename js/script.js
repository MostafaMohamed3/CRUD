var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("Search");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productIndex;

// check data in localStorage
var productContainer;
if (localStorage.getItem("myProducts") != null){
    productContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}else{
    productContainer = [];
};

function addProducts(){
    if(validateProductName() == true){
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescInput.value
        };
        productContainer.push(product);
        localStorage.setItem("myProducts" , JSON.stringify(productContainer));
        clearForm();
        displayProducts();
    };
};

addBtn.onclick = addProducts;

function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    searchInput.value = "";
    productNameInput.classList.remove("is-valid");
};

function displayProducts(){
    var tableProducts = ``;
    for (var i = 0; i < productContainer.length; i++) {
        tableProducts += `<tr id="${i}" class="text-black">
                            <td>${i+1}</td>
                            <td>${productContainer[i].name}</td>
                            <td>${productContainer[i].price}</td>
                            <td>${productContainer[i].category}</td>
                            <td>${productContainer[i].description}</td>
                            <td><button onclick="setFormForUpdate(${i}); productIndex=${i}" class="btn btn-warning">Update</button></td>
                            <td><button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
                        </tr>`;
        document.getElementById("tableBady").innerHTML = tableProducts;
    };
};

function searchProducts(searchTerm){
    for (var i = 0; i < productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
            document.getElementById(`${i}`).classList.remove("d-none");
        }else{
            document.getElementById(`${i}`).classList.add("d-none");
        };
    };
};

function deleteProducts(deletedIndex){
    productContainer.splice(deletedIndex,1);
    localStorage.setItem("myProducts" , JSON.stringify(productContainer));
    clearForm();
    displayProducts();
};

function setFormForUpdate(updatedIndex){
    productNameInput.value = productContainer[updatedIndex].name;
    productPriceInput.value = productContainer[updatedIndex].price;
    productCategoryInput.value = productContainer[updatedIndex].category;
    productDescInput.value = productContainer[updatedIndex].description;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
};

function updateProducts(productIndex){
    if(productNameInput.value != "" && productPriceInput.value != "" && productCategoryInput.value != "" && productDescInput.value != ""){
        productContainer[productIndex] = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescInput.value
        };
        localStorage.setItem("myProducts" , JSON.stringify(productContainer));
        clearForm();
        displayProducts();
        updateBtn.classList.add("d-none");
        addBtn.classList.remove("d-none");
    };
};

function validateProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productNameInput.value) == true){
        productNameInput.classList.replace("is-invalid" , "is-valid");
        return true;
    }else{
        productNameInput.classList.add("is-invalid");
        return false;
    };
};