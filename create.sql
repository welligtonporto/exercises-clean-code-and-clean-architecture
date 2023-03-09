
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
	weight numeric,
	price numeric
);

insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (1, 'Headphone', 20, 15, 7, 3, 1000);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (2, 'PC Gamer', 50, 20, 50, 500, 5000);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (3, 'Mouse Bungee', 10, 5, 5, 3, 30);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (4, 'Camera', 0.2, 0.15, 0.1, 1, 2000);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (5, 'Guitarra', 1, 0.3, 0.1, 3, 1000);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (6, 'Geladeira', 2, 1, 0.5, 40, 1500);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (7, 'Geladeira 2', -2, 1, 0.5, 40, 1500);
insert into cccat10.product (id_product, description, height, width, depth, weight, price) values (8, 'Geladeira 3', 2, 1, 0.5, -40, 1500);

create table cccat10.coupon (
	code text,
	percentage numeric,
	expiration numeric
);

insert into cccat10.coupon (code, percentage, expiration) values ('VALE20', 20, 1706929200000);
insert into cccat10.coupon (code, percentage, expiration) values ('VALE30', 30, 1643857200000);