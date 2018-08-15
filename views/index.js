const  axios = require('axios');


axios.get('/api/shoes')
.then((result)=>{
    console.log(result);

    shoeElem = document.querySelector('.shoes');
    result.data.data.forEach(shoe => {
        let sh = "<li>" + shoe.brand +'-'+shoe.color+ "</li>";
        shoeElem.innerHTMl +=sh;
    });
})