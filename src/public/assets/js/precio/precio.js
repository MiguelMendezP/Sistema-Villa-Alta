const precio = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "/admin/precio";
  const $containerTable = document.getElementById("containerTable");

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";

    let i = 0;
    let x = 0;
    while (x <= 12) {
      if (response[i].idPrecio == x) {
        const $row = _createRow(response[i], "idPrecio");
        $bodyTable.appendChild($row);
        x++;
        i = -1;
      }
      i++;
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const idPrecio = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}?idPrecio=${idPrecio}`);
    formPrecio.setData(response[0], 'PUT');
    formPrecio.setVisible(true);
    precio.setVisible(false);
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
    $td.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));
    $row.appendChild($td);

    return $row;
  };

  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "minusculas waves-effect waves-light btn green";
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
