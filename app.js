// This is built in Javascript

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    console.log(temperatureDescription);
    let temperatureDegree = document.querySelector('.temperature-degree');
    console.log(temperatureDegree);
    let locationTimezone = document.querySelector('.location-timezone');
    let locationCountry = document.querySelector('.location-country');
    let iconPic = document.querySelector('.icon-pic');
    let temperatureSection = document.querySelector('.temperature')
    let temperatureScale = document.querySelector('.temperature span')

    console.log(locationCountry);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=f7e842a2db662ba6471b9cd31523eb76&units=imperial`;
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                console.log("Hey reponse fullfilled");
                const temperature = data.main.temp;
                const summary = capitalizeFirstLetter(data.weather[0].description);
                const country = data.sys.country;
                const iconCode = data.weather[0].icon;
                const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@4x" + ".png"
                // iconUrl = "icons/" + iconCode + ".png";
                console.log(iconUrl);
                console.log(summary);
                console.log(temperature);
                let temperatureinFarenheit = (temperature - 32) * 5 / 9;

                // Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.name + " / India";
                iconPic.src = iconUrl;

                //Change temperature to Celsius / Farenheit

                temperatureSection.addEventListener('click', () => {
                    if (temperatureScale.textContent === "F") {
                        temperatureScale.textContent = "C";

                        temperatureDegree.textContent = (Math.round(temperatureinFarenheit * 100) / 100).toFixed(2);


                    }
                    else {
                        temperatureScale.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })

            });
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});