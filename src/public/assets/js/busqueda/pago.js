const pago = (() => {
    const $containerPago = document.getElementById("containerPago");
    const $numPasajeros = document.getElementById("iconValor");
    const $correoUsuario = document.getElementById("correoUsuario");
    const BASE_URL_PASAJERO = "/pasajero";
    const BASE_URL_USUARIO = "/admin/usuario";
    const BASE_URL_BOLETO = "/mis-boletos";

    const $btnFinalizarPago = document.getElementById("btnFinalizarPago");
    $btnFinalizarPago.addEventListener("click", () => {
        let crear = true;
        for (let i = 1; i <= iconValor.innerHTML; i++) {
            var inputNombre = document.getElementById("inputNombre0"+i);
            if(inputNombre.value == ""){
                M.toast({ html: 'Faltan Nombres de Pasajeros' })
                crear = false;
                break;
            }
        }
        if(crear == true){
            crearBoleto();
        }
        
        
    });

    var inputNombre01 = document.getElementById("inputNombre01");
    inputNombre01.addEventListener("input", function () {

        var expReg = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        if (expReg.test(inputNombre01.value)) {
            $btnFinalizarPago.style.backgroundColor = '#0084ff';
            $btnFinalizarPago.disabled = false;
        } else {
            $btnFinalizarPago.style.backgroundColor = '#808080';
            $btnFinalizarPago.disabled = true;
        }

    });

    var arrayAsientosSeleccionado = asientos.arrayAsientosSeleccionado;
    async function crearBoleto() {
        const responseUsuario = await http.get(BASE_URL_USUARIO);
        let mapUsuarioCorreos = responseUsuario.map((responseUsuario) => responseUsuario.correo);
        let posidUsuario = mapUsuarioCorreos.indexOf($correoUsuario.innerHTML.trim());
        let idUsuario = responseUsuario[posidUsuario].idUsuario;


        crearPasajeros(idUsuario);
        for (let j = 0; j < iconValor.innerHTML; j++) {
            var formData = new FormData();
            formData.append("idUsuario", idUsuario);
            formData.append("idSalida", viajes.dameIdSalida());
            formData.append("idPrecio", viajes.dameIdPrecio());
            formData.append("noAsiento", arrayAsientosSeleccionado[j].substring(5, 7));

            await http.post({ url: BASE_URL_BOLETO, body: formData });

            pago.setVisible(false);
            pagado.setVisible(true);
        }
    }


    const crearPasajeros = async (idUsuario) => {
        for (let i = 0; i < $numPasajeros.innerHTML; i++) {
            var formData = new FormData();
            formData.append("idUsuario", idUsuario);
            formData.append("nombre", document.getElementById("inputNombre0" + (i + 1)).value);
            formData.append("apellido", document.getElementById("inputApellido0" + (i + 1)).value);
            await http.post({ url: BASE_URL_PASAJERO, body: formData });
        }
    }

    function crearElemento(nuevoElem, id, clase, donde, text) {
        const $donde = document.getElementById(donde);
        const elem = document.createElement(nuevoElem);
        elem.innerText = text
        elem.setAttribute("id", id);
        elem.setAttribute("class", clase);
        $donde.appendChild(elem);
    }


    function crearRecuadro(id, asiento) {
        crearElemento("div", "container-div" + id, "container-div", "formContainer01", null)
        crearElemento("div", "container-valores" + id, "container-valores", "container-div" + id, null)
        crearElemento("p", "pasajero" + id, null, "container-valores" + id, "Pasajero " + id)
        crearElemento("p", "asiento" + id, null, "container-valores" + id, "Asiento: " + asiento)
        crearElemento("div", "container-datos" + id, "container-datos", "container-div" + id, null)
        crearElemento("div", "container-nombre" + id, "container-nombre", "container-datos" + id, null)
        crearElemento("p", "nombre" + id, null, "container-nombre" + id, "Nombre(s)")
        crearElemento("input", "inputNombre" + id, null, "container-nombre" + id, "")
        crearElemento("div", "container-apellido" + id, "container-apellido", "container-datos" + id, null)
        crearElemento("p", "apellido" + id, null, "container-apellido" + id, "Apellido(s)")
        crearElemento("input", "inputApellido" + id, null, "container-apellido" + id, "")
        crearElemento("p", null, null, "formContainer01", null)

    }

    const _llenarDatosViaje = () => {
        arraDatosViaje = viajes.mandarArray();
        const $fecha_hora = document.getElementById("fecha_hora1");
        const $origen = document.getElementById("origen1");
        const $destino = document.getElementById("destino1");
        const $viajeValor = document.getElementById("viajeValor1");
        const $subtotalValor = document.getElementById("subtotalValor1");
        const $ivaValor = document.getElementById("ivaValor1");
        const $precioFinal = document.getElementById("precioFinal1");

        $fecha_hora.innerHTML = arraDatosViaje[0];
        $origen.innerHTML = arraDatosViaje[1];
        $destino.innerHTML = arraDatosViaje[2];
        $viajeValor.innerText = arraDatosViaje[3];
        $subtotalValor.innerText = arraDatosViaje[4];
        $ivaValor.innerText = arraDatosViaje[5];
        $precioFinal.innerText = arraDatosViaje[6];

        const $asiento01 = document.getElementById("asiento01");
        asiento01.innerHTML = "Asiento: " + arrayAsientosSeleccionado[0].substring(5, 7)
        for (let i = 1; i < $numPasajeros.innerHTML; i++) {
            crearRecuadro("0" + (i + 1), arrayAsientosSeleccionado[i].substring(5, 7))
        }
    };


    const _setVisible = (visible = true) => {
        if (visible) {
            $containerPago.classList.remove("hide");
            _llenarDatosViaje();
        } else {
            $containerPago.classList.add("hide");

        }
    };

    const _initElements = () => {
        _setVisible(false);
    };

    return {
        init: () => {
            _initElements();
        },
        setVisible: _setVisible,
    };
})();

pago.init();