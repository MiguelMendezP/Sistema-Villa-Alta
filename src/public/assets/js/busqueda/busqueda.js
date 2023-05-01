const formBusqueda = (() => {
    const $ciudadOrigen = document.getElementById("ciudadOrigen");
    const $ciudadDestino = document.getElementById("ciudadDestino");

    const _llenarComboBox = async () => {
        var origen = ["Terminal Oaxaca", "Terminal Villa Alta"];
        var opcion = document.createElement("option");

        opcion.text = "Seleccione";
        $ciudadOrigen.appendChild(opcion);
        $ciudadOrigen.options[0].disabled = true;

        for (let i = 0; i < origen.length; i++) {
            var opcion = document.createElement("option");
            opcion.text = origen[i];
            $ciudadOrigen.appendChild(opcion);
        }
    }

    $ciudadOrigen.addEventListener("change", function () {
        var paradas = ["Terminal Oaxaca", "Tlacolula", "Mitla", "Ayutla", "Tamazulapam", "Tlahui", "Yacochi", "Metepec", "Desviación de Toton", "San Andres", "Yatee", "Lachiroag", "Terminal Villa Alta"];
        var seleccion = $ciudadOrigen.value;
        $ciudadDestino.innerHTML = "";
        var opcion = document.createElement("option");

        if (seleccion == "Terminal Oaxaca") {
            for (let i = 1; i < paradas.length; i++) {

                var opcion = document.createElement("option");
                opcion.text = paradas[i];
                $ciudadDestino.appendChild(opcion);

            }
        } else {
            for (let i = paradas.length-2; i >= 0; i--) {

                var opcion = document.createElement("option");
                opcion.text = paradas[i];
                $ciudadDestino.appendChild(opcion);

            }
        }
    });

    const _fecha_hora = () => {
        var fechaActual = new Date();
    
        var dd = String(fechaActual.getDate()).padStart(2, '0');
        var mm = String(fechaActual.getMonth() + 1).padStart(2, '0'); //Enero es 0!
        var yyyy = fechaActual.getFullYear();
        var fechaMinima = yyyy + '-' + mm + '-' + dd;
        document.getElementById("fecha").setAttribute("min", fechaMinima);
    
      }

    const _init = () => {
        _llenarComboBox();
        _fecha_hora();
    };
    return {
        init: _init,
    };
})();

formBusqueda.init();