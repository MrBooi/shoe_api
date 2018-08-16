const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const  shoe  = require('./shoe_api.js');
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
    defaultLayout: 'main',
    helpers: {
        checkedDays: function () {
            if (this.checked) {
                return 'checked';
            }
        }
    }

}));

app.set('view engine', 'handlebars');

const Shoe = shoe(pool);

app.get('/api/shoes', async (req, res) => {
  try {
    let shoes = await Shoe.allShoes();
    res.json({
         status:"success",
        data:shoes});

  } catch (e) {
    res.json({
        status:'error',
      error:e.stack
        
    })
  }
})
app.get('/api/shoes/brand/:brandname', (req, res) => {
    
})
app.get('/api/shoes/size/:size', (req, res) => {
    res.json('Booi');
})
app.get('/api/shoes/brand/:brandname/size/:size', (req, res) => {
    res.json('Shoe');
})

app.post('/api/shoes/sold/:id', (req, res) => {
    res.json('Api');
})

app.post('/api/shoes', (req, res) => {
    res.json('shop');
})














app.listen(PORT, (err) => {
    console.log('App starting on port', PORT)
});
