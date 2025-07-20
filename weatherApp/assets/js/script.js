document.title=config.AppName;
document.getElementById("mainTitle").innerText=config.AppName;
document.getElementById("mainTitle").style.color="white";
async function getWeather() {
    const city = document.getElementById("city").value;
    let output;
      if(city!=""){
            document.getElementById("container").style.overflow="auto";
            const url = config.apiUrl+city+"?format=j1";
            try {
                const data = await ToJSON(url);
                const codeToFilename=await ToJSON(config.weatherIconsUrl);
                //console.log(codeToFilename);
                const current = data.current_condition[0];
                const weatherDesc = current.weatherDesc[0].value.toLowerCase();
                const weather=data.weather[0].hourly[0];
                console.log(data);
                const weatherCode = current.weatherCode; // e.g. 116
                const icon = codeToFilename[weatherCode];
                const iconUrl = config.weatherIconsCDN+icon;
                var today=dateFormat(data.weather[0].date);
                output= `
                <div class="weather-container">
                    <img src="${iconUrl}">
                    <h2>Καιρός στην πόλη ${city.charAt(0).toUpperCase() + city.slice(1)} σήμερα ${today}</h2>
                    <p>Θερμοκρασία: ${current.temp_C}°C</p>
                    <p>Αίσθηση: ${current.FeelsLikeC}°C</p>
                    <p>Συνθήκες: ${current.weatherDesc[0].value}</p>
                    <p>Άνεμος: ${current.windspeedKmph} km/h</p>
                    <p>Υγρασία: ${current.humidity}%</p>
                </div>
                `;
                let nextdays = `<div class="forecast-container">`;
                data.weather.slice(1,3).forEach(day => {
                    const date = day.date;
                    const avgTemp = day.avgtempC;
                    const code = day.hourly[4].weatherCode; // midday
                    const icon = codeToFilename[code];
                    const iconUrl = config.weatherIconsCDN+icon;
                    const desc = day.hourly[4].weatherDesc[0].value;
                    nextdays += `
                    <div class="forecast-day">
                        <h3>${date}</h3>
                        <img src="${iconUrl}" alt="${desc}">
                        <p>${desc}</p>
                        <p>${avgTemp}°C</p>
                    </div>
                    `;
                });
            nextdays += `</div>`;
                document.getElementById("output").innerHTML = output+nextdays;
            } catch (err) {
                document.getElementById("output").innerHTML = `<p>Error getting weather data.</p>`;
                console.error("Fetch error:", err);
            }
    }else{
        document.getElementById("main").style.overflow="hidden";
        output=`
            <div class="weather-container">
                <h2 style="color:red;font-size:20px;text-outline:black;">Το πεδίο δεν πρέπει να είναι κενό</h2>
            
            </div>`;
        document.getElementById("output").innerHTML =output;
    }
}
        