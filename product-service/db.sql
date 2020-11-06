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
