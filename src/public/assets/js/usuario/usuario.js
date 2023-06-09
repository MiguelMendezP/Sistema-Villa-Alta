const usuario = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "/admin/usuario";
  const $containerTable = document.getElementById("containerTable");

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";
    for (let i = 0; i < response.length; i++) {
      const $row = _createRow(response[i], "idUsuario");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const idUsuario = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}?idUsuario=${idUsuario}`);
    formUsuario.setData(response[0], 'PUT');
    formUsuario.setVisible(true);
    usuario.setVisible(false);
  };

  const _actionButtonEliminar = async (event) => {
    const $btn = event.target;
    const idUsuario = $btn.getAttribute("item-id");
    const response = await http.delete({ url: `${BASE_URL}/${idUsuario}` });
    usuario.getData();
  };

  const _createRow = (item = {}, itemId = "") => {
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      $td.innerText = value;

      $row.appendChild($td);

    }
    const $td = document.createElement("td");
    const $td2 = document.createElement("td");
    $td.appendChild(_createBtnAction("green",item[itemId], "Editar", _actionButtonEditar));
    $td2.appendChild(_createBtnAction("red",item[itemId], "Eliminar", _actionButtonEliminar));
    $row.appendChild($td);
    $row.appendChild($td2);
    return $row;
  };

  const _createBtnAction = (color,itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "minusculas waves-effect waves-light btn "+color;
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
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

  const _configureBtnNuevo = () => {
    const $btnNuevo = document.getElementById("btnNuevo");
    $btnNuevo.addEventListener("click", () => {
      usuario.setVisible(false);
      formUsuario.setVisible(true);
      usuario.setData({}, 'POST')
    });
  };

  return {
    init: () => {
      _initElements();
    },
    setVisible: _setVisible,
    getData: _getData
  };
})();

usuario.init();
