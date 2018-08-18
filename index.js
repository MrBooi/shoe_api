const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Shoe = require('./shoe_api.js');
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


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
    // helpers: {
    //     checkedDays: function () {
    //         if (this.checked) {
    //             return 'checked';
    //         }
    //     }
    // }

}));

app.set('view engine', 'handlebars');

const shoe = Shoe(pool);

app.get('/',async (req,res)=>{
  res.redirect('/api/shoes');
})

app.get('/api/shoes', async (req, res) => {
    try {
        let shoes = await shoe.allShoes();
        res.json({
            status: "success",
            data: shoes
        });
    } catch (e) {
        res.json({
            status: 'error',
            error: e.stack
        })
    }
})
app.get('/api/view_cart', async (req, res) => {
    try {
        let shopping_cart = await shoe.cartItems();
        res.json({
            status: "success",
            data: shopping_cart
        })
    } catch (err) {
        res.json({
            status: 'error',
            error: e.stack
        })
    }
})

app.get('/api/shoes/brand/:brandname', async (req, res) => {
    try {
        const {brandname } = req.params;
        if (brandname !== '' && brandname !== undefined) {
            let searchByBrand = await shoe.findByBrand(brandname);
            res.json({
                status: "success",
                data: searchByBrand
            })
        } else {
            return false;
        }
    } catch (e) {
        res.json({
            status: 'error',
            error: e.stack

        })
    }
})
app.get('/api/shoes/size/:size', async (req, res) => {
    try {
        const {
            size
        } = req.params;
        if (size !== '' && size !== undefined) {
            let searchBySize = await shoe.findBySize(size);
            res.json({
                status: "success",
                data: searchBySize
            })
        } else {
            return false;
        }
    } catch (e) {
        res.json({
            status: 'error',
            error: e.stack

        })
    }
})
app.get('/api/shoes/brand/:brandname/size/:size', async (req, res) => {
    try {
        const {
            brandname,
            size
        } = req.params;
        if (brandname !== '' && brandname !== undefined &&
            size !== '' || size !== undefined) {
            let searchByBrandAndSize = 
            await shoe.findBybrandAndSize(brandname,size);
            res.json({
                status: "success",
                data: searchByBrandAndSize
            })
        } else {
            return false;
        }
    } catch (e) {
        res.json({
            status: 'error',
            error: e.stack

        })
    }
})

app.post('/api/shoes/cart/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        if (id !== '' && id !== undefined){
            let addToCart = await shoe.addToShoppingCart(id);
            res.json({
                status: "success",
                data: addToCart
            })
        } else {
            return false;
        }
    } catch (e) {
        res.json({
            status: 'error',
            error: e.stack
        })
    }
})

app.post('/api/shoes', async (req, res) => {
    try {
        const {
            shoeBrand,
            shoeColor,
            shoeSize,
            qty,
            price
        } = req.body;
         console.log(shoeBrand,shoeColor,shoeSize,qty,price);
        if (shoeBrand !== undefined && shoeSize !== undefined && qty !== undefined &&
            price !== undefined && shoeColor !== undefined) {
            let addNewShoe = await shoe.addShoe(shoeBrand, shoeColor, shoeSize, price, qty);
            res.json({
                status: "success",
                data: addNewShoe
            })
        } else {
            return false
        }
    } catch (e) {
        res.json({
            status: 'error',
            error: e.stack

        })
    }
})

app.listen(PORT, (err) => {
    if (PORT) {
    console.log('App starting on port', PORT);
    }else{
     console.log('App starting on port', err);
    }
   
});