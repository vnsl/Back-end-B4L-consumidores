create table if not exists consumidor (
	id serial primary key,
  	nome varchar(100) not null,
  	email varchar(100) not null,
	telefone text not null,
  	senha text not null
);

create table if not exists pedido (
	id serial primary key,
	consumidor_id int not null,
	valor_pedido int not null,
  	foreign key (consumidor_id) references consumidor (id),
);

create table if not exists detalhepedido (
	id serial primary key,
	pedido_id int not null,
	produto_id int not null,
	quantidade_produto int not null,
	valor_total int not null,
  	foreign key (pedido_id) references pedido (id),
  	foreign key (produto_id) references produto (id),
);

