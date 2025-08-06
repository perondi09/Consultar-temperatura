const apiKey = "dd0f7372f40e640876709d9b8b00c1e7"
const apiPaisesKey = "https://flagsapi.com/png"

const cidadeInput = document.querySelector("#cidade-input");
const buscar = document.querySelector("#buscar");

const cidadeElement = document.querySelector("#cidade-nome");
const temeperaturaElement = document.querySelector("#temperatura span");
const descricaoElement = document.querySelector("#descricao");
const climaElement = document.querySelector("#temperatura-icone");
const paisElement = document.querySelector("#pais-bandeira");
const umidadeElement = document.querySelector("#umidade span");
const ventoElement = document.querySelector("#vento span");


const pegarDados = async (cidade) => {
    try {
        const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(urlApi);
        if (!res.ok) {
            throw new Error("Erro ao buscar dados da API");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro na função pegarDados:", error);
        alert("Não foi possível obter os dados. Verifique o nome da cidade e tente novamente.");
    }
};

const mostrarDados = async (cidade) => {
    try {
        const data = await pegarDados(cidade);
        if (!data) return;

        cidadeElement.innerHTML = data.name;
        temeperaturaElement.innerHTML = Math.round(data.main.temp);
        descricaoElement.innerHTML = data.weather[0].description;
        climaElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        paisElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
        umidadeElement.innerHTML = `${data.main.humidity}%`;
        ventoElement.innerHTML = `${data.wind.speed} km/h`;
    } catch (error) {
        console.error("Erro na função mostrarDados:", error);
    }
};

const mostrarTemperatura = (cidade) => {

    mostrarDados(cidade);
}

buscar.addEventListener("click", (e) => {
    e.preventDefault()

    const cidade = cidadeInput.value;

    mostrarTemperatura(cidade);
});

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`;

                    const res = await fetch(urlApi);
                    if (!res.ok) {
                        throw new Error("Erro ao buscar dados da localização atual");
                    }

                    const data = await res.json();
                    mostrarDados(data.name);
                } catch (error) {
                    console.error("Erro ao obter dados da localização atual:", error);
                }
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
            }
        );
    } else {
        console.error("Geolocalização não é suportada pelo navegador.");
        alert("Seu navegador não suporta geolocalização.");
    }
});
