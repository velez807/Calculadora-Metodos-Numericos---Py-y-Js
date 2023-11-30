// funciones de multipropósito
function preprocessEquation(equation) {
  // Reemplazar expresiones simplificadas
  equation = equation.replace(/(\d)x/g, '$1*x'); // 2x -> 2*x
  equation = equation.replace(/x\^(\d)/g, 'x**$1'); // x^2 -> x**2

  // Agregar manejo para 'y'
  equation = equation.replace(/(\d)y/g, '$1*y'); // 2y -> 2*y
  equation = equation.replace(/y\^(\d)/g, 'y**$1'); // y^2 -> y**2

  console.log(equation);
  return equation;
}

function simplifyEquation(equation) {
  // Eliminar redundancias
  equation = equation.replace(/1\*x/g, 'x'); // 1*x -> x
  equation = equation.replace(/x\*\*1/g, 'x'); // x**1 -> x
  equation = equation.replace(/x\^1/g, 'x'); // x^1 -> x
  equation = equation.replace(/\*/g, ''); // 2*x -> 2x
  equation = equation.replace(/\+ -/g, '-'); // + - -> -

  // Agregar manejo para 'y'
  equation = equation.replace(/1\*y/g, 'y'); // 1*y -> y
  equation = equation.replace(/y\*\*1/g, 'y'); // y**1 -> y
  equation = equation.replace(/y\^1/g, 'y'); // y^1 -> y
  equation = equation.replace(/1\*y/g, 'y'); // 1*y -> y
  equation = equation.replace(/-\+/g, '-'); // -+ -> -


  equation = equation.replace(/\^(\d)/g, '<sup>$1</sup>'); // x^2 -> x<sup>2</sup>


  console.log(equation);
  return equation;
}

function drawGraph(expression, plotId) {
  try {
    functionPlot({
      target: plotId,
      width: 500,
      height: 300,
      yAxis: { domain: [-1, 9] },
      grid: true,
      data: [{
        fn: expression
      }]
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

function drawGraph2(expression1, expression2, plotId) {
  //cambiar las y por x
  if (expression1.includes("y")) {
    expression1 = expression1.replace(/y/g, 'x');
  }
  if (expression2.includes("y")) {
    expression2 = expression2.replace(/y/g, 'x');
  }
  try {

    functionPlot({
      target: plotId,
      width: 500,
      height: 300,
      yAxis: { domain: [-1, 9] },
      grid: true,
      data: [{
        fn: expression1,
      },
      {
        fn: expression2,
      }]
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

function drawIntegral(expression, lowerLimit, upperLimit, plotId) {
  try {
    functionPlot({
      target: plotId,
      data: [{
        fn: expression,
        range: [lowerLimit, upperLimit],
        closed: true
      }],
      annotations: [{
        x: lowerLimit,
        text: 'a'
      }, {
        x: upperLimit,
        text: 'b'
      }]
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
}


function mostrarMatriz(titulo, container, matriz) {
  var div = document.createElement("div");
  var title = document.createElement("h3");
  title.textContent = titulo;
  div.appendChild(title);

  for (var i = 0; i < matriz.length; i++) {
    var rowDiv = document.createElement("div");
    rowDiv.className = "matriz-row";

    for (var j = 0; j < matriz[i].length; j++) {
      var cellDiv = document.createElement("div");
      cellDiv.className = "matriz-cell";
      if (matriz[i][j] % 1 == 0) {
        cellDiv.textContent = matriz[i][j];
      }
      else { cellDiv.textContent = matriz[i][j].toFixed(2); }

      rowDiv.appendChild(cellDiv);
    }

    div.appendChild(rowDiv);
  }

  container.appendChild(div);
}

function generarMatriz(x, y) {
  var matriz = [];
  for (var i = 0; i < x.length; i++) {
    matriz.push([x[i], y[i]]);
  }
  return matriz;
}


function evaluarEcuacion(ecuacion, x) {
  return eval(ecuacion.replace("x", x));
}

function vibrarElemento(elementoId) {
  var elemento = document.getElementById(elementoId);

  // Agregar la clase que aplica la animación
  elemento.classList.add('vibrar');

  // Eliminar la clase después de la duración de la animación
  setTimeout(function () {
    elemento.classList.remove('vibrar');
  }, 300); // Duración de la animación en milisegundos
}




// Path: calculos.js

function puntoFijo() {
  // 20 / (x^2 + 2x + 10)
  var ecuacion = "";
  var ecuacion1 = document.getElementById("ecuacion-punto-fijo").value;
  ecuacion = preprocessEquation(ecuacion1);
  var valorInicial = parseFloat(document.getElementById("valorInicial-punto-fijo").value);
  // revisar que si estén llenos los campos, sino hacerlos vibrar y salir
  if (ecuacion1 == "" || valorInicial == "") {
    vibrarElemento("ecuacion-punto-fijo");
    vibrarElemento("valorInicial-punto-fijo");
    return;
  }

  var resultadoDiv = document.getElementById("resultado-punto-fijo");
  resultadoDiv.innerHTML = "";

  var plotId = document.getElementById("plot-punto-fijo");
  plotId.innerHTML = "";

  var logs = document.getElementById("logs-punto-fijo");
  logs.innerHTML = "";

  var limiteIteraciones = 1000;
  var toleranciaError = 1e-6;

  for (var i = 0; i < limiteIteraciones; i++) {
    var x = valorInicial;
    var x_nueva = eval(ecuacion.replace("x", valorInicial));
    var error = Math.abs(x_nueva - valorInicial);
    logs.innerHTML += `x${i} = ${x_nueva}\n`;


    if (error < toleranciaError) {
      resultadoDiv.innerHTML += `La ecuación converge a: ${x_nueva}<br> Se realizaron ${i} iteraciones.<br> El error fue de: ${error}<br>`;
      drawGraph(ecuacion1, plotId);
      return;
    }

    valorInicial = x_nueva;
  }

  resultadoDiv.innerHTML += `La ecuación no converge después de ${limiteIteraciones} iteraciones.<br>`;
}

function newton() {
  // x^3 + 2x^2 + 10x -20
  // 3x^2 + 4x + 10
  var ecuacion = "";
  var derivada = "";
  var ecuacion1 = document.getElementById("ecuacion-newton").value;
  ecuacion = preprocessEquation(ecuacion1);
  var derivada1 = document.getElementById("derivada-newton").value;
  derivada = preprocessEquation(derivada1);
  var x = parseFloat(document.getElementById("valorInicial-newton").value);
  var num_iteraciones = 1000;

  if (ecuacion1 == "" || derivada1 == "" || x == "") {
    vibrarElemento("ecuacion-newton");
    vibrarElemento("derivada-newton");
    vibrarElemento("valorInicial-newton");
    return;
  }

  var resultadoDiv = document.getElementById("resultado-newton");
  resultadoDiv.innerHTML = "";

  var plotId = document.getElementById("plot-newton");
  plotId.innerHTML = "";

  var logs = document.getElementById("logs-newton");
  logs.innerHTML = "";

  for (var i = 0; i < num_iteraciones; i++) {
    var x_nueva = x - (eval(ecuacion) / eval(derivada));
    var error = Math.abs(x_nueva - x);
    logs.innerHTML += `x${i} = ${x_nueva}\n`;

    if (error < 1e-6) {
      resultadoDiv.innerHTML += `La ecuación converge a: ${x_nueva}<br> Se realizaron ${i} iteraciones.<br> El error fue de: ${error}<br>`;
      drawGraph(ecuacion1, plotId);
      return;
    }

    x = x_nueva;
  }

  resultadoDiv.innerHTML += `La ecuación no converge después de ${num_iteraciones} iteraciones.<br>`;
}


function biseccion() {
  // x^3 + 2x^2 + 10x -20
  // 1
  // 2
  var ecuacion = document.getElementById("ecuacion-biseccion").value;
  var ecuacion1 = preprocessEquation(ecuacion);
  var xa = parseFloat(document.getElementById("xa-biseccion").value);
  var xb = parseFloat(document.getElementById("xb-biseccion").value);
  var max_iteraciones = 1000;
  var tolerancia = 1e-6;

  if (ecuacion == "" || xa == "" || xb == "") {
    vibrarElemento("ecuacion-biseccion");
    vibrarElemento("xa-biseccion");
    vibrarElemento("xb-biseccion");
    return;
  }

  var iteracion = 0;

  var resultadoDiv = document.getElementById("resultado-biseccion");
  resultadoDiv.innerHTML = "";

  var plotId = document.getElementById("plot-biseccion");
  plotId.innerHTML = "";

  var logs = document.getElementById("logs-biseccion");
  logs.innerHTML = "";

  // Verificar si hay cambio de signo en el intervalo [a, b]
  if (evaluarEcuacion(ecuacion1, xa) * evaluarEcuacion(ecuacion1, xb) > 0) {
    resultadoDiv.innerHTML = "No hay raíz en el intervalo [a, b]";
    return;
  }

  while (iteracion < max_iteraciones) {
    var xr = (xa + xb) / 2;
    var error = Math.abs(xb - xa) / 2;
    logs.innerHTML += `x${iteracion} = ${xr}\n`;

    if (error < tolerancia) {
      resultadoDiv.innerHTML += `La raíz aproximada es: ${xr}<br> Se realizaron ${iteracion} iteraciones.<br> El error fue de: ${error}<br>`;
      drawGraph(ecuacion, plotId);
      return;
    }

    iteracion++;

    if (evaluarEcuacion(ecuacion1, xa) * evaluarEcuacion(ecuacion1, xr) < 0) {
      xb = xr;
    } else {
      xa = xr;
    }
  }

  var raiz_aproximada = (xa + xb) / 2;
  resultadoDiv.innerHTML += `La raíz aproximada es: ${raiz_aproximada}<br> Se realizaron ${iteracion} iteraciones.<br> El error fue de: ${(xb - xa) / 2}<br>`;
  drawGraph(ecuacion, plotId);

}


function integracion() {
  // x^2 - 10x + 21
  // 3
  // 7
  // 1000
  var ecuacion = document.getElementById("ecuacion-integracion").value;
  var ecuacion1 = preprocessEquation(ecuacion);
  var a = parseFloat(document.getElementById("xa-integracion").value);
  var b = parseFloat(document.getElementById("xb-integracion").value);
  var n = parseInt(document.getElementById("n-integracion").value);
  var h = (b - a) / n;

  if(ecuacion == "" ||  b == "" || n == ""){
    vibrarElemento("ecuacion-integracion");
    vibrarElemento("xa-integracion");
    vibrarElemento("xb-integracion");
    vibrarElemento("n-integracion");
    return;
  }

  var logs = document.getElementById("logs-integracion");
  logs.innerHTML = "";

  var plotId = document.getElementById("plot-integracion");
  plotId.innerHTML = "";

  var resultadoDiv = document.getElementById("resultado-integracion");
  resultadoDiv.innerHTML = "";

  var suma_areas = 0;

  for (var i = 0; i < n; i++) {
    var x_i = a + i * h;
    var area_rectangulo = h * evaluarEcuacion(ecuacion1, x_i);
    suma_areas += area_rectangulo;
    logs.innerHTML += `x${i} = ${x_i}\n`;
  }

  resultadoDiv.innerHTML = `El área bajo la curva es: ${suma_areas}<br>`;
  drawIntegral(ecuacion, a, b, plotId);
}



function derivacion() {
  // x^0.5
  // 5
  // 0.3
  var ecuacion = document.getElementById("ecuacion-derivacion").value;
  var ecuacion1 = preprocessEquation(ecuacion);
  var x = parseFloat(document.getElementById("x-derivacion").value);
  var h = parseFloat(document.getElementById("h-derivacion").value);
  var delta_x = h / 2;

  if(ecuacion == "" || x == "" || h == ""){
    vibrarElemento("ecuacion-derivacion");
    vibrarElemento("x-derivacion");
    vibrarElemento("h-derivacion");
    return;
  }

  var logs = document.getElementById("logs-derivacion");
  logs.innerHTML = "";

  var resultadoDiv = document.getElementById("resultado-derivacion");
  resultadoDiv.innerHTML = "";

  var plotId = document.getElementById("plot-derivacion");
  plotId.innerHTML = "";

  var a = evaluarEcuacion(ecuacion1, x);
  var b = evaluarEcuacion(ecuacion1, x + delta_x);
  var c = evaluarEcuacion(ecuacion1, x - delta_x);

  var m1 = (b - a) / delta_x;
  var m2 = (a - c) / delta_x;
  var m3 = (b - c) / h;

  logs.innerHTML += `X0 = ${a}\n`;
  logs.innerHTML += `X0 + delta x = ${b}\n`;
  logs.innerHTML += `X0 - delta x = ${c}\n`;

  logs.innerHTML += `m1 = ${m1}\n`;
  logs.innerHTML += `m2 = ${m2}\n`;
  logs.innerHTML += `m3 = ${m3}\n`;

  resultadoDiv.innerHTML = `m1 = ${m1}<br>m2 = ${m2}<br>m3 = ${m3}<br>`;
  drawGraph(ecuacion, plotId);
}


function gauss_seidel() {
  // (1-2y)/5
  // x/4
  // 1  
  // 2
  var ecuacion1plot = document.getElementById("ecuacion1-gauss").value;
  var ecuacion2plot = document.getElementById("ecuacion2-gauss").value;
  var ecuacion1 = preprocessEquation(ecuacion1plot);
  var ecuacion2 = preprocessEquation(ecuacion2plot);
  var x = parseFloat(document.getElementById("valorInicialX-gauss").value);
  var y = parseFloat(document.getElementById("valorInicialY-gauss").value);
  var num_iteraciones = 1000;
  var tolerancia = 1e-6;

  if (ecuacion1plot == "" || ecuacion2plot == "" || x == "" || y == "") {
    vibrarElemento("ecuacion1-gauss");
    vibrarElemento("ecuacion2-gauss");
    vibrarElemento("valorInicialX-gauss");
    vibrarElemento("valorInicialY-gauss");
    return;
  }

  var resultadoDiv = document.getElementById("resultado-gauss-seidel");
  resultadoDiv.innerHTML = "";

  var logs = document.getElementById("logs-gauss-seidel");
  logs.innerHTML = "";

  var plotId = document.getElementById("plot-gauss-seidel");
  plotId.innerHTML = "";


  for (var i = 0; i < num_iteraciones; i++) {
    var x_nueva = eval(ecuacion1.replace("y", y));
    var y_nueva = eval(ecuacion2.replace("x", x));
    var error_x = Math.abs(x_nueva - x);
    var error_y = Math.abs(y_nueva - y);
    logs.innerHTML += `x${i} = ${x_nueva}, y${i} = ${y_nueva}\n`;

    if (error_x < tolerancia && error_y < tolerancia) {
      resultadoDiv.innerHTML += `La ecuación converge a:<br> x = ${x_nueva},<br> y = ${y_nueva}<br> Se realizaron ${i} iteraciones.<br> El error fue de: ${error_x}<br>`;
      drawGraph2(ecuacion1plot, ecuacion2plot, plotId);
      return;
    }

    x = x_nueva;
    y = y_nueva;
  }

  resultadoDiv.innerHTML += `La ecuación no converge después de ${num_iteraciones} iteraciones.<br>`;
}


function gauss_jacobi() {
  // (1-2y)/5
  // x/4
  // 1  
  // 2
  var ecuacion1plot = document.getElementById("ecuacion1-jacobi").value;
  var ecuacion2plot = document.getElementById("ecuacion2-jacobi").value;
  var ecuacion1 = preprocessEquation(ecuacion1plot);
  var ecuacion2 = preprocessEquation(ecuacion2plot);
  var x = parseFloat(document.getElementById("valorInicialX-jacobi").value);
  var y = parseFloat(document.getElementById("valorInicialY-jacobi").value);
  var num_iteraciones = 1000;
  var tolerancia = 1e-6;

  if (ecuacion1plot == "" || ecuacion2plot == "" || x == "" || y == "") {
    vibrarElemento("ecuacion1-jacobi");
    vibrarElemento("ecuacion2-jacobi");
    vibrarElemento("valorInicialX-jacobi");
    vibrarElemento("valorInicialY-jacobi");
    return;
  }

  var resultadoDiv = document.getElementById("resultado-jacobi");
  resultadoDiv.innerHTML = "";

  var logs = document.getElementById("logs-jacobi");
  logs.innerHTML = "";

  var plotId = document.getElementById("plot-jacobi");
  plotId.innerHTML = "";

  // hacer los calculos hasta que el error sea menor a la tolerancia
  for (var i = 0; i < num_iteraciones; i++) {
    var x_nueva = eval(ecuacion1.replace("y", y));
    var y_nueva = eval(ecuacion2.replace("x", x));
    var error_x = Math.abs(x_nueva - x);
    var error_y = Math.abs(y_nueva - y);
    logs.innerHTML += `x${i} = ${x_nueva}, y${i} = ${y_nueva}\n`;

    if (error_x < tolerancia && error_y < tolerancia) {
      resultadoDiv.innerHTML += `La ecuación converge a:<br> x = ${x_nueva},<br> y = ${y_nueva}<br> Se realizaron ${i} iteraciones.<br> El error fue de: ${error_x}<br>`;
      drawGraph2(ecuacion1plot, ecuacion2plot, plotId);
      return;
    }

    x = x_nueva;
    y = y_nueva;
  }

  resultadoDiv.innerHTML += `La ecuación converge a:<br> x = ${x_nueva},<br> y = ${y_nueva}<br>`;
  drawGraph2(ecuacion1plot, ecuacion2plot, plotId);
}

function Iniciarlagrange(cual) {
  var matrizContainer = document.getElementById("matriz-container");
  matrizContainer.innerHTML = "";
  document.getElementById("resultado-lagrange").innerHTML = "";

  var x = [];
  var y = [];

  if (cual == 0) {
    var n = parseInt(document.getElementById("numDatos-lagrange").value);
    if (n < 2 || n === null || isNaN(n) || n === undefined || n === "") {
      console.log("error");
      vibrarElemento("numDatos-lagrange");
      return;
    }
    var inputsContainer = document.getElementById("inputs-container-lagrange");
    inputsContainer.innerHTML = "";
  } else {
    var n = parseInt(document.getElementById("numDatos-lagrange-directo").value);
    if (n < 2 || n === null || isNaN(n) || n === undefined || n === "") {
      console.log("error");
      vibrarElemento("numDatos-lagrange-directo");
      return;
    }
    var inputsContainer = document.getElementById("inputs-container-lagrange-directo");
    inputsContainer.innerHTML = "";
  }

  for (var i = 0; i < n; i++) {
    var xInput = document.createElement("input");
    xInput.type = "number";
    xInput.className = "input-lagrange";
    xInput.placeholder = "x" + (i + 1);
    inputsContainer.appendChild(xInput);
    x.push(xInput);

    var yInput = document.createElement("input");
    yInput.type = "number";
    yInput.className = "input-lagrange";
    yInput.placeholder = "y" + (i + 1);
    inputsContainer.appendChild(yInput);
    y.push(yInput);

    // Crear un contenedor para el par de puntos (x, y)
    var div = document.createElement("div");
    div.className = "input-pair";

    // Crear elementos de texto para los paréntesis y la coma
    var leftParenthesis = document.createTextNode("(");
    var comma = document.createTextNode(", ");
    var rightParenthesis = document.createTextNode(")");

    // Agregar los elementos al contenedor
    div.appendChild(leftParenthesis);
    div.appendChild(xInput);
    div.appendChild(comma);
    div.appendChild(yInput);
    div.appendChild(rightParenthesis);

    // Agregar el contenedor al contenedor principal
    inputsContainer.appendChild(div);
  }

  if (cual == 0) {
    var calcularButton = document.createElement("button");
    calcularButton.type = "button";
    calcularButton.textContent = "Calcular";
    calcularButton.onclick = lagrangeGaussJordan;
    inputsContainer.appendChild(calcularButton);
  } else {
    // crear input de x inicial
    // crear label 
    var label = document.createElement("label");
    label.textContent = "ingrese la x: ";
    inputsContainer.appendChild(label);
    var x0Input = document.createElement("input");
    x0Input.type = "number";
    x0Input.id = "x0-lagrange-directo";
    x0Input.placeholder = "x";
    inputsContainer.appendChild(x0Input);

    var calcularButton = document.createElement("button");
    calcularButton.type = "button";
    calcularButton.textContent = "Calcular";
    calcularButton.onclick = lagrangeDirecto;
    inputsContainer.appendChild(calcularButton);

  }


}

function lagrangeGaussJordan() {
  document.getElementById("resultado-lagrange").innerHTML = "";
  // Polinomio de Lagrange con eliminacion de Gauss-Jordan
  var n = parseInt(document.getElementById("numDatos-lagrange").value);
  var x = [];
  var y = [];

  // Obtener los valores de x y y
  for (var i = 0; i < n; i++) {
    x.push(parseFloat(document.getElementsByClassName("input-lagrange")[i * 2].value));
    y.push(parseFloat(document.getElementsByClassName("input-lagrange")[i * 2 + 1].value));

    // Revisar que todos los campos estén llenos
    if (isNaN(x[i]) || isNaN(y[i])) {
      vibrarElemento("inputs-container-lagrange");
      return;
    }
  }

  console.log(x);
  console.log(y);


  // Crear y mostrar la matriz original
  var matrizContainer = document.getElementById("matriz-container");
  matrizContainer.innerHTML = "";
  mostrarMatriz("Matriz Original", matrizContainer, generarMatriz(x, y));

  // La formula es de la forma: y = a0 + a1*x + a2*x^2 + ... + an*x^n
  // Se crea una matriz de n x (n+1) para almacenar los coeficientes
  var matriz = [];
  for (var i = 0; i < n; i++) {
    matriz.push(new Array(n + 1).fill(0));
  }

  // Se llena la matriz con los valores de x
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      matriz[i][j] = Math.pow(x[i], j);
    }
  }

  // Se llena la matriz con los valores de y
  for (var i = 0; i < n; i++) {
    matriz[i][n] = y[i];
  }

  // Se aplica el metodo de Gauss-Jordan
  for (var i = 0; i < n; i++) {
    if (matriz[i][i] === 0.0) {
      document.getElementById("resultado-lagrange").innerHTML = "No tiene solucion";
      return;
    }
    var log = document.getElementById("logs-lagrange");
    log.innerHTML += "\nDividiendo la fila " + (i + 1) + " entre " + matriz[i][i] + "\n";
    for (var j = 0; j < n; j++) {
      if (i !== j) {
        var ratio = matriz[j][i] / matriz[i][i];

        log.innerHTML += "R" + (j + 1) + " = R" + (j + 1) + " - " + ratio + " * R" + (i + 1) + "\n";


        for (var k = 0; k <= n; k++) {
          matriz[j][k] = matriz[j][k] - ratio * matriz[i][k];
        }

        // Mostrar la matriz después de cada paso
        mostrarMatriz("Matriz después de la iteración " + (i + 1), matrizContainer, matriz);
      }
    }
  }

  // Se obtienen los valores de los coeficientes
  var a = new Array(n);
  for (var i = 0; i < n; i++) {
    a[i] = matriz[i][n] / matriz[i][i];
  }

  // Se imprime el polinomio
  var polinomio = "y = ";
  for (var i = 0; i < n; i++) {
    if (i === 0) {
      polinomio += a[i];
    } else {
      polinomio += " + " + a[i] + "*x^" + i;
    }
  }

  polinomio = simplifyEquation(polinomio);

  document.getElementById("resultado-lagrange").innerHTML = "El polinomio es: " + polinomio;
}


function lagrangeDirecto() {
  console.log("lagrange directo");
  document.getElementById("resultado-lagrange-directo").innerHTML = "";
  // Polinomio de Lagrange por método directo
  var n = parseInt(document.getElementById("numDatos-lagrange-directo").value);
  var x = [];
  var y = [];

  // Obtener los valores de x y y
  for (var i = 0; i < n; i++) {
    x.push(parseFloat(document.getElementsByClassName("input-lagrange")[i * 2].value));
    y.push(parseFloat(document.getElementsByClassName("input-lagrange")[i * 2 + 1].value));

    // Revisar que todos los campos estén llenos
    if (isNaN(x[i]) || isNaN(y[i])) {
      vibrarElemento("inputs-container-lagrange-directo");
      return;
    }
  }

  console.log(x);
  console.log(y);

  // ingresar el valor de x para calcular el valor de y
  var x0 = parseFloat(document.getElementById("x0-lagrange-directo").value);

  // se calcula el valor de y
  // la formula es: P(x) = (x - x1)(x - x2)...(x - xn) / (x0 - x1)(x0 - x2)...(x0 - xn)
  // imprime cada P(x) y se calcula el valor de y
  var y0 = 0;
  var Pes = [];

  for (var i = 0; i < n; i++) {
    var numerador = 1;
    var denominador = 1;
    for (var j = 0; j < n; j++) {
      if (i != j) {
        numerador *= x0 - x[j];
        denominador *= x[i] - x[j];
      }
    }
    log = document.getElementById("logs-lagrange-directo");
    log.innerHTML += `P${i + 1}(x) = ${(numerador / denominador).toFixed(2)}\n`;
    Pes.push(numerador / denominador);
    y0 += (numerador / denominador) * y[i];
  }

  // imprimir como queda la formula final para el polinomio:
  // P(x) = y1*P1(x) + y2*P2(x) + ... + yn*Pn(x)
  var polinomio = "y = ";
  for (var i = 0; i < n; i++) {
    if (i === 0) {
      if (Pes[i] % 1 == 0) {
        polinomio += Pes[i].toFixed(0) + "*" + y[i];
      }
      else
        polinomio += Pes[i].toFixed(2) + "*" + y[i];
    } else {
      if (Pes[i] % 1 == 0) {
        polinomio += " + " + Pes[i].toFixed(0) + "*" + y[i];
      }
      else
        polinomio += " + " + Pes[i].toFixed(2) + "*" + y[i];
    }
  }


  if (y0 % 1 == 0) {
    document.getElementById("resultado-lagrange-directo").innerHTML = "El polinomio es:<br> " + polinomio + "<br> y = " + y0.toFixed(0) + "<br>";
  }
  else
    document.getElementById("resultado-lagrange-directo").innerHTML = "El polinomio es:<br> " + polinomio + "<br> y = " + y0.toFixed(5) + "<br>";


}