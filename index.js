const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Cart = require('./routes/cart');
const Shopping_shoes = require('./routes/shopping_shoes');
const CartService = require('./services/shopping_cart');
const ShoppingService = require('./services/shoes');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

//database connection 
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/shoe_api'

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const cartService =CartService(pool);
const shoppingService= ShoppingService(pool); 

const shoppingCartRoutes  = Cart(cartService);
const shoppingShoesRoutes = Shopping_shoes(shoppingService);


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


// shoes 
app.get('/api/shoes',shoppingShoesRoutes.show_shoes);
app.post('/api/shoes',shoppingShoesRoutes.add);
app.get('/api/shoes/brand/:brandname',shoppingShoesRoutes.searchByBrand);
app.get('/api/shoes/size/:size',shoppingShoesRoutes.searchBySize);
app.get('/api/shoes/brand/:brandname/size/:size',shoppingShoesRoutes.filterByBrandAndSize);

// shopping Cart
app.get('/api/view_cart',shoppingCartRoutes.view_cart);
app.get('/api/cart/total',shoppingCartRoutes.cartTotal);
app.post('/api/shoes/cart/:id',shoppingCartRoutes.addToCart);
app.get('/api/remove_cart',shoppingCartRoutes.deleteCartItems);

app.listen(PORT, (err) => {
    if (PORT) {
    console.log('App starting on port', PORT);
    }else{
     console.log('App starting on port', err);
    }
   
});