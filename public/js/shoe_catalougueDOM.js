var brandElem = document.querySelector('.shoeBrand');
var colorElem = document.querySelector('.shoeColor');
var sizeElem = document.querySelector('.shoeSize');
var stockQtyElem = document.querySelector('.shoeQty');
var BrandPrice = document.querySelector('.shoePrice');
var addStockBtn = document.querySelector('.btnStock');

var shoeSelect = document.querySelector('.shoe');
var colorSelect = document.querySelector('.shoeColors');
var ShoeSizeSelect = document.querySelector('.shoeSizes');
var searchShoesBtn = document.querySelector('.searchBtn');
var storeToBasket = document.querySelector('.btnCart');
var removeItemElem = document.querySelector('.CartRemove');

var alertElem = document.querySelector('.alert');
var updateElem = document.querySelector('.update');
var successfulElem = document.querySelector('.successful');

// Template setup
var templateSource = document.querySelector(".ShoeTemplate").innerHTML;
var shoeTemplate = Handlebars.compile(templateSource);
var displayShoesElem = document.querySelector('.displayArea');

var templateSource1 = document.querySelector(".ShoeBasketTemplate").innerHTML;
var BasketshoeTemplate = Handlebars.compile(templateSource1);
var displayShoesBasketElem = document.querySelector('.ShoppingBasket');


var shoe_Catalogue = ShoeCatalogue_api();

const addStock = () => {
   if (brandElem.value !== "" && colorElem.value !== "" && colorElem.value !== "" && sizeElem.value !== "" && BrandPrice.value !=="") {
    shoe_Catalogue.addNewStock(
      brandElem.value,
      colorElem.value,
      sizeElem.value,
      BrandPrice.value,
      stockQtyElem.value,
    ).then(result => {
      console.log(result.data.status);
      if (result.data.status === "success") {
        successfulElem.style.display = 'inline-block';
      } 
    })
  }else{
    alertElem.style.display = 'inline-block';
  }
  //  location.reload();
}

const searchByID = (idValue) => {
  if (shoe_Catalogue.addToShoppingCart(idValue.id)) {
    shoe_Catalogue.viewShopping()
      .then(result => {
        displayShoesBasketElem.innerHTML = BasketshoeTemplate({
          BasketList: result.data.data
        });
      })
  } else {
    removeItemElem.disable = true;
  }

  window.location.reload();
}

function clearCart(){
   shoe_Catalogue.removeStock();
   shoe_Catalogue.viewShopping()
   .then(result=>{ 
     console.log(result.data.data)
    displayShoesBasketElem.innerHTML = BasketshoeTemplate({
      BasketList:result.data.data
    });
   })
   location.reload();
}

addStockBtn.addEventListener('click', function () {
  addStock();
});

// Search Items
searchShoesBtn.addEventListener('click', function () {
  shoe_Catalogue.searchByBrand(shoeSelect.value)
    .then(result => {
      displayShoesElem.innerHTML = shoeTemplate({
        shoeList: result.data.data
      });
    })

  shoe_Catalogue.searchBySize(ShoeSizeSelect.value)
    .then(result => {
      displayShoesElem.innerHTML = shoeTemplate({
        shoeList: result.data.data
      });
    })

  shoe_Catalogue.filterByBrandAndSize(shoeSelect.value, ShoeSizeSelect.value)
    .then(result => {
      displayShoesElem.innerHTML = shoeTemplate({
        shoeList: result.data.data
      });
    })

});


window.addEventListener('load', () => {
  shoe_Catalogue.viewStocks() 
    .then(result => {
      displayShoesElem.innerHTML = shoeTemplate({
        shoeList: result.data.data
      });
    })
   
    shoe_Catalogue.total()
  .then(result=>{
    let total =result.data.data;
    shoe_Catalogue.viewShopping()
    .then(result => {
      displayShoesBasketElem.innerHTML = BasketshoeTemplate({
        BasketList: result.data.data, total
      });
    })
  })
});

 removeItemElem.addEventListener('click',clearCart);