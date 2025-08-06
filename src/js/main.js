const apiKey = "dd0f7372f40e640876709d9b8b00c1e7" .env
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
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(urlApi);
    const data = await res.json();

    return data;
}

const mostrarDados = async (cidade) => {
    
    const data = await pegarDados(cidade);  
    
    cidadeElement.innerHTML = data.name;  
    temeperaturaElement.innerHTML = Math.round(data.main.temp);
    descricaoElement.innerHTML = data.weather[0].description;  
    climaElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    paisElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    umidadeElement.innerHTML = `${data.main.humidity}%`;    
    ventoElement.innerHTML = `${data.wind.speed} km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash}${cidade}")`;
}; 

const mostrarTemperatura = (cidade) => {

    mostrarDados(cidade);
}

buscar.addEventListener("click", (e) => {
    e.preventDefault()

    const cidade = cidadeInput.value;

    mostrarTemperatura(cidade);
});