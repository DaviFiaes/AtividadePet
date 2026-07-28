/* =========================================================
   CenterPets - script.js
   Código escrito de um jeito simples, com comentários em
   português, pra ficar fácil de entender e mexer depois.
========================================================= */

/* ---------------------------------------------------------
   1) LISTA DE USUÁRIOS (fica só na memória do navegador,
      então some quando a página é recarregada)
--------------------------------------------------------- */
var usuarios = [
  { nome: "Usuário Demo", email: "demo@centerpets.com", senha: "123456" }
];

/* ---------------------------------------------------------
   2) LISTA DE ANIMAIS (10 animais em bairros de Salvador)
--------------------------------------------------------- */
var animais = [
  {
    nome: "Mel",
    especie: "Cachorro",
    raca: "Vira-lata",
    situacao: "Para adoção",
    bairro: "Barra",
    telefone: "(71) 98888-8888",
    foto: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80"
  },
  {
    nome: "Thor",
    especie: "Cachorro",
    raca: "Pastor Alemão",
    situacao: "Perdido",
    bairro: "Cajazeiras",
    telefone: "(71) 99999-9999",
    foto: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=500&q=80"
  },
  {
    nome: "Luna",
    especie: "Gato",
    raca: "Siamês",
    situacao: "Para adoção",
    bairro: "Rio Vermelho",
    telefone: "(71) 98123-4567",
    foto: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&q=80"
  },
  {
    nome: "Rex",
    especie: "Cachorro",
    raca: "Labrador",
    situacao: "Perdido",
    bairro: "Pituba",
    telefone: "(71) 98234-1122",
    foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80"
  },
  {
    nome: "Nina",
    especie: "Gato",
    raca: "Persa",
    situacao: "Para adoção",
    bairro: "Itapuã",
    telefone: "(71) 99765-4321",
    foto: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&q=80"
  },
  {
    nome: "Bob",
    especie: "Cachorro",
    raca: "Beagle",
    situacao: "Para adoção",
    bairro: "Brotas",
    telefone: "(71) 98888-1212",
    foto: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=500&q=80"
  },
  {
    nome: "Mimi",
    especie: "Gato",
    raca: "Vira-lata",
    situacao: "Perdido",
    bairro: "Liberdade",
    telefone: "(71) 99222-3344",
    foto: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&q=80"
  },
  {
    nome: "Zeus",
    especie: "Cachorro",
    raca: "Poodle",
    situacao: "Para adoção",
    bairro: "Itaigara",
    telefone: "(71) 98555-7788",
    foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80"
  },
  {
    nome: "Amora",
    especie: "Gato",
    raca: "Maine Coon",
    situacao: "Para adoção",
    bairro: "Stella Maris",
    telefone: "(71) 99111-2233",
    foto: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&q=80"
  },
  {
    nome: "Bidu",
    especie: "Cachorro",
    raca: "Vira-lata",
    situacao: "Perdido",
    bairro: "Federação",
    telefone: "(71) 98777-9900",
    foto: "https://images.unsplash.com/photo-1517849845537-4d257902861a?w=500&q=80"
  }
];

/* filtro que está ativo no momento (todos, Cachorro ou Gato) */
var filtroEspecieAtual = "todos";

/* ---------------------------------------------------------
   3) MOSTRAR OS ANIMAIS NA TELA
--------------------------------------------------------- */
function mostrarAnimais(lista) {
  var area = document.getElementById("lista-animais");
  area.innerHTML = "";

  if (lista.length === 0) {
    area.innerHTML = "<p style='text-align:center;color:#999;padding:30px'>Nenhum animal encontrado.</p>";
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var animal = lista[i];

    // classe do card muda conforme a situação (adoção ou perdido)
    var classeCard = animal.situacao === "Perdido" ? "perdido" : "adocao";

    var card = document.createElement("div");
    card.className = "card-animal " + classeCard;
    card.innerHTML =
      "<img class='card-foto' src='" + animal.foto + "' alt='" + animal.nome + "'>" +
      "<div class='card-corpo'>" +
        "<div class='card-nome'>" + animal.nome + "</div>" +
        "<div class='card-raca'>" + animal.especie + " • " + animal.raca + "</div>" +
        "<span class='card-situacao'>" + animal.situacao + "</span>" +
        "<div class='card-bairro'>📍 " + animal.bairro + ", Salvador</div>" +
        "<button class='card-botao'>Ver detalhes</button>" +
      "</div>";

    // guarda o índice do animal pra sabermos qual foi clicado
    (function (animalClicado) {
      card.querySelector(".card-botao").addEventListener("click", function () {
        abrirModalAnimal(animalClicado);
      });
    })(animal);

    area.appendChild(card);
  }
}

/* ---------------------------------------------------------
   4) BUSCA E FILTRO DOS ANÚNCIOS
--------------------------------------------------------- */
function aplicarFiltros() {
  var textoBusca = document.getElementById("campo-busca").value.toLowerCase().trim();
  var resultado = [];

  for (var i = 0; i < animais.length; i++) {
    var animal = animais[i];

    var passaNoFiltroEspecie = filtroEspecieAtual === "todos" || animal.especie === filtroEspecieAtual;
    var passaNaBusca = animal.bairro.toLowerCase().indexOf(textoBusca) !== -1;

    if (passaNoFiltroEspecie && passaNaBusca) {
      resultado.push(animal);
    }
  }

  mostrarAnimais(resultado);
}

document.getElementById("campo-busca").addEventListener("input", aplicarFiltros);

var botoesFiltro = document.querySelectorAll(".filtro-botao");
for (var i = 0; i < botoesFiltro.length; i++) {
  botoesFiltro[i].addEventListener("click", function () {
    // tira o "selecionado" de todos os botões e coloca só no que foi clicado
    for (var j = 0; j < botoesFiltro.length; j++) {
      botoesFiltro[j].classList.remove("selecionado");
    }
    this.classList.add("selecionado");

    filtroEspecieAtual = this.dataset.filtro;
    aplicarFiltros();
  });
}
botoesFiltro[0].classList.add("selecionado"); // "Todos" começa selecionado

/* ---------------------------------------------------------
   5) MODAL (a caixinha que aparece no meio da tela)
--------------------------------------------------------- */
var modal = document.getElementById("modal");
var modalFoto = document.getElementById("modal-foto");
var modalIcone = document.getElementById("modal-icone");
var modalTitulo = document.getElementById("modal-titulo");
var modalTexto = document.getElementById("modal-texto");
var modalLista = document.getElementById("modal-lista");
var modalOk = document.getElementById("modal-ok");

// modal simples, só com um aviso (usado no login, cadastro, publicar...)
function abrirModalAviso(icone, titulo, texto) {
  modalFoto.hidden = true;
  modalIcone.hidden = false;
  modalIcone.textContent = icone;
  modalTitulo.textContent = titulo;
  modalTexto.textContent = texto;
  modalLista.innerHTML = "";
  modalOk.textContent = "OK";
  modal.hidden = false;
}

// modal com os detalhes de um animal (foto + informações)
function abrirModalAnimal(animal) {
  modalIcone.hidden = true;
  modalFoto.hidden = false;
  modalFoto.src = animal.foto;
  modalFoto.alt = animal.nome;

  modalTitulo.textContent = animal.nome;
  modalTexto.textContent = animal.situacao + " em " + animal.bairro + ", Salvador";

  modalLista.innerHTML =
    "<p><strong>Espécie:</strong> " + animal.especie + "</p>" +
    "<p><strong>Raça:</strong> " + animal.raca + "</p>" +
    "<p><strong>Telefone:</strong> " + animal.telefone + "</p>";

  modalOk.textContent = "Fechar";
  modal.hidden = false;
}

function fecharModal() {
  modal.hidden = true;
}

document.getElementById("modal-fechar").addEventListener("click", fecharModal);
modalOk.addEventListener("click", fecharModal);
modal.addEventListener("click", function (evento) {
  if (evento.target === modal) fecharModal();
});
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") fecharModal();
});

/* ---------------------------------------------------------
   6) FORMULÁRIO DE LOGIN
--------------------------------------------------------- */
document.getElementById("form-login").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var email = document.getElementById("login-email").value.trim().toLowerCase();
  var senha = document.getElementById("login-senha").value;

  var usuarioEncontrado = null;
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email.toLowerCase() === email && usuarios[i].senha === senha) {
      usuarioEncontrado = usuarios[i];
    }
  }

  if (usuarioEncontrado) {
    abrirModalAviso("🎉", "Bem-vindo(a) de volta!", "Login feito com sucesso, " + usuarioEncontrado.nome + ".");
    evento.target.reset();
  } else {
    abrirModalAviso("🚫", "Não foi possível entrar", "E-mail ou senha incorretos.");
  }
});

/* ---------------------------------------------------------
   7) FORMULÁRIO DE CADASTRO
--------------------------------------------------------- */
document.getElementById("form-cadastro").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nome = document.getElementById("cad-nome").value.trim();
  var email = document.getElementById("cad-email").value.trim().toLowerCase();
  var senha = document.getElementById("cad-senha").value;
  var confirmar = document.getElementById("cad-confirmar").value;

  if (senha !== confirmar) {
    abrirModalAviso("⚠️", "As senhas não são iguais", "Confira a senha e a confirmação e tente de novo.");
    return;
  }

  var jaExiste = false;
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email.toLowerCase() === email) jaExiste = true;
  }
  if (jaExiste) {
    abrirModalAviso("⚠️", "E-mail já cadastrado", "Já existe uma conta com esse e-mail. Tente entrar.");
    return;
  }

  usuarios.push({ nome: nome, email: email, senha: senha });
  abrirModalAviso("🎉", "Conta criada!", "Bem-vindo(a) ao CenterPets, " + nome + "!");
  evento.target.reset();
});

/* ---------------------------------------------------------
   8) FORMULÁRIO DE PUBLICAR ANIMAL
--------------------------------------------------------- */
document.getElementById("form-publicar").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nome = document.getElementById("pub-nome").value.trim() || "Animal sem nome";
  var especie = document.getElementById("pub-especie").value;
  var raca = document.getElementById("pub-raca").value.trim() || "Não informado";
  var situacao = document.querySelector('input[name="pub-situacao"]:checked').value;
  var bairro = document.getElementById("pub-bairro").value.trim();
  var telefone = document.getElementById("pub-telefone").value.trim();

  var fotoPadrao = especie === "Gato"
    ? "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&q=80"
    : "https://images.unsplash.com/photo-1517849845537-4d257902861a?w=500&q=80";

  // coloca o novo animal no início da lista
  animais.unshift({
    nome: nome,
    especie: especie,
    raca: raca,
    situacao: situacao,
    bairro: bairro,
    telefone: telefone,
    foto: fotoPadrao
  });

  aplicarFiltros();
  abrirModalAviso("🐾", "Anúncio publicado!", nome + " foi publicado com sucesso. Obrigado por ajudar!");
  evento.target.reset();
});

/* ---------------------------------------------------------
   9) BOTÃO DE TEMA CLARO / ESCURO
--------------------------------------------------------- */
var botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", function () {
  var estaEscuro = document.documentElement.getAttribute("data-tema") === "escuro";

  if (estaEscuro) {
    document.documentElement.removeAttribute("data-tema");
    botaoTema.textContent = "🌙"; // lua = clique pra ir pro escuro
  } else {
    document.documentElement.setAttribute("data-tema", "escuro");
    botaoTema.textContent = "☀️"; // sol = clique pra voltar pro claro
  }
});

/* ---------------------------------------------------------
   10) MODAL DE SEÇÃO
   (Anúncios, Publicar, Entrar e Cadastrar abrem dentro de
   um modal quando clicados no menu, no rodapé ou no hero)
--------------------------------------------------------- */
var modalSecao = document.getElementById("modal-secao");
var modalSecaoConteudo = document.getElementById("modal-secao-conteudo");

function abrirSecaoModal(idSecao) {
  // se já tinha uma seção dentro do modal, devolve ela pro lugar
  // de origem antes de colocar a nova (assim dá pra trocar de
  // "Entrar" pra "Cadastrar" sem bug)
  fecharSecaoModal();

  var secao = document.getElementById(idSecao);
  if (!secao) return;

  secao.classList.add("em-modal");
  modalSecaoConteudo.appendChild(secao);
  modalSecao.hidden = false;
}

function fecharSecaoModal() {
  var secao = modalSecaoConteudo.firstElementChild;
  if (secao) {
    secao.classList.remove("em-modal");
    var lugarOriginal = document.getElementById("lugar-" + secao.id);
    if (lugarOriginal) {
      lugarOriginal.parentNode.insertBefore(secao, lugarOriginal);
    }
  }
  modalSecao.hidden = true;
}

// pega todos os links/botões que têm o atributo data-secao
// (menu, rodapé, hero e os links de "trocar" entre login/cadastro)
var linksDeSecao = document.querySelectorAll("[data-secao]");
for (var i = 0; i < linksDeSecao.length; i++) {
  linksDeSecao[i].addEventListener("click", function (evento) {
    evento.preventDefault(); // não deixa a página rolar, abre o modal
    abrirSecaoModal(this.dataset.secao);
  });
}

document.getElementById("modal-secao-fechar").addEventListener("click", fecharSecaoModal);
modalSecao.addEventListener("click", function (evento) {
  if (evento.target === modalSecao) fecharSecaoModal();
});
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && !modalSecao.hidden) fecharSecaoModal();
});

/* ---------------------------------------------------------
   11) INÍCIO — mostra todos os animais assim que a página abre
--------------------------------------------------------- */
mostrarAnimais(animais);