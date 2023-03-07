
drop table cccat10.coupon;
drop table cccat10.product;
drop schema cccat10;
create schema cccat10;

create table cccat10.product (
	id_product integer,
	description text,
	height numeric,
	width numeric,
	depth numeric,
	price numeric
);

insert into cccat10.product (id_product, description, height, width, depth, price) values (1, 'Headphone', 20, 15, 7, 1000);
insert into cccat10.product (id_product, description, height, width, depth, price) values (2, 'PC Gamer', 50, 20, 50, 5000);
insert into cccat10.product (id_product, description, height, width, depth, price) values (3, 'Mouse Bungee', 10, 5, 5, 30);
insert into cccat10.product (id_product, description, height, width, depth, price) values (4, 'Camera', 20, 15, 10, 2000);
insert into cccat10.product (id_product, description, height, width, depth, price) values (5, 'Guitarra', 100, 30, 10, 1000);
insert into cccat10.product (id_product, description, height, width, depth, price) values (6, 'Geladeira', 200, 100, 50, 1500);
insert into cccat10.product (id_product, description, height, width, depth, price) values (7, 'Geladeira 2', -200, 100, 50, 1500);

create table cccat10.coupon (
	code text,
	percentage numeric,
	expiration numeric
);

insert into cccat10.coupon (code, percentage, expiration) values ('VALE20', 20, 1706929200000);
insert into cccat10.coupon (code, percentage, expiration) values ('VALE30', 30, 1643857200000);