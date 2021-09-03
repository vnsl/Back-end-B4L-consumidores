const express = require('express');
const login = require('./controladores/login');
const consumidores = require('./controladores/consumidores');
const imagem = require('./controladores/imagem');
const restaurantes = require('./controladores/restaurantes');
const produtos = require('./controladores/produtos');
const endereco = require('./controladores/endereco');
const pedido = require('./controladores/pedido');
const autenticacao = require('./filtros/autenticacao');

const rotas = express();

// login
rotas.post('/login', login.login);

//consumidores
rotas.post('/consumidores', consumidores.cadastrarConsumidor);

// verificação de autenticação
rotas.use(autenticacao);

// listar restaurantes
rotas.get('/restaurantes', restaurantes.listarRestaurantes)

//Cadastrar Endereço
rotas.put('/endereco', endereco.cadastrarEndereco)

//listar Produtos do Restaurante
rotas.get('/cardapio/:id', produtos.listarProdutos)

//Criar Pedido
rotas.post('/pedido/:id', pedido.criarPedido);

//Finalizar Pedido
rotas.post('/finalizar_pedido', pedido.finalizarPedido);

// envio da imagem
rotas.post('/upload', imagem.enviarImagem);

// edição consumidor
rotas.put('/consumidores/:id', consumidores.atualizarConsumidor);


module.exports = rotas;