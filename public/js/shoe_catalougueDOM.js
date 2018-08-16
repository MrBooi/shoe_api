var brandElem = document.querySelector('.shoeBrand');
var colorElem = document.querySelector('.shoeColor');
var sizeElem = document.querySelector('.shoeSize');
var stockQtyElem = document.querySelector('.shoeQty');
var BrandPrice   = document.querySelector('.shoePrice');
var addStockBtn = document.querySelector('.btnStock');
var shoeSelect = document.querySelector('.shoe');
var colorSelect = document.querySelector('.shoeColors');
var ShoeSizeSelect = document.querySelector('.shoeSizes');
var searchShoesBtn = document.querySelector('.searchBtn');
var storeToBasket  = document.querySelector('.btnCart');
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

var StoredItems = localStorage.getItem('shoppingBasket') ? JSON.parse(localStorage.getItem('shoppingBasket')) : [];
var storedBasket = localStorage.getItem('BasketItems') ? JSON.parse(localStorage.getItem('BasketItems')) :[];
var shoe_Catalogue = ShoeCatalogue(StoredItems,storedBasket);

function addStock() {
  if( brandElem.value !=='' &&colorElem.value !==''&&colorElem.value !==''&&sizeElem.value !==''&& BrandPrice.value){
  shoe_Catalogue.stockadd(
    brandElem.value,
    colorElem.value,
    stockQtyElem.value,
    sizeElem.value,
    BrandPrice.value
  );
  successfulElem.style.display='inline-block';
  localStorage.setItem('shoppingBasket', JSON.stringify(shoe_Catalogue.storeMap()));
}
else{
  alertElem.style.display='inline-block';
}
//location.reload();
}

function searchByID(idValue){

  if(shoe_Catalogue.cart(idValue.id)){
    localStorage.setItem('shoppingBasket', JSON.stringify(shoe_Catalogue.storeMap()));
    localStorage.setItem('BasketItems', JSON.stringify(shoe_Catalogue.addedCartITems()));
    shoe_Catalogue.calcTotal();
   displayShoesBasketElem.innerHTML = BasketshoeTemplate({
     BasketList:shoe_Catalogue.addedCartITems(),
     Totals :shoe_Catalogue.cartBill()
   });


  }
  else{
    removeItemElem.disable=true;
  }


   window.location.reload();
}

function clearCart(){
   shoe_Catalogue.removeItemCart();
  localStorage.setItem('shoppingBasket', JSON.stringify(shoe_Catalogue.storeMap()));
  localStorage.removeItem('BasketItems');
    location.reload();

  displayShoesBasketElem.innerHTML = BasketshoeTemplate({
    BasketList:shoe_Catalogue.addedCartITems()
  });
}

addStockBtn.addEventListener('click',function(){
 addStock();


});

// Search Items
searchShoesBtn.addEventListener('click', function () {
  SearchItems = {}
  if (colorSelect.value != "") {
    SearchItems.colour= colorSelect.value
  }
  if (ShoeSizeSelect.value != "") {
    SearchItems.sizeShoe=ShoeSizeSelect.value

  }
  if (shoeSelect.value != "") {
    SearchItems.shoeBrand= shoeSelect.value

  }
  shoe_Catalogue.filterBy(SearchItems);
  displayShoesElem.innerHTML = shoeTemplate({
    shoeList:shoe_Catalogue.getFiltered()
  });
});


window.addEventListener('load',function(){
  displayShoesElem.innerHTML = shoeTemplate({
    shoeList:shoe_Catalogue.storeMap(),
    Totals :shoe_Catalogue.calcTotal()
  });

  displayShoesBasketElem.innerHTML = BasketshoeTemplate({
    BasketList:shoe_Catalogue.addedCartITems(),
    Totals :shoe_Catalogue.cartBill()
  });
});

removeItemElem.addEventListener('click',clearCart);
