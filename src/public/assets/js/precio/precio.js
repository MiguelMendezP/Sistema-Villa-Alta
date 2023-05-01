const formPrecio = (() => {
  const $form = document.getElementById("formPrecio");
  const BASE_URL = "/admin/precio";

  const _cargarPrecios = () => {
    carga();
  };

  async function carga() {
    const responsePrecios = await http.get(BASE_URL);

    for (let i = 1; i < 13; i++) {
      var input = document.getElementById('precio_' + i);
      for (let j = 0; j < 13; j++) {
        if (responsePrecios[j].idPrecio == i) {
          input.value = responsePrecios[j].precioOaxaca
          break
        }
      }
    }
    for (let i = 0; i < 13; i++) {
      var input2 = document.getElementById('precio2_' + i);
      for (let j = 12; j >= 0; j--) {
        if (responsePrecios[j].idPrecio == i - 1) {
          input2.value = responsePrecios[j].precioVilla
          break
        }
      }
    }
    /*for (let i = 1; i <= mapPreciosOaxaca.length; i++) {
      var input = document.getElementById('precio_'+i);
      input.value = mapPreciosOaxaca[i-1];

      var input2 = document.getElementById('precio2_'+i);
      input2.value = mapPreciosVilla[i-1];
    }*/
  }

  const _configureBtnGuardar = () => {
    const $btnGuardar = document.getElementById("btnGuardar");
    $btnGuardar.addEventListener("click", () => {

      for (let i = 1; i <= 12; i++) {
        var formData = new FormData();
        const $destino = document.getElementById("parada_" + i);
        const $precioOaxaca = document.getElementById("precio_" + i);

        formData.append("precioOaxaca", $precioOaxaca.value);

        _update(i, formData);
      }
      for (let i = 1; i <= 12; i++) {
        var formData = new FormData();
        const $destino = document.getElementById("parada_" + i);
        const $precioVilla = document.getElementById("precio2_" + i);

        formData.append("precioVilla", $precioVilla.value);
    
        _update(i-1, formData);
      }
    });
  };

  const _update = async (itemId, formData) => {
    await http.post({ url: `${BASE_URL}/update/${itemId}`, body: formData });
  };


  const _init = () => {
    _cargarPrecios();
    _configureBtnGuardar();
  };

  return {
    init: _init,
  };
})();

formPrecio.init();
