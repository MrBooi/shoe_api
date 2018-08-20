const ShoeCatalogue_api = () => {

  const getStocks = () => axios.get('/api/shoes');

  const filterByBrand = (brandname) => axios.get('/api/shoes/brand/' + brandname);

  const filterBySize = (size) => axios.get(`/api/shoes/size/${size}`);

  const filterByBrandandSize = (brandname, size) => {
    return axios.get(`/api/shoes/brand/${brandname}/size/${size}`);
  }

  const addToCart = (id) => axios.post(`api/shoes/cart/${id}`);

  const viewCart = () => axios.get('/api/view_cart');

  const addNewStock = (brand, color, shoeSize, price, quantity) => {
    return axios.post('/api/shoes', {
      brand,
      color,
      shoeSize,
      price,
      quantity
    });
  }
  const removeStock = () => axios.get('api/remove_cart');

  const total = () => axios.get('api/cart/total');

  return {
    viewStocks: getStocks,
    searchByBrand: filterByBrand,
    searchBySize: filterBySize,
    filterByBrandAndSize: filterByBrandandSize,
    addToShoppingCart: addToCart,
    viewShopping: viewCart,
    addNewStock,
    removeStock,
    total
  }
}