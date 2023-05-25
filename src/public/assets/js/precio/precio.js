const precio = (() => {
  const $bodyTableOaxaca = document.getElementById("dataOaxaca");
  const $bodyTableVilla = document.getElementById("dataVilla");
  const BASE_URL = "/admin/precio";
  const $containerTable = document.getElementById("containerTable");

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    let mapPrecioOaxaca = response.map((response) => response.precioOaxaca);
    let mapPrecioVilla = response.map((response) => response.precioVilla);
    $bodyTableOaxaca.innerHTML = "";
    $bodyTableVilla.innerHTML = "";
    console.log(mapPrecioOaxaca.sort((a, b) => a - b));
    console.log(response);
    
    for (let i = 1; i < response.length; i++) {
      for (let j = 0; j < response.length; j++) {
        if (mapPrecioOaxaca.sort((a, b) => a - b)[i] == response[j].precioOaxaca) {
          var filaPrecio = {
            idPrecio: response[j].idPrecio,
            destino: response[j].destino,
            precioOaxaca: response[j].precioOaxaca
          };
          const $row = _createRow(filaPrecio, "idPrecio", "precioOaxaca");
          $bodyTableOaxaca.appendChild($row);
        }
      }
    }

    for (let i = 1; i < response.length; i++) {
      for (let j = 0; j < response.length; j++) {
        if (mapPrecioVilla.sort((a, b) => a - b)[i] == response[j].precioVilla) {
          var filaPrecio = {
            idPrecio: response[j].idPrecio,
            destino: response[j].destino,
            precioVilla: response[j].precioVilla
          };
          const $row = _createRow(filaPrecio, "idPrecio", "precioVilla");
          $bodyTableVilla.appendChild($row);
        }
      }
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const idPrecio = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}?idPrecio=${idPrecio}`);
    let lugarOrigen = $btn.getAttribute("id");
    formPrecio.setData(response[0], 'PUT', lugarOrigen);
    formPrecio.setVisible(true);
    precio.setVisible(false);
  };

  const _actionButtonEliminar = async (event) => {
    const $btn = event.target;
    const idPrecio = $btn.getAttribute("item-id");
    const response = await http.delete({ url: `${BASE_URL}/${idPrecio}` });
    precio.getData();
  };

  const _createRow = (item = {}, itemId = "", id) => {
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      $td.innerText = value;
      $row.appendChild($td);

    }
    const $td = document.createElement("td");
    const $td2 = document.createElement("td");
    $td.appendChild(_createBtnAction("green", item[itemId], "Editar", id, _actionButtonEditar));
    $td2.appendChild(_createBtnAction("red", item[itemId], "Eliminar", "", _actionButtonEliminar));
    $row.appendChild($td);
    $row.appendChild($td2);

    return $row;
  };

  const _createBtnAction = (color, itemId = 0, labelBtn = "", id, _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "minusculas waves-effect waves-light btn " + color;
    $btn.setAttribute("item-id", itemId);
    $btn.setAttribute("id", id);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };

  const _configureBtnNuevo = () => {
    const $btnNuevo = document.getElementById("btnNuevo");

    $btnNuevo.addEventListener("click", () => {
      precio.setVisible(false);
      formPrecio.setVisible(true);
      precio.setData({}, 'POST');
    });
  };

  const _setVisible = (visible = true) => {
    if (visible) {
      $containerTable.classList.remove("hide");
    } else {
      $containerTable.classList.add("hide");
    }
  };

  const _initElements = () => {
    _getData();
    _configureBtnNuevo();
  };

  return {
    init: () => {
      _initElements();
    },
    setVisible: _setVisible,
    getData: _getData
  };
})();

precio.init();
