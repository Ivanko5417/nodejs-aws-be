create extension if not exists "uuid-ossp";

create table if not exists products (
	id uuid primary key default uuid_generate_v4(),
	title text,
	description text,
	price integer
)

create table if not exists stocks (
	product_id uuid references products (id),
	count integer
)



insert into products(title, description, price)
values
('Audi A6', 'Business class', 45000),
('Audi A7', 'Sport class', 55000),
('Audi S8', 'Luxury sport class', 110000),
('Audi S6', 'Business sport class', 70000),
('Audi RS6', 'Business very fast class', 45000),
('Audi S7', 'Sport sport class', 90000),
('Audi RS7', 'Sport sport very fast class', 130000);


insert into stocks(product_id, count)
values('a08eaf00-0966-4633-bc8c-f8b9ea3fbdcc', 4),
('e539d0e1-ecd2-4d89-8469-ddc3e4dbef48', 6),
('4b171e09-4ab1-4f38-ad2c-c8c0987a5e78', 12),
('1b51baa9-f888-4a18-a786-1a838e528252', 7),
('789c41c5-8cad-44d5-ba2c-70439edd0616', 2),
('937bb767-38bf-4a5e-bdbe-9d4b4ea50ef9', 11),
('605476cc-813a-438c-9582-cecc00b36190', 12)
