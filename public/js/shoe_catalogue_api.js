
const ShoeCatalogue_api = () => {

    const getStocks = () => {
       return axios.get('/api/shoes');      
    }

    const filterByBrand = (brandname) => {  
      return axios.get('/api/shoes/brand/'+brandname);
    }

    const filterBySize = (size) => {
       return axios.get(`/api/shoes/size/${size}`)
    }

    const filterByBrandandSize = (brandname,size) => {
      return axios.get(`/api/shoes/brand/${brandname}/size/${size}`);
    }

    const addToCart = (id) => {
      return axios.post(`api/shoes/cart/${id}`);
    }

    const viewCart = () => {
       return axios.get('/api/view_cart');
    }
  
   const addNewStock =() =>{
    return axios.post('/api/shoes');
   }

    return {
        viewStocks: getStocks,
        searchByBrand: filterByBrand,
        searchBySize: filterBySize,
        filterByBrandAndSize: filterByBrandandSize,
        addToShoppingCart: addToCart,
        viewShopping: viewCart,
        addNewStock
    }
}