$(document).ready(function () {
  // Inicializa o livro
  $("#flipbook").turn({
    width: 900,   // largura total do livro (2 * largura de .page)
  height: 600,  // altura do livro
  autoCenter: true,
  elevation: 50,
  gradients: true,
  acceleration: true,
  duration: 2500,
    when: {
      turning: function (event, page, view) {
        $(".book-corner").removeClass("visible");
      },
      turned: function (event, page, view) {
        // Ao virar, oculta as dobras
        $(".book-corner").removeClass("visible");
      }
    }

    
  });

  // Função para ajustar o tamanho da dobra dinamicamente
function adjustTurnCurl() {
  const bookWidth = $book.width();
  const bookHeight = $book.height();

  // Define o "alcance" da dobra proporcional ao tamanho da página
  const elevation = Math.max(20, bookWidth * 0.05); // dobra ≈ 5% da largura
  const duration = Math.max(800, bookWidth * 1.2); // tempo de virada proporcional

  // Atualiza opções do Turn.js dinamicamente
  $book.turn("options", {
    elevation: elevation,
    duration: duration,
  });
}

// Chama uma vez ao carregar
adjustTurnCurl();

// E novamente sempre que redimensionar a tela
$(window).on("resize orientationchange", function () {
  adjustTurnCurl();
});
  

  // Efeito de dobra quando o mouse se aproxima das bordas
  const flipbook = document.getElementById("flipbook");
  const cornerLeft = document.querySelector(".book-corner.left");
  const cornerRight = document.querySelector(".book-corner.right");

  flipbook.addEventListener("mousemove", (e) => {
    const rect = flipbook.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Área sensível na esquerda e direita
    if (x < 80) {
      cornerLeft.classList.add("visible");
      cornerRight.classList.remove("visible");
    } else if (x > rect.width - 80) {
      cornerRight.classList.add("visible");
      cornerLeft.classList.remove("visible");
    } else {
      cornerLeft.classList.remove("visible");
      cornerRight.classList.remove("visible");
    }
  });

  flipbook.addEventListener("mouseleave", () => {
    cornerLeft.classList.remove("visible");
    cornerRight.classList.remove("visible");
  });
});

// Permite virar páginas com as setas do teclado
$(document).on("keydown", function(e) {
  var flipbook = $("#flipbook");

  switch (e.key) {
    case "ArrowLeft":
      flipbook.turn("previous");
      break;
    case "ArrowRight":
      flipbook.turn("next");
      break;
  }
});



// Permite virar clicando nas laterais do livro
$("#flipbook").on("click", function(e) {
  var flipbook = $(this);
  var offset = flipbook.offset();
  var width = flipbook.width();
  var x = e.pageX - offset.left;

  // Se clicar no lado esquerdo
  if (x < width * 0.2) {
    flipbook.turn("previous");
  }

  // Se clicar no lado direito
  else if (x > width * 0.8) {
    flipbook.turn("next");
  }
});


// ---- AJUSTE RESPONSIVO DO FLIPBOOK ----
function resizeFlipbook() {
  const $book = $('#flipbook');
  const winWidth = $(window).width();
  const winHeight = $(window).height();

  // Define tamanho máximo proporcional (16:9 como base)
  let bookWidth = winWidth * 0.9;
  let bookHeight = bookWidth * 0.6;

  // se a altura for o limitante, ajusta proporcionalmente
  if (bookHeight > winHeight * 0.8) {
    bookHeight = winHeight * 0.8;
    bookWidth = bookHeight / 0.6;
  }

  $book.turn('size', bookWidth, bookHeight);

  // centraliza via CSS
  $book.css({
    width: bookWidth + 'px',
    height: bookHeight + 'px'
  });
}

// dispara ao abrir e ao redimensionar
$(window).on('load resize orientationchange', resizeFlipbook);


// Função para ajustar dinamicamente a área da dobra
function ajustarAreaDobra() {
  const $flipbook = $("#flipbook");
  const largura = $flipbook.width();

  // Define o tamanho da dobra proporcional (por ex: 8% da largura do livro)
  const cornerSize = Math.max(30, largura * 0.08);

  // Atualiza a configuração do turn.js
  $flipbook.turn("options", {
    cornerSize: cornerSize
  });
}

// Executa ao abrir e quando redimensionar a tela
$(window).on("load resize orientationchange", ajustarAreaDobra);
