function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function error() {
    defaultScreen("Ahmedabad");
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    // console.log(latitude);
    let longitude = position.coords.longitude;
    let latlng = new google.maps.LatLng(latitude, longitude);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                let city = results[0].address_components[results[0].address_components.length - 4].long_name;
                defaultScreen(city);
            }
        }
    });
}

// By Default
function defaultScreen(e) {
    let defaultCity = e;
    getWeather(defaultCity);
    getWeather2(defaultCity);
}

// JS of the section part
document.getElementById("submit").addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(document.getElementById("city").value);
    getWeather2(document.getElementById("city").value);
})

function getWeather(e) {
    const query = e;
    const key = "XNYFMBE9AR4DSJE93MVRXAQAL";
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + query + "?unitGroup=metric&include=days&key=" + key;

    fetch(url)
        .then(response => response.json())
        .then((response) => {
            // console.log(response);
            const cname = response.address;
            const temp = response.days[0].temp;
            const weatherDesc = response.days[0].description;
            const imgsrc = response.days[0].icon;
            const humidity = response.days[0].humidity;
            const pressure = response.days[0].pressure / 1013.25;
            const windSpeed = response.days[0].windspeed;
            const feelslike = response.days[0].feelslike;
            const visibility = response.days[0].visibility;
            const humidity1 = response.days[0].humidity;

            document.getElementById("cn1").innerHTML = cname;
            document.getElementById("cn2").innerHTML = cname;
            document.getElementById("temp").innerHTML = temp + "&deg;C";
            document.getElementById("desc").innerHTML = weatherDesc;
            document.getElementById("windSpeed").innerHTML = windSpeed.toFixed(2) + "km/hr";
            document.getElementById("humidity").innerHTML = humidity + "%";
            document.getElementById("pressure").innerHTML = pressure.toFixed(4) + "atm";
            document.getElementById("img").src = "icons/" + imgsrc + ".png"
            document.getElementById("humidity1").innerHTML = humidity1 + "%";
            document.getElementById("feelslike").innerHTML = feelslike + "&deg;C";
            document.getElementById("visibility").innerHTML = visibility + "km";
        })
        .catch((err) => console.log(err));
}

// JS of the table
const date = new Date();
let day = date.getDay();
function getName(day) {
    if (day >= 7) {
        day = day - 7;
    }
    if (day == 0) {
        day = day + 7;
        return 'Sunday';
    }
    else if (day == 1) {
        day = day + 7;
        return 'Monday';
    }
    else if (day == 2) {
        day = day + 7;
        return 'Tuesday';
    }
    else if (day == 3) {
        day = day + 7;
        return 'Wednesday';
    }
    else if (day == 4) {
        day = day + 7;
        return 'Thursday';
    }
    else if (day == 5) {
        day = day + 7;
        return 'Friday';
    }
    else {
        day = day + 7;
        return 'Saturday';
    }

}

document.getElementById('currentTime').innerHTML = date.getHours() + ":" + date.getMinutes();
for (let i = 1; i <= 5; i++) {
    document.getElementById(`day${i}`).innerHTML = getName(day + i);
}

function getWeather2(e) {
    const query = e;
    const key = "XNYFMBE9AR4DSJE93MVRXAQAL";
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + query + "?unitGroup=metric&include=days&key=" + key;

    fetch(url)
        .then(response => response.json())
        .then((response) => {
            // console.log(response);
            for (let i = 0; i < 5; i++) {
                const avgtemp = response.days[i + 1].temp;
                const min_temp = response.days[i + 1].tempmin;
                const max_temp = response.days[i + 1].tempmax;
                const weather_conditions = response.days[i + 1].icon;

                document.getElementsByClassName("avgtemp")[i].innerHTML = avgtemp + "&deg;C";
                document.getElementsByClassName("min_temp")[i].innerHTML = min_temp + "&deg;C";
                document.getElementsByClassName("max_temp")[i].innerHTML = max_temp + "&deg;C";
                document.getElementsByClassName("weather_conditions")[i].src = "icons/" + weather_conditions + ".png";
            }
        })
        .catch(err => console.log(err));
}


// JS of the footer
const year = date.getFullYear();
document.getElementById("footer").innerHTML = "&copy; Copyright: " + year;

// 49cc8c821cd2aff9af04c9f98c36eb74 --- online paid subscription key of openweathermap Api