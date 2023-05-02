const formPrecio = (() => {
  const $containerForm = document.getElementById("containerForm");
  const $form = document.getElementById("formPrecio");
  const BASE_URL = "/admin/precio";

  const _setData = (item = {}, typeRender = "POST") => {
    const $parada = document.getElementById("parada");
    const $precioOaxaca = document.getElementById("precioOaxaca");
    const $precioVilla = document.getElementById("precioVilla");
    const { idPrecio, destino, precioOaxaca, precioVilla } = item;
    $parada.value = destino;
    $precioOaxaca.value = precioOaxaca;
    $precioVilla.value = precioVilla;
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
      const $precioOaxaca = document.getElementById("precioOaxaca");
      const $precioVilla = document.getElementById("precioVilla");
      //Agregar un bucle que cree muchas fechas
      formData.append("destino", $parada.value);
      formData.append("precioOaxaca", $precioOaxaca.value);
      formData.append("precioVilla", $precioVilla.value);
      _create(formData);
    });
  };

  const _create = async (formData) => {
    const itemId = $form.getAttribute("item-id");
    await http.post({ url: `${BASE_URL}/update/${itemId}`, body: formData });
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
