import { WebSocketServer } from "ws";

const PORT = 80;
const servidor = new WebSocketServer({ port: PORT });

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
