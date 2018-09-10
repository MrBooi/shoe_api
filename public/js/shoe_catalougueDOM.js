var brandElem = document.querySelector('.shoebrand');
var colorElem = document.querySelector('.shoeColor');
var sizeElem = document.querySelector('.shoesize');
var stockQtyElem = document.querySelector('.shoeQty');
var BrandPrice = document.querySelector('.shoePrice');
var addStockBtn = document.querySelector('.btnStock');

var shoeSelect = document.querySelector('.brandname');
var colorSelect = document.querySelector('.shoeColors');
var ShoeSizeSelect = document.querySelector('.shoeSize');
var searchShoesBtn = document.querySelector('.search-btn');

var storeToBasket = document.querySelector('.btnCart');
var removeItemElem = document.querySelector('.CartRemove');

var alertElem = document.querySelector('.error');
var updateElem = document.querySelector('.update');
var successfulElem = document.querySelector('.message');

// Template setup
var templateSource = document.querySelector(".ShoeTemplate").innerHTML;
var shoeTemplate = Handlebars.compile(templateSource);

var displayShoesElem = document.querySelector('.my_card');

var templateSource1 = document.querySelector(".ShoeBasketTemplate").innerHTML;
var BasketshoeTemplate = Handlebars.compile(templateSource1);
var displayShoesBasketElem = document.querySelector('.shoppingBasket');
var totalElem = document.querySelector('.total');
var shoe_Catalogue = ShoeCatalogue_api();

let alert = document.querySelector('.alert-danger');
let success = document.querySelector('.alert-success')

const addStock = () => {
  if (brandElem.value !== "" && colorElem.value !== "" && colorElem.value !== "" &&
    sizeElem.value !== "" && BrandPrice.value !== "") {
    shoe_Catalogue.addNewStock(
      brandElem.value,
      colorElem.value,
      sizeElem.value,
      BrandPrice.value,
      stockQtyElem.value
    ).then(result => {
      if (result.data.status === "success") {
        getShoes();
        clear_fields();
        success.innerHTML = 'shoe is successful added';
        successfulElem.style.display = 'block';
        success_message();
      } else {
        alert.innerHTML = 'Please make sure all fields are filled!!';
        alertElem.style.display = 'block';
        alert_message();
      }
    })
  } else {
    alert.innerHTML = ' opps!! wrong data';
    alertElem.style.display = 'block';
    alert_message();
  }
}

const searchByID = (idValue) => {
  shoe_Catalogue.addToShoppingCart(idValue.id)
    .then(result => {
      getShoes();
    })
}

const clearCart = () => {
  shoe_Catalogue.removeStock()
    .then(result => {
      if (result.data.status = 'status') {
        viewCart();
      }
    })
}

addStockBtn.addEventListener('click', function () {
  addStock();
});

const search = () => {
  let brand = shoeSelect.value;
  let size = ShoeSizeSelect.value;
  filterShoes(brand, size);
}

const filterShoes = (brand, size) => {
  if (brand == "all" && size == "all") {
    getShoes();
  } else if (brand !== "all" && size !== "all") {
    shoe_Catalogue.filterByBrandAndSize(shoeSelect.value, ShoeSizeSelect.value)
      .then(result => {
        let searchData = result.data.data;
        search_stock(searchData);
      })
  } else if (brand !== "all") {
    shoe_Catalogue.searchByBrand(shoeSelect.value)
      .then(result => {
        let searchData = result.data.data;
        search_stock(searchData);
      })
  } else if (size !== "all") {
    shoe_Catalogue.searchBySize(ShoeSizeSelect.value)
      .then(result => {
        let searchData = result.data.data;
        search_stock(searchData);
      })
  }
}

searchShoesBtn.addEventListener('click', function () {
  search();
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
            BasketList: result.data.data
          });
          totalElem.innerHTML = 'Total: R' + total
        })
    })
}

const clear_fields = () => {
  brandElem.value = "";
  colorElem.value = "";
  stockQtyElem.value = "";
  sizeElem.value = "";
  BrandPrice.value = "";
}

const alert_message = () => {
  if (alert.innerHTML !== '') {
    alert.innerHTML == '';
    setTimeout(() =>
      alertElem.style.display = 'none',
      5000
    )
  }
}

const success_message = () => {
  if (success.innerHTML !== '') {
    success.innerHTML == '';
    setTimeout(() =>
      successfulElem.style.display = 'none', 5000
    )
  }
}