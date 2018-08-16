const axios = require('axios');

const ShoeCatalogue = () => {

    const getStocks = () => {
        axios.get('/api/shoes')
            .then((result) => {
                console.log(result);
                shoeElem = document.querySelector('.shoes');
                result.data.data.forEach(shoe => {
                    let sh = "<li>" + shoe.brand + '-' + shoe.color + "</li>";
                    shoeElem.innerHTMl += sh;
                });
            })
    }

    const filterByBrand = () => {
        axios.get('/api/shoes/brand/:brandname').
        then((result) => {

        })
    }

    const filterBySize = () => {
        axios.get('/api/shoes/size/:size').
        then((result) => {

        })
    }

    const filterByBrandandSize = () => {
        axios.get('/api/shoes/brand/:brandname/size/:size').
        then((result) => {})
    }


    const addToCart = () => {
        axios.post('/api/shoes/sold/:id').
        then((result) => {})
    }

    const viewCart = () => {
        axios.post('/api/shoes').
        then((result) => {

        })
    }


    return {
        viewStocks: getStocks,
        searchByBrand: filterByBrand,
        searchBySize: filterBySize,
        filterByBrandAndSize: filterByBrandandSize,
        addToShoppingCart: addToCart,
        viewShopping: viewCart
    }
}