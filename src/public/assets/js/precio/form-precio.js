const formPrecio = (() => {
  const $containerForm = document.getElementById("containerForm");
  const $form = document.getElementById("formPrecio");
  const BASE_URL = "/admin/precio";

  const _setData = (item = {}, typeRender = "POST", idParada) => {
    const $parada = document.getElementById("parada");
    const $precioParada = document.getElementById("precioParada");
    const $precioDesde = document.getElementById("precioDesde");
    const { idPrecio, destino, precioOaxaca, precioVilla } = item;
    $parada.value = destino;
    if(idParada == "precioOaxaca"){
      $precioParada.value = precioOaxaca;
      $precioDesde.innerHTML = "Precio desde: Oaxaca"
    } else {
      $precioParada.value = precioVilla;
      $precioDesde.innerHTML = "Precio desde: Villa Alta"
    }
    $form.setAttribute("method", typeRender);
    $form.setAttribute("item-id", idPrecio);
    M.updateTextFields();

  };

  const _configureBtnCancelar = () => {
    const $btnCancelar = document.getElementById("btnCancelar");
    $btnCancelar.addEventListener("click", () => {
      formPrecio.setVisible(false);
      precio.setVisible(true);
    });
  };

  const _configureBtnGuardar = () => {
    const $btnGuardar = document.getElementById("btnGuardar");
    $btnGuardar.addEventListener("click", () => {

      var formData = new FormData();
      const $parada = document.getElementById("parada");
      const $precioParada = document.getElementById("precioParada");
      formData.append("destino", $parada.value);
      lugarOrigen = document.getElementById("precioDesde").innerHTML;
      if(lugarOrigen.includes("Oaxaca")){
        formData.append("precioOaxaca", $precioParada.value);
      } else {
        formData.append("precioVilla", $precioParada.value);
      }
      

      const method = $form.getAttribute("method");
      if (method.toUpperCase() === "POST") {
        _create(formData);
      }

      if (method === "PUT") {
        _update(formData);
      }
    });
  };

  const _create = async (formData) => {
    await http.post({ url: BASE_URL, body: formData });
    formPrecio.setVisible(false);
    precio.setVisible(true);
    precio.getData();
  };

  const _update = async (formData) => {
    const itemId = $form.getAttribute("item-id");
    await http.post({ url: `${BASE_URL}/update/${itemId}`, body: formData });
    formPrecio.setVisible(false);
    precio.setVisible(true);
    precio.getData();
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
  };

  return {
    setData: _setData,
    setVisible: _setVisibleForm,
    init: _init,
  };
})();

formPrecio.init();
