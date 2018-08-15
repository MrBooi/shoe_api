drop table if exists shoes, shoe_basket;

create table shoes
(
    id serial not null primary key,
    brand text not null,
    color text not null,
    shoeSize int not null,
    price DECIMAL not null,
    quantity int not null
);

CREATE TABLE shoe_basket
(
    id serial not null PRIMARY KEY ,
    qty int not null,
    brand_id int not null,
    foreign key (brand_id) references shoes(id)
);



-- --  INSERT data into shoes
INSERT INTO shoes(brand,color,shoeSize,price,quantity)VALUES('Adidas', 'brown', 6,2400,7);
INSERT INTO shoes(brand,color,shoeSize,price,quantity)VALUES('Le coq', 'white', 5,1500, 6);
INSERT INTO shoes(brand,color,shoeSize,price,quantity)VALUES('Nike', 'black', 7,800,6);
INSERT INTO shoes(brand,color,shoeSize,price,quantity)VALUES('Adidas', 'white',7,2400,7);
INSERT INTO shoes(brand,color,shoeSize,price,quantity)VALUES('Le coq', 'blue', 7,1500,6);
INSERT INTO shoes(brand,color,shoeSize,price,quantity)VALUES('Nike','brown', 7,650,6);




