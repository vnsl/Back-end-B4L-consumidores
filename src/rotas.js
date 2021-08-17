const express = require('express');
const login = require('./controladores/login');
const consumidores = require('./controladores/consumidores');
const imagem = require('./controladores/imagem');
const restaurantes = require('./controladores/restaurantes');
const produtos = require('./controladores/produtos');
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

//listar Produtos do Restaurante
rotas.get('/cardapio/:id', produtos.listarProdutos)

// envio da imagem
rotas.post('/upload', imagem.enviarImagem);

// edição consumidor
rotas.put('/consumidores/:id', consumidores.atualizarConsumidor);


module.exports = rotas;