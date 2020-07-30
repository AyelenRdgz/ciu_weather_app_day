const API_KEY = "13fbf749265c8747be7c562f10530007"
const lat = -34.5708
const lon = -58.6243
var resApi

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=sp&units=metric&exclude=hourly&appid=${API_KEY}`)
    .then(response => response.json())
    .then(res => resApi = res)
    .then(res => Data())
}

function Data(){
    const today = new Date()
    document.getElementById("current-zone").innerHTML += "Villa tesei" + `<img src="imags/localizacion_icono.png">`
    document.getElementById("current-date").innerHTML += today.toString().substr(0,16)
    document.getElementById("current-hour").innerHTML += today.toString().substr(16,5)

    const icono = resApi.current.weather[0].icon;
    const url = ` https://openweathermap.org/img/wn/${icono}@2x.png`;
    
    document.getElementById("img-clima").innerHTML += `<img src=${url} width="50" height="50">`;
    document.getElementById("data-clima").innerHTML += resApi.current.weather[0].main;
    document.getElementById("temp").innerHTML += `${parseInt(resApi.current.temp)}`
    document.getElementById("max").innerHTML += `${parseInt(resApi.daily[0].temp.max)}°C↑`;
    document.getElementById("min").innerHTML += `${parseInt(resApi.daily[0].temp.min)}°C↓`;
    document.getElementById("hum").innerHTML += `${resApi.current.humidity}%`
    document.getElementById("pres").innerHTML += `${resApi.current.pressure}mBar`
    document.getElementById("wind").innerHTML += `${parseInt(resApi.current.wind_speed)}km/h`

    const resCurrent = resApi.daily[0]

    var sunrise = new Date(resCurrent.sunrise*1000)
    document.getElementById("sunset").innerHTML += sunrise.getHours() + ":" + sunrise.getMinutes()
    
    var sunset = new Date(resCurrent.sunset*1000)
    document.getElementById("sunrise").innerHTML += sunset.getHours()+ ":" + sunset.getMinutes()
    
    var sunHours = new Date(resCurrent.dt*1000)
    document.getElementById("sun-hours").innerHTML += sunHours.getHours()

    const tomorrrow = new Date(today);
        for ( i = 1; i <= 3; i ++) {
            const icon = resApi.daily[i].weather[0].icon;
            const url = ` https://openweathermap.org/img/wn/${icon}@2x.png`;

            document.getElementById(`img-clima${i}`).innerHTML = `<img src=${url} width="40" height="40">`;
            document.getElementById(`max${i}`).innerHTML = `${parseInt(resApi.daily[i].temp.max)}°C↑`;
            document.getElementById(`min${i}`).innerHTML = `${parseInt(resApi.daily[i].temp.min)}°C↓`;
            tomorrrow.setDate(today.getDate() + i);
            document.getElementById(`Day${i}`).innerHTML = `
                ${tomorrrow.toString().substr(0,3)}, ${tomorrrow.toString().substr(7,3)}`
        }
}

