async function getMindicador() {
    try {
        const res = await fetch("https://mindicador.cl/api/")
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
        alert("Ups, ha ocurrido un error");
    }
}

const btnConvertir = document.getElementById("btnBuscar")
const result = document.getElementById("result")

btnConvertir.addEventListener("click", async () => {

    result.innerHTML = "..."
    const cifra = document.getElementById("pesosAdd").value;
    const amount = parseFloat(cifra);
    const moneda = document.getElementById("monedaAdd").value

    if (isNaN(amount) || amount <= 0) {
        resultParagraph.textContent = 'Por favor, ingresa un monto válido';
        return;
    }

    const data = await getMindicador();

    if (moneda === "dolar") {
        result.innerHTML = `Resultado: ${(amount / data.dolar.valor).toFixed(2)} $`;
    } else {
        result.innerHTML = `Resultado: ${(amount / data.euro.valor).toFixed(2)} €`;
    }
})


async function getMonedas() {
    const endpoint = "https://api.gael.cloud/general/public/monedas"
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function configGrafica(monedas) {
    const tipoDeGrafica = "line";
    const nombreDeMonedas = monedas.map((moneda) => moneda.Codigo);
    const titulo = "Monedas";
    const colorDeLinea = "rgb(6, 178, 184)";
    const valores = monedas.map((moneda) => {
        const valor = moneda.Valor.replace(",", ".");
        return Number(valor);
    });


const config = {
type: tipoDeGrafica,
data: {
    labels: nombreDeMonedas,
    datasets: [
        {
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores
        }
    ]
}
};
return config;
}


async function renderGrafica(){
    const monedas = await getMonedas();
    const config = configGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    myChart.style.backgroundColor = "white";
    new Chart(chartDOM, config)
}

renderGrafica();



