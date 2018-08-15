function ShoeCatalogue(storedItems, storedBasket) {
  var basketTotal = 0;
  var trolley =[];
  var basket = storedBasket || [];
  var storeShoeStock = [
    { shoeBrand: "Le coq", colour: "Blue", qty: 2, sizeShoe: "6", price: 2400, id: "1" },
    { shoeBrand: "Le coq", colour: "Blue", qty: 2, sizeShoe: "7", price: 2400, id: "2" },
    { shoeBrand: "Adidas", colour: "Brown", qty: 2, sizeShoe: "6", price: 2400, id: "3" },
    { shoeBrand: "Adidas", colour: "White", qty: 2, sizeShoe: "7", price: 2400, id: "4" },
    { shoeBrand: "Nike", colour: "White", qty: 2, sizeShoe: "6", price: 2400, id: "5" },
    { shoeBrand: "Nike", colour: "Black", qty: 2, sizeShoe: "7", price: 2400, id: "6" },
    { shoeBrand: "Puma", colour: "White", qty: 2, sizeShoe: "6", price: 2400, id: "7" },
    { shoeBrand: "Puma", colour: "Black", qty: 2, sizeShoe: "7", price: 2400, id: "8" }
  ];

  if (storedItems && storedItems.length > 0) {
    storeShoeStock = [];
    for (let i = 0; i < storedItems.length; i++) {
      storeShoeStock.push(storedItems[i]);
    }
  }


  function stockMap() {
    return storeShoeStock;
  }

  function filterShoes(Params) {
    trolley = _.filter(storeShoeStock, Params);

    return _.filter(storeShoeStock, Params);
  }

  function getSearchedItems() {
    return trolley;
  }


  function addCart(id) {
    let found = storeShoeStock.find(items => (items.id == id));
    var cartExist = false;
    if(found.qty>0){
   
      basket.map(basketItem => {
      console.log("here")
      if (basketItem.id == id) {
        basketItem.qty += 1;
        basketItem.price = basketItem.price * basketItem.qty;
        cartExist = true;
      }
    })

    if (!cartExist) {
      console.log("does not")
      basket.push({
        shoeBrand: found.shoeBrand,
        colour: found.colour,
        qty: 1,
        sizeShoe: found.sizeShoe,
        price: found.price,
        'id': id
      })
    }
    found.qty -= 1;
    // storeShoeStock.map(findItem => {
    //   console.log("local changes")
    //   if (findItem.id == id) {
    //     findItem.qty = findItem.qty - 1;
    //   }
    // })
       return true;
  }

    return false;
  }

  function removeCart() {
   
    for (let i = 0; i < storeShoeStock.length; i++) {
      let cartRemove = storeShoeStock[i];
      let trolleyFound = basket.find(shoe => (shoe.id == cartRemove.id));
      console.log(trolleyFound)
      if (trolleyFound) {
        cartRemove.qty += trolleyFound.qty;
      }
    }
    basketTotal = 0.00;
    basket = [];
  }

  function totalCart() {
    let subTotal = 0.00;
    if (basket) {
      subTotal = basket.reduce((total, current) => (total + (current.price * current.qty)), 0);
    }
    
     basketTotal = (basketTotal + subTotal);
  }


  function getTotal() {
  
    return basketTotal.toFixed(2);
  }

  function getBasket() {
    return basket;
  }

  //adding new Stock
  function addNewStock(brand, Color, Qty, shoesize, Price) {
    var alreadyExist = false;
    storeShoeStock.map(current => {
      if (current.shoeBrand === brand && current.colour === Color && current.sizeShoe == shoesize) {
        console.log("already exist");
        let getQty = parseFloat(current.qty)
        let QtyNumber = parseFloat(Qty)
        current.qty = getQty + QtyNumber;
        alreadyExist = true;
        // updateElem.style.display='block';
      }
    });
    if (brand !== "" && Color !== "" && shoesize !== "" && Price !== "") {
      if (!alreadyExist) {
        let id = storeShoeStock.length + 1;
        storeShoeStock.push({
          'shoeBrand': brand,
          'colour': Color,
          'qty': Qty,
          'sizeShoe': shoesize,
          'price': Price,
          'id': id
        })
        // successfulElem.style.display='block';
      }
    } else {
      console.log("incorrect data")
      //  incorrectElem.style.display="block";
    }


    return storeShoeStock;
  }

  return {
    stockadd: addNewStock,
    storeMap: stockMap,
    filterBy: filterShoes,
    getFiltered: getSearchedItems,
    cart: addCart,
    addedCartITems: getBasket,
    removeItemCart: removeCart,
    cartBill: getTotal,
    calcTotal:totalCart
  }
}


