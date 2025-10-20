$(document).ready(function () {
  // Inicializa o livro
  $("#flipbook").turn({
    width: 900,   // largura total do livro (2 * largura de .page)
  height: 600,  // altura do livro
  autoCenter: true,
  elevation: 100,
  gradients: true,
  acceleration: true,
  duration: 1200,
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






