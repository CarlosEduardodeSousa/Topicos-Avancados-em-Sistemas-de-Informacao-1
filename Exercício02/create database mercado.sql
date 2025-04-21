create database mercado;

use mercado;

create table pedidos(
	id int not null auto_increment,
    item varchar(80) not null,
    quantidade int not null,
    preco float(6,2) not null,
    primary key (id)
);

select * from pedidos;