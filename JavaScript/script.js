// aside de temas:
document.getElementById('toggleButton').addEventListener('click', function() {
    document.querySelector('aside').classList.toggle('visible');
  });


// mostrar el div de cada elemento del aside y oculatar los demas
function mostrarDiv(id) {
  document.querySelector('aside').classList.toggle('visible');
  var plots = document.getElementsByClassName("plots");
    for (var i = 0; i < plots.length; i++) {
        plots[i].innerHTML = "";
    }
    var divs = document.getElementsByClassName("divs");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById(id).style.display = "block";
}

