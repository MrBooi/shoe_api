// var cartModel = document.querySelector('#cart-modal');
// var btnModel = document.querySelector('.btn-secondary');



// btnModel.addEventListener('click',()=>{
//   cartModel.classList.toggle('cart-modal')
// })



//   <!-- <div class="row">
//   <div class="AddNew">
//   <h2>Add New Items</h2>
//   <div class="messages">
//       <div class="alert">
//           <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
//             Please fill all textFields.
//         </div>
//         <div class="successful">
//             <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
//             Stock is successful added into a shopping store
//           </div>
//   </div>
 
//      <select name="shoeBrand" class="shoeBrand">
//     <option value="">Shoe Brand</option>
//     <option value="Nike">Nike</option>
//     <option value="Le coq">Le coq</option>
//     <option value="Adidas">Adidas</option>
//   </select>
//   <select name="shoeColor" class="shoeColor">
//     <option value="">Brand Color</option>
//     <option value="Black">Black</option>
//     <option value="Brown">Brown</option>
//     <option value="White">white</option>
//     <option value="Blue">Blue</option>
//   </select>
//   <select name='shoeSize' class="shoeSize">
//       <option value="">Shoe Size</option>
//       <option value="6">6</option>
//       <option value="7">7</option>
//       <option value="8">8</option>
//     </select>
  
//     <input type="text" name="qty" value="" placeholder="Enter Qty" class="shoeQty">
//     <input type="text" name="price" value="" placeholder="Enter Price" class="shoePrice">
//     <div class="displayButton">
//   <button type="button" name="button" class="btnStock">Add Stock</button>
//     </div>
//   </div>

// </div> 
// <div class="row">
// <div class="searchItems">
// <h2>Choose a Brand</h2>
// <select class="shoe">
// <option value="">All shoes</option>
// <option value="Nike">Nike</option>
// <option value="Le coq">Le coq</option>
// <option value="Adidas">Adidas</option>
// </select>

// <select class="shoeColors">
// <option value="">All</option>
// <option value="Black">Black</option>
// <option value="Brown">Brown</option>
// <option value="White">white</option>
// <option value="Blue">Blue</option>
// </select> -->

// <!-- <select class="shoeSizes">
// <option value="">All</option>
// <option value="6">6</option>
// <option value="7">7</option>
// <option value="8">8</option>
// </select>
// <button type="button" name="button" class="searchBtn">Search</button>
// </div> 

// <div class="areDisplay"> -->
// <!-- <h4>Filtered Results</h4> -->
// <!-- <div class="displayArea">
//   asdgffhghchcxh
//      </div> 
// </div>


// <div class="ShoppingBasket">
  
// </div>
// <button type="button" name="button" class="CartRemove">Remove Cart</button>
// </div>  -->


// <!-- 
// <script type="text/javascript" src="./js/shoe_catalogue_api.js"></script>
// <script type="text/javascript" src="./js/shoe_catalougueDOM.js"></script> -->






















/* .displayArea{
  float: left;
    width: 95%;
    max-height: 320px;
   margin-top: 1rem;
   margin-left: 2rem;
   margin-right: 1rem;
    padding: 1rem;
    padding: 2;
    
   /* overflow-y: scroll; */
   /* border: 1px solid ; */
   /* box-sizing: border-box */
  /* }  */ 









/* 

h1{
  text-align: center;
  font-size: 2rem;
}

h2{
  font-size: 1.3rem;
  margin-left: 2rem;
}

.hoverboard {
  background: #ccc;
  position: absolute !important;
  z-index:10000;
}
.hoverboard a {
  width:100%;
}

.AddNew{
   margin-left: 3px;
   margin-right: 3px;
   width: 99%;
   height: 240px;
  border: 1px grey dotted;
  box-sizing: border-box;
}

.shoeBrand{  
float: left;
width: 40%;
padding: 8px 0;
margin-left: 10px;
margin-right: 4px;

}

.shoeColor{  
  float: left;
  width: 40%;
  padding: 8px 0;
margin-left: 4px;
margin-bottom: 6px;
  }

  .shoeSize{
    float: left;
    width: 40%;
    padding: 8px 0;
    margin-left: 10px;
    margin-right: 4px;
    margin-bottom: 1px;

  }

  .shoeQty{
    float: left;
    width: 40%;
    padding: 7px 0;
    margin-left: 4px;
    margin-bottom: 4px;
  }

  .shoePrice{
    float: left;
    width: 40%;
    padding: 7px 0;
    margin-left: 8px;
  }
  .btnStock{
    float: left;
    width: 40%;
    padding: 6px 0;
    margin-left: 8px;
    background-color: blue;
    color: white;
  }

  .searchItems{
    box-sizing: border-box;
   padding: 1rem;
  }


  .basket{
    box-sizing: border-box
  }
  .shoe{
    display: block;
    float: left;
    width: 70%;
    padding: 8px 0;
    margin-left: 3rem;
    margin-bottom: 1rem;
    
  }

  .shoeColors{
    display: block;
    float: left;
    width: 70%;
    padding: 8px 0;
    margin-left: 3rem;
    margin-bottom: 1rem;
  }
  .shoeSizes{
    display: block;
    float: left;
    width: 70%;
    margin: auto;
    padding: 8px 0;
    margin-left: 3rem;
    margin-bottom: 1rem;
  }
  .searchBtn{
    float: left;
    width: 70%;
    margin: auto;
    padding: 8px 0;
    margin-left: 3rem;
    margin-bottom: 1rem;
    background-color: blue;
    color: white;
  }


  hr {
    height: 1px;
    border:none;
    background: #F0F0F1;
  }


/*     
    .ShoppingBasket {
      width: 98%;
     max-height: 320px;

      margin: 1rem;
      padding: 1rem;
      overflow-y: scroll;
      border-left: 1px #ccc solid;
    }


    .alert {
      display: none;
      width: 96%;
      padding-top: 0;
      padding: 3px;
      padding-left: 0;
      margin-bottom: 3px;
      margin-left: 1rem;
      background-color: #f44336;
      color: white;
    }
    
    .closebtn {
      margin-left: 15px;
      color: white;
      font-weight: bold;
      float: right;
      font-size: 22px;
      line-height: 20px;
      cursor: pointer;
      transition: 0.3s;
    }
    
  
    .closebtn:hover {
      color: black;
    }
    
    
    .displayButton{
      margin-left: 1rem;
    }
    
    
    
    .update {
      display: none;
      width: 20%;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 4px;
      margin-left: 1rem;
      background-color: #36f43f;
      color: white;
    }
    .closebtnUpdate {
      margin-left: 15px;
      color: white;
      font-weight: bold;
      float: right;
      font-size: 22px;
      line-height: 10px;
      cursor: pointer;
      transition: 0.3s;
    }
   
    .closebtnUpdate:hover {
      color: black;
    }
  
    .successful {
      display: none;
      width: 90%;
      padding-top: 0;
      padding: 3px;
      padding-left: 0;
      margin-bottom: 3px;
      margin-left: 1rem;
      background-color: #36f43f;
      color: white;
    }
    
    .closebtnsuccessful {
      margin-left: 15px;
      color: white;
      font-weight: bold;
      float: right;
      font-size: 22px;
      line-height: 20px;
      cursor: pointer;
      transition: 0.3s;
    }
  
    .closebtnsuccessful:hover {
      color: black;
    }
  
    .CartRemove{
      float: right;
      top: 0;
      /* right: 0; */
      /* margin-left: 1rem; */
      /* margin-right: 1rem; */
    /* } */

/* 
@media(min-width:1000px){

  .AddNew{
    width: 99%;
    height: 140px;
 }

 .shoeBrand{  
  float: left;
  width: 16%;
  padding: 8px 0;
  margin-left: 10px;
  margin-right: 4px;
  }
  
  .shoeColor{  
    float: left;
    width: 16%;
    padding: 8px 0;
  margin-left: 4px;
  margin-bottom: 6px;
    }
  
    .shoeSize{
      float: left;
      width: 16%;
      padding: 8px 0;
      margin-left: 10px;
      margin-right: 4px;
      margin-bottom: 1px;
  
    }
  
    .shoeQty{
      float: left;
      width: 16%;
      padding: 7px 0;
      margin-left: 4px;
      margin-bottom: 4px;
    }
  
    .shoePrice{
      float: left;
      width: 15%;
      padding: 7px 0;
      margin-left: 8px;
    }
    .btnStock{
      float: left;
      width: 15%;
      padding: 6px 0;
      margin-left: 8px;
    } */

    /* .shoe{
      display: block;
      float: left;
      width: 60%;
      padding: 8px 0;
      margin-left: 3rem;
      margin-bottom: 1rem;
      
    } */
/*   
    .shoeColors{
      display: block;
      /* float: left; */
      /* width: 60%;
      padding: 8px 0;
      margin-left: 3rem;
      margin-bottom: 1rem; */
    /* }  */
    /* .shoeSizes{
      display: block;
      float: left;
      width: 60%;
      margin: auto;
      padding: 8px 0;
      margin-left: 3rem;
      margin-bottom: 1rem;
    }
    .searchBtn{
      float: left;
      width: 60%;
      margin: auto;
      padding: 8px 0;
      margin-left: 3rem;
      margin-bottom: 1rem;
    } */
  
    /* .searchItems{
      float: left;
      width: 34%;
      max-height:400px; 
      
      padding-left: 2rem;
      border-right: 1px #ccc solid;

    } */

    /* .ShoppingBasket {
      float: right;
      width: 30%;
     max-height: 280px;
   
      margin: 1rem;
      padding: 1rem;
      overflow-y: scroll;
      border-left: 1px #ccc solid;
    } */


    /* .displayArea{
      float: left;
        width: 28%;
        max-height: 300px;
       margin-top: 1rem;
       margin-left: 2rem;
       margin-right: 1rem;
        padding: 1rem;
        padding: 2; */
        /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
       0 6px 10px 0 rgba(0, 0, 0, 0.19); */
       /* overflow-y: scroll;
       border: 1px #ccc solid ;
      } */

      /* .CartRemove{
        float: right;
        top: 0;
        right: 0;
        margin-right: 1rem;
      } */

/* }  */


 






















