def main():
    print("Calculadora de Métodos Numéricos")
    print(
        "1. Método de Punto Fijo\n"
        + "2. Método de newton\n"
        + "3. Método de Bisección\n"
        + "4. Integración numérica\n"
        + "5. Diferenciacion numérica\n"
        + "6. Método de Gauss-Seidel\n"
        + "7. Método de Gauss-Jacobi\n"
        + "8. Polinomio de Lagrange con eliminacion de Gauss-Jordan\n"
        + "9. Polinomio de Lagrange por método directo\n"
        + "10. Salir\n"
    )

    opcion = int(input("Ingrese la opción deseada: "))

    if opcion == 1:
        punto_fijo()
    elif opcion == 2:
        newton()
    elif opcion == 3:
        biseccion()
    elif opcion == 4:
        integracion_numerica()
    elif opcion == 5:
        diferenciacion_numerica()
    elif opcion == 6:
        gauss_seidel()
    elif opcion == 7:
        gauss_jacobi()
    elif opcion == 8:
        lagrange_gauss_jordan()
    elif opcion == 9:
        lagrange_directo()
    elif opcion == 10:
        exit()


def esperar_enter():
    input("Presione Enter para continuar...\n\n")
    main()


def punto_fijo():
    # método de punto fijo para resolver sistemas de ecuaciones no lineales
    print("Método de Punto Fijo")
    Ec = input("Ingrese la ecuación ya despejada: ")
    x = float(input("Ingrese el valor inicial: "))
    num_iteraciones = int(input("Ingrese el número de iteraciones: "))

    for i in range(num_iteraciones):
        x_nueva = eval(Ec.replace("x", str(x)))
        error = abs(x_nueva - x)
        print(f"x{i + 1} = {x_nueva}, Err {i + 1} = {error}")

        if error < 1e-6:
            print(f"La ecuación converge a: {x_nueva}")
            esperar_enter()

        x = x_nueva

    print(
        "La ecuación no converge después de",
        num_iteraciones,
        "iteraciones. Revisar despeje o aumentar iteraciones.",
    )
    esperar_enter()


def newton():
    # método de Newton-Raphson para resolver sistemas de ecuaciones no lineales
    print("Método de Newton")
    Ec = input("Ingrese la ecuación: ")
    Ec_prima = input("Ingrese la derivada de la ecuación: ")
    x = float(input("Ingrese el valor inicial: "))
    num_iteraciones = int(input("Ingrese el número de iteraciones: "))

    for i in range(num_iteraciones):
        x_nueva = x - (eval(Ec) / eval(Ec_prima))
        error = abs(x_nueva - x)
        print(f"x{i + 1} = {x_nueva}, Err {i + 1} = {error}")

        if error < 1e-6:
            print(f"La ecuación converge a: {x_nueva}")
            esperar_enter()

        x = x_nueva

    print(
        "La ecuación no converge después de",
        num_iteraciones,
        "iteraciones. Revisar ecuaciones o aumentar iteraciones.",
    )


def biseccion():
    # Método de bisección para encontrar las raíces de una ecuación no lineal
    print("Método de Bisección")
    ecuacion = input("Ingrese la ecuación: ")
    a = float(input("Ingrese el valor de Xa: "))
    b = float(input("Ingrese el valor de Xb: "))
    max_iteraciones = int(input("Ingrese el número de iteraciones: "))
    tolerancia = 1e-6

    iteracion = 0

    # Verificar si hay cambio de signo en el intervalo [a, b]
    if eval(ecuacion.replace("x", str(a))) * eval(ecuacion.replace("x", str(b))) > 0:
        print("No hay raíz en el intervalo [a, b]")
        esperar_enter()
        return

    while (b - a) / 2 > tolerancia and iteracion < max_iteraciones:
        c = (a + b) / 2
        valor_en_c = eval(ecuacion.replace("x", str(c)))

        if valor_en_c == 0:
            break
        elif valor_en_c * eval(ecuacion.replace("x", str(a))) > 0:
            print("Xc = Xa")
            a = c
        else:
            print("Xc = Xb")
            b = c

        print(f"X{iteracion + 1} = {c}")

        iteracion += 1

    raiz_aproximada = (a + b) / 2
    print(f"La raíz aproximada es: {raiz_aproximada}")
    esperar_enter()


def integracion_numerica():
    # Método de integración numérica para encontrar el área bajo la curva
    print("Integración numérica")
    Ec = input("Ingrese la ecuación: ")
    a = float(input("Ingrese el valor de a (límite inferior): "))
    b = float(input("Ingrese el valor de b (límite superior): "))
    n = int(input("Ingrese el número de puntos: "))
    h = (b - a) / n

    suma_areas = 0

    for i in range(n):
        x_i = a + i * h
        area_rectangulo = h * eval(Ec.replace("x", str(x_i)))
        suma_areas += area_rectangulo


    print(f"El área bajo la curva es: {suma_areas}")
    esperar_enter()


def diferenciacion_numerica():
    # Método de diferenciación numérica para encontrar la pendiente de una curva
    print("Diferenciación numérica")

    Ec = input("Ingrese la ecuación: ")
    x = float(input("Ingrese el valor de x: "))
    h = float(input("Ingrese el valor de h: "))
    delta_x = h/2

    a = eval(Ec.replace("x", str(x)))
    b = eval(Ec.replace("x", str(x + delta_x)))
    c = eval(Ec.replace("x", str(x - delta_x)))

    m1 = (b-a) / delta_x
    m2 = (a-c) / delta_x
    m3 = (b-c) / h
    print(f"X0 = {a}")
    print(f"X0 + delta x = {b}")
    print(f"X0 - delta x = {c}")

    print(f"m1 = {m1}")
    print(f"m2 = {m2}")
    print(f"m3 = {m3}")
    esperar_enter()


def gauss_seidel():
    # Método de Gauss-Seidel para resolver sistemas de ecuaciones lineales
    print("Método de Gauss-Seidel")
    print("Ingrese las ecuaciones ya despejadas para cada variable\n"+
          "Ejemplo: 2x + 3y = 5, se ingresa como: (3*y - 5)/2 \n")
    Ec1 = input("Ingrese la primera ecuación: ")
    Ec2 = input("Ingrese la segunda ecuación: ")
    x = float(input("Ingrese el valor inicial de x: "))
    y = float(input("Ingrese el valor inicial de y: "))
    num_iteraciones = int(input("Ingrese el número de iteraciones: "))

    for i in range(num_iteraciones):
        x_nueva = eval(Ec1.replace("y", str(y)))
        y_nueva = eval(Ec2.replace("x", str(x_nueva)))
        print(f"x{i + 1} = {x_nueva}, y{i + 1} = {y_nueva}")
        x = x_nueva
        y = y_nueva

    print(f"La ecuación converge a: x = {x_nueva}, y = {y_nueva}")
    esperar_enter()


def gauss_jacobi():
    # Método de Gauss-Jacobi para resolver sistemas de ecuaciones lineales
    print("Método de Gauss-Jacobi")
    print("Ingrese las ecuaciones ya despejadas para cada variable\n"+
          "Ejemplo: 2x + 3y = 5, se ingresa como: (3*y - 5)/2 \n")
    Ec1 = input("Ingrese la primera ecuación: ")
    Ec2 = input("Ingrese la segunda ecuación: ")
    x = float(input("Ingrese el valor inicial de x: "))
    y = float(input("Ingrese el valor inicial de y: "))
    num_iteraciones = int(input("Ingrese el número de iteraciones: "))

    for i in range(num_iteraciones):
        x_nueva = eval(Ec1.replace("x", str(x)).replace("y", str(y)))
        y_nueva = eval(Ec2.replace("x", str(x)).replace("y", str(y)))
        print(f"x{i + 1} = {x_nueva}, y{i + 1} = {y_nueva}")
        x = x_nueva
        y = y_nueva

    print(f"La ecuación converge a: x = {x_nueva}, y = {y_nueva}")
    esperar_enter()


def lagrange_gauss_jordan():
    # Polinomio de Lagrange con eliminacion de Gauss-Jordan
    print("Polinomio de Lagrange con eliminacion de Gauss-Jordan")
    # entrada de n datos
    n = int(input("Ingrese el número de datos: "))
    x = []
    y = []
    for i in range(n):
        x.append(float(input(f"Ingrese el valor de x{i}: ")))
        y.append(float(input(f"Ingrese el valor de y{i}: ")))


    # la formula es de la forma: y = a0 + a1*x + a2*x^2 + ... + an*x^n
    # se crea una matriz de n x (n+1) para almacenar los coeficientes
    matriz = []
    for i in range(n):
        matriz.append([0] * (n + 1))

    # se llena la matriz con los valores de x
    for i in range(n):
        for j in range(n):
            matriz[i][j] = x[i] ** j

    # se llena la matriz con los valores de y
    for i in range(n):
        matriz[i][n] = y[i]

    print("Matriz aumentada: ")
    for i in range(n):
        for j in range(n + 1):
            print(f"{matriz[i][j]:^7}", end=" ")
        print()


    # se aplica el metodo de Gauss-Jordan
    for i in range(n):
        if matriz[i][i] == 0.0:
            print("No tiene solucion")
            return

        print(f"Dividiendo la fila {i + 1} entre {matriz[i][i]}")
        for j in range(n):
            if i != j:
                ratio = matriz[j][i] / matriz[i][i]

                print(f"R{j + 1} = R{j + 1} - {ratio}*R{i + 1}")
                for k in range(n + 1):
                    matriz[j][k] = matriz[j][k] - ratio * matriz[i][k]

    # se obtienen los valores de los coeficientes

    a = [0 for i in range(n)]
    for i in range(n):
        a[i] = matriz[i][n] / matriz[i][i]

    # se imprime el polinomio
    print("El polinomio es: ")
    print("y = ", end="")
    for i in range(n):
        if i == 0:
            print(f"{a[i]}", end="")
        else:
            print(f" + {a[i]}*x^{i}", end="")
    print()
    esperar_enter()


def lagrange_directo():
    # Polinomio de Lagrange por método directo
    print("Polinomio de Lagrange por método directo")

    # entrada de n datos
    n = int(input("Ingrese el número de datos: "))
    x = []
    y = []
    for i in range(n):
        x.append(float(input(f"Ingrese el valor de x{i}: ")))
        y.append(float(input(f"Ingrese el valor de y{i}: ")))

    # ingresar el valor de x para calcular el valor de y
    x0 = float(input("Ingrese el valor de x para calcular el valor de y: "))

    # se calcula el valor de y
    # la formula es: P(x) = (x - x1)(x - x2)...(x - xn) / (x0 - x1)(x0 - x2)...(x0 - xn)
    # imprime cada P(x) y se calcula el valor de y
    y0 = 0
    Pes = []

    for i in range(n):
        numerador = 1
        denominador = 1
        for j in range(n):
            if i != j:
                numerador *= x0 - x[j]
                denominador *= x[i] - x[j]
        print(f"P{i + 1}(x) = {numerador}/{denominador} = {numerador / denominador}")
        Pes.append(numerador / denominador)
        y0 += (numerador / denominador) * y[i]

    # imprimir como queda la formula final para el polinomio:
    # P(x) = y1*P1(x) + y2*P2(x) + ... + yn*Pn(x)
    print("P(x) = ", end="")
    # extraer los valores de P(x) de la lista Pes
    for i in range(n):
        if i == 0:
            print(f"{y[i]}*({Pes[i]})", end="")
        else:
            print(f" + {y[i]}*({Pes[i]})", end="")
    

    print()
    print(f"El valor de y es: {y0}")
    esperar_enter()


if __name__ == "__main__":
    main()
