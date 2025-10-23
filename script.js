// ==== CONFIG ====
const API = "http://localhost:8080"; // backend opcional
let usuarioLogado = JSON.parse(localStorage.getItem("usuario")) || null;
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ==== HELPERS ====
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
function atualizarContador() {
  const qtd = carrinho.reduce((acc, i) => acc + i.qtd, 0);
  const el = document.getElementById("qtdCarrinho");
  if (el) el.textContent = qtd;
}

// ==== DOM READY ====
document.addEventListener("DOMContentLoaded", () => {
  // LOGIN
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const user = usuarios.find((u) => u.email === email && u.senha === senha);
      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "home.html";
      } else {
        alert("E-mail ou senha incorretos!");
      }
    });
  }

  // CADASTRO
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmarSenha").value;
      const genero = document.getElementById("genero").value;

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      if (usuarios.some((u) => u.email === email)) {
        alert("E-mail já cadastrado!");
        return;
      }
      usuarios.push({ nome, email, senha, genero });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Cadastro realizado com sucesso! Faça login.");
      window.location.href = "index.html";
    });
  }

  // HOME (LOJA): saudação, busca, produtos, contador carrinho
  if (window.location.pathname.endsWith("home.html")) {
    const bemvinda = document.getElementById("bemvinda");
    if (!usuarioLogado) { window.location.href = "index.html"; return; }
    const genero = usuarioLogado.genero || "N";
    const hi = genero === "M" ? "Bem-vindo" : (genero === "F" ? "Bem-vinda" : "Bem-vindo(a)");
    const primeiroNome = (usuarioLogado.nome || "Cliente").split(" ")[0];
    bemvinda.textContent = `${hi}, ${primeiroNome} 🛍️`;

    // Produtos "
    const produtos = [
      { id: 1, nome: "Mouse Gamer ", preco: 199.90, imagem: "img/ella-don-0tkFBsoYM6M-unsplash.jpg" },
      { id: 2, nome: "Teclado Mecânico ", preco: 349.90, imagem: "img/teclado.webp" },
      { id: 3, nome: "Headset Surround", preco: 400.90, imagem: "img/H510-1_1024x1024@2x.webp" },
      { id: 4, nome: "Headset Gatinho ", preco: 259.90, imagem: "img/K9-BLUE_2.webp" },
      { id: 5, nome: "Monitor Curvo 144Hz", preco: 1299.90, imagem: "img/monitorsuperframe.jpg" },
      { id: 6, nome: "Cadeira Gamer ", preco: 800.90, imagem: "img/photo-1670946839270-cc4febd43b09.avif" },
      { id: 7, nome: "Microfone gamer", preco: 349.90, imagem: "img/microfone.webp" },
      { id: 8, nome: "Controle gamer", preco: 249.90, imagem: "img/comtrole.jpg" },
      { id: 9, nome: "Caixa de Som Gamer", preco: 399.90, imagem: "img/caixadesom.webp" },
      { id: 10, nome: "Mousepad", preco: 200.90, imagem: "img/mousepad.jpeg" },
      { id: 11, nome: "Webcam Full HD 1080p", preco: 289.90, imagem: "img/webcam.webp" },
      { id: 12, nome: "Suporte para Headset ", preco: 89.90, imagem: "img/suporteparafone.jpg" },
    ];

    const grid = document.getElementById("produtos");
    function renderizar(lista) {
      grid.innerHTML = "";
      lista.forEach((p) => {
        const card = document.createElement("div");
        card.className = "produto";
        card.innerHTML = `
          <img src="${p.imagem}" alt="${p.nome}" />
          <h3>${p.nome}</h3>
          <p>R$ ${p.preco.toFixed(2)}</p>
          <button onclick="adicionarCarrinho(${p.id})">Adicionar ao carrinho</button>
        `;
        grid.appendChild(card);
      });
    }
    renderizar(produtos);

    // Busca dinâmica
    const buscaEl = document.getElementById("busca");
    buscaEl.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase().trim();
      const filtrados = produtos.filter((p) => p.nome.toLowerCase().includes(termo));
      renderizar(filtrados);
    });

    // Adicionar ao carrinho
    window.adicionarCarrinho = (id) => {
      const p = produtos.find((x) => x.id === id);
      const existente = carrinho.find((i) => i.id === id);
      if (existente) existente.qtd += 1;
      else carrinho.push({ ...p, qtd: 1 });
      salvarCarrinho();
      atualizarContador();
    };

    atualizarContador();
  }

  // CARRINHO
  if (window.location.pathname.endsWith("carrinho.html")) {
    desenharCarrinho();
  }

  // PAGAMENTO
  if (window.location.pathname.endsWith("pagamento.html")) {
    carregarResumo();
  }
});

// ==== CARRINHO ====
function desenharCarrinho() {
  const tbody = document.querySelector("#tabelaCarrinho tbody");
  const totalGeral = document.getElementById("totalGeral");
  tbody.innerHTML = "";
  if (carrinho.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Seu carrinho está vazio 😢</td></tr>";
    totalGeral.textContent = "";
    return;
  }
  let total = 0;
  carrinho.forEach((item, idx) => {
    const sub = item.preco * item.qtd;
    total += sub;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>${item.qtd}</td>
      <td>R$ ${sub.toFixed(2)}</td>
      <td><button onclick="removerItem(${idx})">Remover</button></td>
    `;
    tbody.appendChild(tr);
  });
  totalGeral.textContent = "Total: R$ " + total.toFixed(2);
}

function removerItem(i) {
  carrinho.splice(i, 1);
  salvarCarrinho();
  desenharCarrinho();
}

function voltarLoja() { window.location.href = "home.html"; }
function irParaPagamento() { window.location.href = "pagamento.html"; }

// ==== PAGAMENTO ====
function carregarResumo() {
  const lista = document.getElementById("listaItens");
  const totalCompra = document.getElementById("totalCompra");
  lista.innerHTML = "";
  let total = 0;
  carrinho.forEach((item) => {
    const li = document.createElement("li");
    const sub = item.preco * item.qtd;
    li.textContent = `${item.qtd}x ${item.nome} - R$ ${sub.toFixed(2)}`;
    lista.appendChild(li);
    total += sub;
  });
  totalCompra.textContent = "Total da compra: R$ " + total.toFixed(2);
}

function finalizarCompra() {
  alert("✅ Compra concluída com sucesso! Obrigado por comprar na Loja Paola Gamer 💜");
  localStorage.removeItem("carrinho");
  window.location.href = "home.html";
}

function sair() {
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}
