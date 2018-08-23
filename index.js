const express = require('express');
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
});

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
});
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
});
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
app.get('/api/remove_cart',async(req,res)=>{
    try {
      let clear = await shoe.clearCart();  
        res.json({
            status: "success",
            data: clear
        });
    } catch (e) {
        res.json({
            status: "error",
             error: e.stack
        });
    }
})

app.get('/api/cart/total',async (req,res)=>{
   try {
      let cart_total = await shoe.total();  
      res.json({
          status:'success',
          data: cart_total
      })
   } catch (e) {
    res.json({
         status:'error',
         data: e.stack
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
        const { brand,color,shoeSize,quantity,price} = req.body;
        if (brand !== undefined && shoeSize !== undefined && quantity !== undefined &&
            price !== undefined && color !== undefined) {
            let addNewShoe = await shoe.addShoe(brand, color, shoeSize, price, quantity);
            res.json({
                status: "success",
                data: addNewShoe
            })
        } else {
            res.json({
                status: 'error',
                error: e.stack
            })
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