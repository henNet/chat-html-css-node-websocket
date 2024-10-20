/* Elementos do Login */
var loginContainer = document.querySelector(".loginContainer");
var loginNameInput = document.querySelector("#loginNameInput");

/* Elementos das mensagens (Chat) */
var chatContainer = document.querySelector(".chatContainer");
var chatMsgInput = document.querySelector("#chatMsgInput");
var mensagens = document.querySelector(".mensagens");

var qt = document.querySelector(".qtUsuarios");

var clienteSocket;

var usuario = {
  id: "",
  nome: "",
  cor: "",
};

var cores = [
  "#fffae7ff",
  "#e3e1caff",
  "#cbc5afff",
  "#cee3e8ff",
  "#b9d1dbff",
  "#fffdd7ff",
  "#fff1c0ff",
  "#ffe5aaff",
  "#ffcdd0ff",
  "#e2b0b9ff",
  "#c393a1ff",
];

function conectar() {
  usuario.id = crypto.randomUUID();
  usuario.nome = loginNameInput.value;
  usuario.cor = cores[Math.floor(Math.random() * cores.length)];

  loginContainer.style.display = "none";
  chatContainer.style.display = "flex";

  // clienteSocket = new WebSocket("ws://localhost:3000");
  clienteSocket = new WebSocket(
    "https://chat-html-css-node-websocket.onrender.com"
  );

  // clienteSocket = new WebSocket(
  //   "https://backend-chat-html-css-node-websocket.vercel.app/"
  // );

  let msg = {
    type: "0",
    user: usuario,
  };

  clienteSocket.onopen = () => {
    clienteSocket.send(JSON.stringify(msg));
  };

  clienteSocket.onmessage = processarMensagem;
}

function processarMensagem({ data }) {
  console.log("Mensagem: " + data);
  let dados = JSON.parse(data);
  // let dados = data;
  // console.log("Mensagem: " + Object.values(dados.data));
  // qt.innerHTML = `Usuários online: <span><b>${dados.qt}</b></span>`;

  if (dados.type != null) {
    alert(dados.user.nome + " entrou no chat");
  } else {
    if (dados.id == usuario.id) {
      criarMinhaMensagem(dados.conteudo);
    } else {
      criarOutrosMensagem(dados.nome, dados.conteudo, dados.cor);
    }
  }

  mensagens.scrollTop = mensagens.scrollHeight;

  // window.scrollTo({
  //   top: document.body.scrollHeight,
  //   behavior: "smooth",
  // });
}

function criarMinhaMensagem(mensagem) {
  // <div class="minhasMsgs">
  //   <span>Olá, tudo bem?</span>
  // </div>;
  var minhaMsg = document.createElement("div");
  minhaMsg.classList.add("minhasMsgs");

  minhaMsg.innerHTML = `<span>${mensagem}</span>`;

  mensagens.appendChild(minhaMsg);
}

function criarOutrosMensagem(nome, mensagem, cor) {
  var outroMsg = document.createElement("div");
  outroMsg.classList.add("outrasMsgs");
  // outroMsg.style.backgroundColor = "#fffdd7ff:";
  // console.log(outroMsg.children); //.style.backgroundColor = cor;

  outroMsg.innerHTML = `<span style="background-color: ${cor}"
            ><b>${nome}</b> <br />
            ${mensagem}</span`;

  mensagens.appendChild(outroMsg);
}

function enviar() {
  let mensagem = {
    id: usuario.id,
    nome: usuario.nome,
    cor: usuario.cor,
    conteudo: chatMsgInput.value,
  };

  clienteSocket.send(JSON.stringify(mensagem));

  chatMsgInput.value = "";
}
