var brandElem = document.querySelector('.shoeBrand');
var colorElem = document.querySelector('.shoeColor');
var sizeElem = document.querySelector('.shoeSize');
var stockQtyElem = document.querySelector('.shoeQty');
var BrandPrice = document.querySelector('.shoePrice');
var addStockBtn = document.querySelector('.btnStock');

var shoeSelect = document.querySelector('.brandname');
var colorSelect = document.querySelector('.shoeColors');
var ShoeSizeSelect = document.querySelector('.shoeSize');
var searchShoesBtn = document.querySelector('.search-btn');

var storeToBasket = document.querySelector('.btnCart');
var removeItemElem = document.querySelector('.CartRemove');

var alertElem = document.querySelector('.alert');
var updateElem = document.querySelector('.update');
var successfulElem = document.querySelector('.successful');

// Template setup
var templateSource = document.querySelector(".ShoeTemplate").innerHTML;
var shoeTemplate = Handlebars.compile(templateSource);

var displayShoesElem = document.querySelector('.my_card');

var templateSource1 = document.querySelector(".ShoeBasketTemplate").innerHTML;
var BasketshoeTemplate = Handlebars.compile(templateSource1);
var displayShoesBasketElem = document.querySelector('.shoppingBasket');


var shoe_Catalogue = ShoeCatalogue_api();

const addStock = () => {
  if (brandElem.value !== "" && colorElem.value !== "" && colorElem.value !== "" && sizeElem.value !== "" && BrandPrice.value !== "") {
    shoe_Catalogue.addNewStock(
      brandElem.value,
      colorElem.value,
      sizeElem.value,
      BrandPrice.value,
      stockQtyElem.value,
    ).then(result => {
      if (result.data.status === "success") {
          getShoes();
          clear_fields();
        successfulElem.style.display = 'inline-block';
      }
    })
  }
}

const searchByID = (idValue) => {
  shoe_Catalogue.addToShoppingCart(idValue.id)
    .then(result => {
      getShoes();
    })
}

const clearCart=()=> {
  shoe_Catalogue.removeStock()
    .then(result => {
    if(result.data.status='status'){
      viewCart();
    }
    })
}

// addStockBtn.addEventListener('click', function () {
//   addStock();
// });

searchShoesBtn.addEventListener('click', function () {

  if (shoeSelect.value !=='') {
     console.log('here')
    shoe_Catalogue.searchByBrand(shoeSelect.value)
    .then(result => {
      let searchData = result.data.data;
      search_stock(searchData);
    })
  }
   
  if (ShoeSizeSelect.value !=='') {
    shoe_Catalogue.searchBySize(ShoeSizeSelect.value)
    .then(result => {
      let searchData = result.data.data;
      search_stock(searchData);
    })
  }

  if (shoeSelect.value !=='' && ShoeSizeSelect.value !=='') {
    shoe_Catalogue.filterByBrandAndSize(shoeSelect.value, ShoeSizeSelect.value)
    .then(result => {
      let searchData = result.data.data;
      search_stock(searchData);
    })
  }

  

});



 removeItemElem.addEventListener('click', clearCart);

const getShoes = () => {
  shoe_Catalogue.viewStocks()
    .then(result => {
      displayShoesElem.innerHTML = shoeTemplate({
        shoeList: result.data.data
      });
      viewCart();
    })
}

window.addEventListener('load', () => {
      getShoes();
});

const search_stock = (searchData) => {
  displayShoesElem.innerHTML = shoeTemplate({
    shoeList: searchData
  });
}

const viewCart = () => {
  shoe_Catalogue.total()
    .then(result => {
      let total = result.data.data;
      shoe_Catalogue.viewShopping()
        .then(result => {
          displayShoesBasketElem.innerHTML = BasketshoeTemplate({
            BasketList: result.data.data,
            total
          });
        })
    })
}

const clear_fields=()=>{
  brandElem.value = "";
  colorElem.value = "";
  stockQtyElem.value = "";
  sizeElem.value = "";
  BrandPrice.value = "";
}