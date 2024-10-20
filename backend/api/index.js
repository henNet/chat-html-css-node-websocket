// import { WebSocketServer } from "ws";
// import http from "http";
// import express from "express";

const { WebSocketServer } = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const servidor = new WebSocketServer({ server });

servidor.on("connection", realizarConexao);

function realizarConexao(socket) {
  console.log("Cliente conectado");
  // socket.send("Enviando uma mensagem do servidor!");

  socket.on("message", (dados) => {
    console.log(dados.toString());
    // let msg = {
    //   qt: servidor.clients.size,
    //   data: JSON.parse(dados),
    // };
    // console.log(msg);
    servidor.clients.forEach((cliente) => cliente.send(dados.toString()));
    // servidor.clients.forEach((cliente) => cliente.send(JSON.stringify(msg)));
  });
}

server.listen(PORT, () => {
  console.log("Server started on http://localhost:3000");
});

module.exports = server;
