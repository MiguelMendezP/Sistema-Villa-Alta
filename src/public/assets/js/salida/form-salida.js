const formSalida = (() => {
  const $containerForm = document.getElementById("containerForm");
  const $form = document.getElementById("formSalida");
  const BASE_URL = "/admin/salida";
  const $ciudadOrigen = document.getElementById("ciudadOrigen");
  const $ciudadDestino = document.getElementById("ciudadDestino");
  //

  const _setData = (item = {}, typeRender = "POST") => {
    const $hora = document.getElementById("hora");
    const $fechaInicial = document.getElementById("fechaInicial");
    const { idSalida, hora, fechaInicial, terminal_salida, terminal_destino } = item;
    $hora.value = hora;
    $fechaInicial.value = fechaInicial;
    $ciudadOrigen.options[$ciudadOrigen.selectedIndex].text = terminal_salida;
    $ciudadDestino.options[$ciudadDestino.selectedIndex].text = terminal_destino;
    $form.setAttribute("method", typeRender);
    $form.setAttribute("item-id", idSalida);
    M.updateTextFields();

  };

  const _llenarComboBox = async () => {
    var paradas = ["Terminal Oaxaca", "Terminal Villa Alta"];
    var opcion = document.createElement("option");

    opcion.text = "Seleccione";
    $ciudadOrigen.appendChild(opcion);
    $ciudadOrigen.options[0].disabled = true;

    for (let i = 0; i < paradas.length; i++) {
      var opcion = document.createElement("option");
      opcion.text = paradas[i];
      $ciudadOrigen.appendChild(opcion);
    }
  }

  $ciudadOrigen.addEventListener("change", function () {
    var seleccion = $ciudadOrigen.value;
    $ciudadDestino.innerHTML = "";
    var opcion = document.createElement("option");
    if (seleccion == "Terminal Oaxaca") {
      var opcion = document.createElement("option");
      opcion.text = "Terminal Villa Alta";
      $ciudadDestino.appendChild(opcion);
    } else {
      var opcion = document.createElement("option");
      opcion.text = "Terminal Oaxaca";
      $ciudadDestino.appendChild(opcion);
    }
  });

  const _fecha_hora = () => {
    var fechaActual = new Date();

    var dd = String(fechaActual.getDate()).padStart(2, '0');
    var mm = String(fechaActual.getMonth() + 1).padStart(2, '0'); //Enero es 0!
    var yyyy = fechaActual.getFullYear();
    var fechaMinima = yyyy + '-' + mm + '-' + dd;
    document.getElementById("fechaInicial").setAttribute("min", fechaMinima);
    document.getElementById("fechaFinal").setAttribute("min", fechaMinima);

  }

  const _configureBtnCancelar = () => {
    const $btnCancelar = document.getElementById("btnCancelar");
    $btnCancelar.addEventListener("click", () => {
      formSalida.setVisible(false);
      salida.setVisible(true);
    });
  };

  const _configureBtnGuardar = () => {
    const $btnGuardar = document.getElementById("btnGuardar");
    $btnGuardar.addEventListener("click", () => {

      var formData = new FormData();
      const $hora = document.getElementById("hora");
      const $fecha = document.getElementById("fechaInicial");
      const $terminal_salida = document.getElementById("ciudadOrigen");
      const $terminal_destino = document.getElementById("ciudadDestino");
      //Agregar un bucle que cree muchas fechas
      formData.append("hora", $hora.value);
      formData.append("fecha", $fecha.value);
      formData.append("terminal_salida", $terminal_salida.options[$terminal_salida.selectedIndex].text);
      formData.append("terminal_destino", $terminal_destino.options[$terminal_destino.selectedIndex].text);
      _create(formData);

    });
  };

  const _create = async (formData) => {
    await http.post({ url: BASE_URL, body: formData });
    formSalida.setVisible(false);
    salida.setVisible(true);
    salida.getData();
  };

  const _update = async (formData) => {
    const itemId = $form.getAttribute("item-id");
    await http.post({ url: `${BASE_URL}/update/${itemId}`, body: formData });
    formSalida.setVisible(false);
    salida.setVisible(true);
    salida.getData();
  };

  const _setVisibleForm = (visible = true) => {
    if (visible) {
      $containerForm.classList.remove("hide");
    } else {
      $containerForm.classList.add("hide");
    }
  };

  const _init = () => {
    _configureBtnCancelar();
    _configureBtnGuardar();
    _llenarComboBox();
    _fecha_hora();
  };

  return {
    setData: _setData,
    setVisible: _setVisibleForm,
    init: _init,
  };
})();

formSalida.init();
