const BASE_URL_BOLETO = "/mis-boletos";
const BASE_URL_SALIDA = "/admin/salida";
const BASE_URL_PRECIO = "/admin/precio";

var parametros = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

async function cargarDatos() {

    const responseBoleto = await http.get(BASE_URL_BOLETO);
    const responseSalida = await http.get(BASE_URL_SALIDA);
    const $años = document.getElementById("años");
    var valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < responseBoleto.length; i++) {
        for (let j = 0; j < responseSalida.length; j++) {
            if (responseBoleto[i].idSalida == responseSalida[j].idSalida &&
                responseSalida[j].fecha.substring(0, 4) == $años.value) {
                let pos = parseInt(responseSalida[j].fecha.substring(5, 7)) - 1;
                valores[pos] = valores[pos] + 1;
            }
        }
    }
    if ($años.value == 2023) {
        document.getElementById("alerta").style.display = ""
        var myPlot = document.getElementById('grafico'),
            d3 = Plotly.d3,
            N = 16,
            x = d3.range(N),
            y = d3.range(N).map(d3.random.normal()),
            data = [{
                x: parametros,
                y: valores,
                type: "linear"
            }],
            layout = {
                hovermode: 'closest',
            };

        Plotly.newPlot('grafico', data, layout, { showSendToCloud: true });

        myPlot.on('plotly_click', function (data) {
            var pts = '';
            for (var i = 0; i < data.points.length; i++) {
                pts = 'x = ' + data.points[i].x + '\ny = ' +  data.points[i].y.toPrecision(4) + '\n\n';
            }
            ventanaFlotante();
        });
    }else{
        document.getElementById("grafico").innerHTML = "";
        document.getElementById("alerta").style.display = "block"
    }
}

async function cargarCompras() {
    var destinos = [];

    const responseBoleto = await http.get(BASE_URL_BOLETO);
    const responsePrecio = await http.get(BASE_URL_PRECIO);
    const $años = document.getElementById("años");
    var valoresD = [];
    for (let x = 0; x < responsePrecio.length; x++) {
        destinos.push(responsePrecio[x].destino);
        valoresD.push(0);
    }

    for (let i = 0; i < responseBoleto.length; i++) {
        for (let j = 0; j < responsePrecio.length; j++) {
            console.log(responsePrecio[j].idPrecio);
            if (responseBoleto[i].idPrecio == responsePrecio[j].idPrecio) {
                pos = destinos.indexOf(responsePrecio[j].destino);
                valoresD[pos] = valoresD[pos] + 1;
                console.log(destinos);
            }
        }
    }

    data = [{
        x: destinos,
        y: valoresD,
        type: "linear"
    }],
        layout = {
            hovermode: 'closest',
        };
    Plotly.newPlot('grafico2', data, layout, { showSendToCloud: true });

}

function ventanaFlotante() {
    document.getElementById("ventana").style.display = "block"
    cargarCompras();
}

const $btnGenerar = document.getElementById("btnGenerar");
$btnGenerar.addEventListener("click", () => {
    cargarDatos()
});
const $cerrar = document.getElementById("cerrar");
$cerrar.addEventListener("click", () => {
    document.getElementById("ventana").style.display = "none"
});
const $cerrarAlerta = document.getElementById("cerrarAlerta");
$cerrarAlerta.addEventListener("click", () => {
    document.getElementById("alerta").style.display = "none"
});