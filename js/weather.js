// function for round of decimal number to closest whole number
function gaussRound(num, decimalPlaces) {
    let d = decimalPlaces || 0,
        m = Math.pow(10, d),
        n = +(d ? num * m : num).toFixed(8),
        i = Math.floor(n), f = n - i,
        e = 1e-8,
        r = (f > 0.5 - e && f < 0.5 + e) ?
            ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}

let str, hour, str3, str2, str4, near, str6, fore, pages1, html, html2, html3, html4, html5, pag, lat, lon;
let currentDate = new Date();
// let DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// let day = DAY[currentDate.getDay()];

// function for week day definition at 5day forecast
function getWeekDay(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

// function convert meteorological wind direction from degrees to leters
function windDirect(wind) {
    let DirTable = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    return DirTable[Math.floor((wind + 11.25) / 22.5)];
}

//random function, using for nearbyplaces definition
function getRandomArbitrary(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

//functions for time from UNIX timestamp to time format 
function unixToTime(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    var amPm = date.getHours() >= 12 ? 'PM' : 'AM'
    var hours = ("0" + ((date.getHours() % 12) || 12)).substr(-2)
    var minutes = ("0" + date.getMinutes()).substr(-2)
    // var seconds = ("0" + date.getSeconds()).substr(-2);
    return (hours + ':' + minutes + /*':' + seconds +*/ ' ' + amPm); //hr:min am/pm
}
function unixToTimeHR(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    var amPm = date.getHours() >= 12 ? 'PM' : 'AM'
    var hours = ("0" + ((date.getHours() % 12) || 12)).substr(-2)
    // var minutes = ("0" + date.getMinutes()).substr(-2)
    // var seconds = ("0" + date.getSeconds()).substr(-2);
    return (hours +/* ':' + minutes + ':' + seconds +*/ ' ' + amPm); // hr am/pm
}
function unixToTimeHours(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    // var amPm = date.getHours() >= 12 ? 'PM' : 'AM'
    var hours = ("0" + (date.getHours()/* % 12) || 12*/)).substr(-2)
    var minutes = ("0" + date.getMinutes()).substr(-2)
    // var seconds = ("0" + date.getSeconds()).substr(-2);
    return (hours + ':' + minutes/* + ':' + seconds + ' ' + amPm*/); //hr:min
}

let month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
let dateTime = month[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear()/*+ ', ' + currentHour + ':' + currentMinute + ' ' + ampm*/;
// // Display date
// $('.list').html(dateTime + day);

//FETCH request for selected location
$("#today").click(function () {
    // let fetch1 = new Promise((resolve, reject) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${$("#inp").val()}&appid=${$("#apk").val()}`)
        .then(function (resp) { return resp.json() })
        .then(function (local) {
            if (local.cod == 200) {
                $('.list').empty('');
                let out = '';
                out += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">CURRENT WEATHER</td>'
                    + '<td style="text-align:center;width:200px;">'
                    + local.name.toUpperCase() + '</td>'
                    + '<td style="text-align:right;width:200px;padding-right:30px;">'
                    + dateTime + '</td></tr></table></div>'
                    + '<div class="ndiv" >'
                    + '<table class="tbl";><tr><td height="20" style="text-align:center; font-size:xx-large;">'
                    + `<img src="https://openweathermap.org/img/wn/${local.weather[0]['icon']}@2x.png">`
                    + '</td></tr>'
                    + '<tr><td height="20"style="text-align:center; font-size:large;">' + local.weather[0].main
                    + '</td></tr></table>'
                    + '<table class="tbl";><tr><td height="20" style="text-align:center; font-size:350%;"><b>'
                    + Math.round(local.main.temp - 273) + '&deg;C' + '</b></td></tr></n>'
                    + '<tr><td height="20"style="text-align:center; font-size:large;">' + 'Real Feel: '
                    + Math.round(local.main.feels_like - 273) + '&deg;'
                    + '</b></td></tr></table>'
                    + '<table class="tbl";><tr><td height="20">Sunrise: ' + unixToTime(local.sys.sunrise)
                    + '</td></tr><tr><td height="20">Sunset: ' + unixToTime(local.sys.sunset)
                    + '</td></tr><tr><td height="20">Duration: ' + unixToTimeHours(local.sys.sunset - local.sys.sunrise) + ' hr' + '</td></tr></table></div>';
                // + 'Humidity: <b>' + Math.round(str3.main.pressure * 0.00750063755419211 * 100) + 'mm.mrc.</b><br>'
                // + 'Visibility: <b>' + (str3.visibility / 1000) + 'km</b><br></div>';
                // }
                $('.list').append(out);
            }
            else if (local.cod != 200) { // in case of wrong location entering
                $('.list').empty('');
                let out = '';
                out += `<img id="err" src="404_error_1.jpg">`
                    + '<p style="text-align:center; font-size:x-large;"> Qwerty could not be found.</p>'
                    + '<p style="text-align:center; font-size:x-large;"> Please enter a different location.</p> ';
                $('.list').append(out);
            }
        })
    // })
    // let fetch2 = new Promise((resolve, reject) => {
    //FETCH request for hourly forecast for selected location
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${$("#inp").val()}&appid=${$("#apk").val()}`)
        .then(function (resp) { return resp.json() })
        .then(function (hour) {
            if (hour.cod == 200) {
                let out1 = '';
                out1 += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">HOURLY</td>'
                    + '</td></tr></table></div>'
                    + '<div class="newdiv">'
                    + '<table><tr><th width="80">' + 'TODAY' + '</th><th>'
                    + unixToTimeHR(hour.list[0].dt) + '</th><th>'
                    + unixToTimeHR(hour.list[1].dt) + '</th><th>'
                    + unixToTimeHR(hour.list[2].dt) + '</th><th>'
                    + unixToTimeHR(hour.list[3].dt) + '</th><th>'
                    + unixToTimeHR(hour.list[4].dt) + '</th></tr>'
                    + '<tr><td width="80">' + ' ' + '</td>'
                    + '<td>' + `<img src="https://openweathermap.org/img/wn/${hour.list[0].weather[0]['icon']}@2x.png">` + '</td>'
                    + '<td>' + `<img src="https://openweathermap.org/img/wn/${hour.list[1].weather[0]['icon']}@2x.png">` + '</td>'
                    + '<td>' + `<img src="https://openweathermap.org/img/wn/${hour.list[2].weather[0]['icon']}@2x.png">` + '</td>'
                    + '<td>' + `<img src="https://openweathermap.org/img/wn/${hour.list[3].weather[0]['icon']}@2x.png">` + '</td>'
                    + '<td>' + `<img src="https://openweathermap.org/img/wn/${hour.list[4].weather[0]['icon']}@2x.png">` + '</td></tr>'
                    + '<tr><td width="80">' + 'Forecast' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + hour.list[0].weather[0].main + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + hour.list[1].weather[0].main + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + hour.list[2].weather[0].main + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + hour.list[3].weather[0].main + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + hour.list[4].weather[0].main + '</td></tr>'
                    + '<tr width="80"><td>' + 'Temp (&deg;C)' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[0].main.temp - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[1].main.temp - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[2].main.temp - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[3].main.temp - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[4].main.temp - 273) + '&deg;' + '</td></tr>'
                    + '<tr><td width="80">' + 'Real Feel' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[0].main.feels_like - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[1].main.feels_like - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[2].main.feels_like - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[3].main.feels_like - 273) + '&deg;' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[4].main.feels_like - 273) + '&deg;' + '</td></tr>'
                    + '<tr><td width="80">' + 'Wind (m/s)' + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[0].wind.speed) + ' ' + windDirect(hour.list[0].wind.deg) + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[1].wind.speed) + ' ' + windDirect(hour.list[1].wind.deg) + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[2].wind.speed) + ' ' + windDirect(hour.list[2].wind.deg) + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[3].wind.speed) + ' ' + windDirect(hour.list[3].wind.deg) + '</td>'
                    + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(hour.list[4].wind.speed) + ' ' + windDirect(hour.list[4].wind.deg) + '</td></tr>'
                    + '</table></div>';
                $('.list').append(out1);
            }
            else if (hour.cod != 200) {
                $('.list').empty('');
                let out = '';
                out += `<img id="err" src="404_error_1.jpg">`
                    + '<p style="text-align:center; font-size:x-large;"> Qwerty could not be found.</p>'
                    + '<p style="text-align:center; font-size:x-large;"> Please enter a different location.</p> ';
                $('.list').append(out);
            }
        })
    // })

    // let fetch3 = new Promise((resolve, reject) => {
    const a = getRandomArbitrary(0, 50);
    const b = getRandomArbitrary(0, 50);
    const c = getRandomArbitrary(0, 50);
    const d = getRandomArbitrary(0, 50);
    //FETCH request for nearby locations define, const(a, b, c, d) choosing randomly from array for 50 locations nearby to selected
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${$("#inp").val()}&appid=${$("#apk").val()}`)
        .then(function (resp) { return resp.json() })
        .then(function (local) {
            lat = local.coord.lat; //coordinates value of selected location
            lon = local.coord.lon;
            fetch(`http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&appid=${$('#apk').val()}`)
                .then(function (resp) { return resp.json() })
                .then(function (near) {
                    // console.log(near);
                    let out2 = '';
                    out2 += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">NEARBY PLACES</td>'
                        + '</td></tr></table></div>'
                        + '<div class="newsdiv">'
                        + '<table width="270"><tr><td style="text-align:right;">' + near.list[a].name + '</td>'
                        + '<td>' + `<img src="https://openweathermap.org/img/wn/${near.list[a].weather[0]['icon']}@2x.png">` + '</td>'
                        + '<td>' + Math.round(near.list[a].main.temp - 273) + '&deg;C' + '</td></tr>'
                        + '<tr><td style="text-align:right;">' + near.list[b].name + '</td>'
                        + '<td>' + `<img src="https://openweathermap.org/img/wn/${near.list[b].weather[0]['icon']}@2x.png">` + '</td>'
                        + '<td style="text-align:left;">' + Math.round(near.list[b].main.temp - 273) + '&deg;C' + '</td></tr>'
                        + '</table></div>'
                        + '<div class="newsdiv">'
                        + '<table width="270"><tr><td style="text-align:right;">' + near.list[c].name + '</td>'
                        + '<td>' + `<img src="https://openweathermap.org/img/wn/${near.list[c].weather[0]['icon']}@2x.png">` + '</td>'
                        + '<td>' + Math.round(near.list[c].main.temp - 273) + '&deg;C' + '</td></tr>'
                        + '<tr><td style="text-align:right;">' + near.list[d].name + '</td>'
                        + '<td>' + `<img src="https://openweathermap.org/img/wn/${near.list[d].weather[0]['icon']}@2x.png">` + '</td>'
                        + '<td>' + Math.round(near.list[d].main.temp - 273) + '&deg;C' + '</td></tr>'
                        + '</table></div>';
                    $('.list').append(out2);
                })
        })
    // })
    // Promise.all([fetch1, fetch2, fetch3]).then(value => {
    //     console.log(value[0]);
    // });
});

//FETCH request for 5day weather forecast for selected location
$("#forecast").click(function () {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${$("#inp").val()}&appid=${$("#apk").val()}`)
        .then(function (resp) { return resp.json() })
        .then(function (fore) {
            if (fore.cod == 200) {
                $('.list').empty('');
                let out = '';
                out += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">FORECAST WEATHER AT</td>'
                    + '<td style="text-align:left;width:200px;">'
                    + unixToTimeHR(fore.list[0].dt) + '</td>'
                    + '<td style="text-align:center;width:200px;">'
                    + fore.city.name.toUpperCase() + '</td></tr></table></div>'
                    + '<div class="newdivf">'
                    + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(fore.list[0].dt_txt)) + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${fore.list[0].weather[0]['icon']}@2x.png">` + '</td><tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(fore.list[0].main.temp - 273) + '&deg;C' + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[0].weather[0].main + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[0].weather[0].description + '</td></tr>'
                    + '</table ></div >'
                    + '<div class="newdivf">'
                    + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(fore.list[8].dt_txt)) + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${fore.list[8].weather[0]['icon']}@2x.png">` + '</td><tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(fore.list[8].main.temp - 273) + '&deg;C' + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[8].weather[0].main + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[8].weather[0].description + '</td></tr>'
                    + '</table ></div >'
                    + '<div class="newdivf">'
                    + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(fore.list[16].dt_txt)) + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${fore.list[16].weather[0]['icon']}@2x.png">` + '</td><tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(fore.list[16].main.temp - 273) + '&deg;C' + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[16].weather[0].main + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[16].weather[0].description + '</td></tr>'
                    + '</table ></div >'
                    + '<div class="newdivf">'
                    + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(fore.list[24].dt_txt)) + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${fore.list[24].weather[0]['icon']}@2x.png">` + '</td><tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(fore.list[24].main.temp - 273) + '&deg;C' + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[24].weather[0].main + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[24].weather[0].description + '</td></tr>'
                    + '</table ></div >'
                    + '<div class="newdivf">'
                    + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(fore.list[32].dt_txt)) + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${fore.list[32].weather[0]['icon']}@2x.png">` + '</td><tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(fore.list[32].main.temp - 273) + '&deg;C' + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[32].weather[0].main + '</td></tr>'
                    + '<tr><td width="80"style="text-align:center; font-size:large;">' + fore.list[32].weather[0].description + '</td></tr>'
                    + '</table ></div >';
                $('.list').append(out);
            }
            else if (fore.cod != 200) {
                $('.list').empty('');
                let out = '';
                out += `<img id="err" src="404_error_1.jpg">`
                    + '<p style="text-align:center; font-size:x-large;"> Qwerty could not be found.</p>'
                    + '<p style="text-align:center; font-size:x-large;"> Please enter a different location.</p> ';
                $('.list').append(out);
            }
        })
    //FETCH request for hourly forecast for selected location
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${$("#inp").val()}&appid=${$("#apk").val()}`)
        .then(function (resp) { return resp.json() })
        .then(function (forehour) {
            let out1 = '';
            out1 += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">HOURLY</td>'
                + '</td></tr></table></div>'
                + '<div class="newdiv">'
                + '<table><tr><th width="80">' + 'TODAY' + '</th><th>'
                + unixToTimeHR(forehour.list[1].dt) + '</th><th>'
                + unixToTimeHR(forehour.list[2].dt) + '</th><th>'
                + unixToTimeHR(forehour.list[3].dt) + '</th><th>'
                + unixToTimeHR(forehour.list[4].dt) + '</th><th>'
                + unixToTimeHR(forehour.list[5].dt) + '</th></tr>'
                + '<tr><td width="80">' + ' ' + '</td>'
                + '<td>' + `<img src="https://openweathermap.org/img/wn/${forehour.list[1].weather[0]['icon']}@2x.png">` + '</td>'
                + '<td>' + `<img src="https://openweathermap.org/img/wn/${forehour.list[2].weather[0]['icon']}@2x.png">` + '</td>'
                + '<td>' + `<img src="https://openweathermap.org/img/wn/${forehour.list[3].weather[0]['icon']}@2x.png">` + '</td>'
                + '<td>' + `<img src="https://openweathermap.org/img/wn/${forehour.list[4].weather[0]['icon']}@2x.png">` + '</td>'
                + '<td>' + `<img src="https://openweathermap.org/img/wn/${forehour.list[5].weather[0]['icon']}@2x.png">` + '</td></tr>'
                + '<tr><td width="80">' + 'Forecast' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + forehour.list[1].weather[0].main + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + forehour.list[2].weather[0].main + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + forehour.list[3].weather[0].main + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + forehour.list[4].weather[0].main + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + forehour.list[5].weather[0].main + '</td></tr>'
                + '<tr width="80"><td>' + 'Temp (&deg;C)' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[1].main.temp - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[2].main.temp - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[3].main.temp - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[4].main.temp - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[5].main.temp - 273) + '&deg;' + '</td></tr>'
                + '<tr><td width="80">' + 'Real Feel' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[1].main.feels_like - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[2].main.feels_like - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[3].main.feels_like - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[4].main.feels_like - 273) + '&deg;' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[5].main.feels_like - 273) + '&deg;' + '</td></tr>'
                + '<tr><td width="80">' + 'Wind (m/s)' + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[1].wind.speed) + ' ' + windDirect(forehour.list[1].wind.deg) + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[2].wind.speed) + ' ' + windDirect(forehour.list[2].wind.deg) + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[3].wind.speed) + ' ' + windDirect(forehour.list[3].wind.deg) + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[4].wind.speed) + ' ' + windDirect(forehour.list[4].wind.deg) + '</td>'
                + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(forehour.list[5].wind.speed) + ' ' + windDirect(forehour.list[5].wind.deg) + '</td></tr>'
                + '</table></div>';
            $('.list').append(out1);
        })
});



// SECOND OPTION


// //AJAX request for selected location
// $("#today").click(function () {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {
//             str2 = this.responseText;
//             str3 = JSON.parse(str2);
//             // console.log(str3);
//             lat = str3.coord.lat; //coordinates value of selected location
//             lon = str3.coord.lon;
//             // console.log(lat, lon);
//             $('.list').html('');
//             // $('.hourly').empty();
//             // $('.details').empty();
//             let out = '';
//             out += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">CURRENT WEATHER</td>'
//                 + '<td style="text-align:center;width:200px;">'
//                 + str3.name.toUpperCase() + '</td>'
//                 + '<td style="text-align:right;width:200px;padding-right:30px;">'
//                 + dateTime + '</td></tr></table></div>'
//                 + '<div class="ndiv" >'
//                 + '<table class="tbl";><tr><td height="20" style="text-align:center; font-size:xx-large;">'
//                 + `<img src="https://openweathermap.org/img/wn/${str3.weather[0]['icon']}@2x.png">`
//                 + '</td></tr>'
//                 + '<tr><td height="20"style="text-align:center; font-size:large;">' + str3.weather[0].main
//                 + '</td></tr></table>'
//                 + '<table class="tbl";><tr><td height="20" style="text-align:center; font-size:350%;"><b>'
//                 + Math.round(str3.main.temp - 273) + '&deg;C' + '</b></td></tr></n>'
//                 + '<tr><td height="20"style="text-align:center; font-size:large;">' + 'Real Feel: '
//                 + Math.round(str3.main.feels_like - 273) + '&deg;'
//                 + '</b></td></tr></table>'
//                 + '<table class="tbl";><tr><td height="20">Sunrise: ' + unixToTime(str3.sys.sunrise)
//                 + '</td></tr><tr><td height="20">Sunset: ' + unixToTime(str3.sys.sunset)
//                 + '</td></tr><tr><td height="20">Duration: ' + unixToTimeHours(str3.sys.sunset - str3.sys.sunrise) + ' hr' + '</td></tr></table></div>';
//             // + 'Humidity: <b>' + Math.round(str3.main.pressure * 0.00750063755419211 * 100) + 'mm.mrc.</b><br>'
//             // + 'Visibility: <b>' + (str3.visibility / 1000) + 'km</b><br></div>';
//             // }
//             $('.list').append(out);
//         }
//         else if (xhttp.readyState == 4 && xhttp.status == 404) { //in case of wrong location entering
//             $('.list').empty('');
//             lat = '';
//             lon = '';
//             let out = '';
//             out += `<img id="err" src="404_error_1.jpg">`
//                 + '<p style="text-align:center; font-size:x-large;"> Qwerty could not be found.</p>'
//                 + '<p style="text-align:center; font-size:x-large;"> Please enter a different location.</p> ';
//             $('.list').append(out);
//         }
//     }
//     html2 = "http://api.openweathermap.org/data/2.5/weather?q=" + $('#inp').val() + "&appid=" + $('#apk').val();
//     xhttp.open("GET", html2, true)
//     xhttp.send();


//     //AJAX request for hourly forecast for selected location
//     let xhttp1 = new XMLHttpRequest();
//     xhttp1.onreadystatechange = function () {
//         if (xhttp1.readyState == 4 && xhttp1.status == 200) {
//             str = this.responseText;
//             str1 = JSON.parse(str);
//             // console.log(str1);
//             // $('.hourly').empty();
//             // $('.details').empty();
//             let out1 = '';
//             out1 += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">HOURLY</td>'
//                 + '</td></tr></table></div>'
//                 + '<div class="newdiv">'
//                 + '<table><tr><th width="80">' + 'TODAY' + '</th><th>'
//                 + unixToTimeHR(str1.list[0].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[1].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[2].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[3].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[4].dt) + '</th></tr>'
//                 + '<tr><td width="80">' + ' ' + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[0].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[1].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[2].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[3].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[4].weather[0]['icon']}@2x.png">` + '</td></tr>'
//                 + '<tr><td width="80">' + 'Forecast' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[0].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[1].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[2].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[3].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[4].weather[0].main + '</td></tr>'
//                 + '<tr width="80"><td>' + 'Temp (&deg;C)' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[0].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[1].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[2].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[3].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[4].main.temp - 273) + '&deg;' + '</td></tr>'
//                 + '<tr><td width="80">' + 'Real Feel' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[0].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[1].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[2].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[3].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[4].main.feels_like - 273) + '&deg;' + '</td></tr>'
//                 + '<tr><td width="80">' + 'Wind (m/s)' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[0].wind.speed) + ' ' + windDirect(str1.list[0].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[1].wind.speed) + ' ' + windDirect(str1.list[1].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[2].wind.speed) + ' ' + windDirect(str1.list[2].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[3].wind.speed) + ' ' + windDirect(str1.list[3].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[4].wind.speed) + ' ' + windDirect(str1.list[4].wind.deg) + '</td></tr>'
//                 + '</table></div>';
//             $('.list').append(out1);
//         }
//     }
//     html3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + $('#inp').val() + "&appid=" + $('#apk').val();
//     // console.log(html3);
//     xhttp1.open("GET", html3, true)
//     xhttp1.send();

//     //AJAX request for nearby locations define, const(a, b, c, d) choosing randomly from array for 50 locations nearby to selected
//     const a = getRandomArbitrary(0, 50);
//     const b = getRandomArbitrary(0, 50);
//     const c = getRandomArbitrary(0, 50);
//     const d = getRandomArbitrary(0, 50);
//     // console.log(a, b, c, d);
//     setTimeout(function () {
//         let xhttp2 = new XMLHttpRequest();
//         xhttp2.onreadystatechange = function () {
//             if (xhttp2.readyState == 4 && xhttp2.status == 200) {
//                 str4 = this.responseText;
//                 str5 = JSON.parse(str4);
//                 // console.log(str5);
//                 // $('.hourly').empty();
//                 // $('.details').empty();
//                 let out2 = '';
//                 out2 += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">NEARBY PLACES</td>'
//                     + '</td></tr></table></div>'
//                     + '<div class="newsdiv">'
//                     + '<table width="270"><tr><td style="text-align:right;">' + str5.list[a].name + '</td>'
//                     + '<td>' + `<img src="https://openweathermap.org/img/wn/${str5.list[a].weather[0]['icon']}@2x.png">` + '</td>'
//                     + '<td>' + Math.round(str5.list[a].main.temp - 273) + '&deg;C' + '</td></tr>'
//                     + '<tr><td style="text-align:right;">' + str5.list[b].name + '</td>'
//                     + '<td>' + `<img src="https://openweathermap.org/img/wn/${str5.list[b].weather[0]['icon']}@2x.png">` + '</td>'
//                     + '<td style="text-align:left;">' + Math.round(str5.list[b].main.temp - 273) + '&deg;C' + '</td></tr>'
//                     + '</table></div>'
//                     + '<div class="newsdiv">'
//                     + '<table width="270"><tr><td style="text-align:right;">' + str5.list[c].name + '</td>'
//                     + '<td>' + `<img src="https://openweathermap.org/img/wn/${str5.list[c].weather[0]['icon']}@2x.png">` + '</td>'
//                     + '<td>' + Math.round(str5.list[c].main.temp - 273) + '&deg;C' + '</td></tr>'
//                     + '<tr><td style="text-align:right;">' + str5.list[d].name + '</td>'
//                     + '<td>' + `<img src="https://openweathermap.org/img/wn/${str5.list[d].weather[0]['icon']}@2x.png">` + '</td>'
//                     + '<td>' + Math.round(str5.list[d].main.temp - 273) + '&deg;C' + '</td></tr>'
//                     + '</table></div>';
//                 $('.list').append(out2);
//             }
//             else if (xhttp.readyState == 4 && xhttp.status != 200) {
//                 let out = '';
//                 $('.list').append(out);
//             }
//         }
//         // http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10
//         html4 = "http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&cnt=" + 50 + "&appid=" + $('#apk').val();
//         xhttp2.open("GET", html4, true)
//         xhttp2.send();
//     }, 2000);
// });

// //AJAX request for 5day weather forecast for selected location
// $("#forecast").click(function () {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {
//             str6 = this.responseText;
//             str7 = JSON.parse(str6);
//             // console.log(str7);
//             $('.list').html('');
//             // $('.hourly').empty();
//             // $('.details').empty();
//             let out = '';
//             out += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">FORECAST WEATHER AT</td>'
//                 + '<td style="text-align:left;width:200px;">'
//                 + unixToTimeHR(str7.list[0].dt) + '</td>'
//                 + '<td style="text-align:center;width:200px;">'
//                 + str7.city.name.toUpperCase() + '</td></tr></table></div>'
//                 + '<div class="newdivf">'
//                 + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(str7.list[0].dt_txt)) + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${str7.list[0].weather[0]['icon']}@2x.png">` + '</td><tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(str7.list[0].main.temp - 273) + '&deg;C' + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[0].weather[0].main + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[0].weather[0].description + '</td></tr>'
//                 + '</table ></div >'
//                 + '<div class="newdivf">'
//                 + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(str7.list[8].dt_txt)) + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${str7.list[8].weather[0]['icon']}@2x.png">` + '</td><tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(str7.list[8].main.temp - 273) + '&deg;C' + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[8].weather[0].main + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[8].weather[0].description + '</td></tr>'
//                 + '</table ></div >'
//                 + '<div class="newdivf">'
//                 + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(str7.list[16].dt_txt)) + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${str7.list[16].weather[0]['icon']}@2x.png">` + '</td><tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(str7.list[16].main.temp - 273) + '&deg;C' + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[16].weather[0].main + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[16].weather[0].description + '</td></tr>'
//                 + '</table ></div >'
//                 + '<div class="newdivf">'
//                 + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(str7.list[24].dt_txt)) + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${str7.list[24].weather[0]['icon']}@2x.png">` + '</td><tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(str7.list[24].main.temp - 273) + '&deg;C' + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[24].weather[0].main + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[24].weather[0].description + '</td></tr>'
//                 + '</table ></div >'
//                 + '<div class="newdivf">'
//                 + '<table><tr><td width="80"style="text-align:center; font-size:large;">' + getWeekDay(new Date(str7.list[32].dt_txt)) + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + `<img src="https://openweathermap.org/img/wn/${str7.list[32].weather[0]['icon']}@2x.png">` + '</td><tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + Math.round(str7.list[32].main.temp - 273) + '&deg;C' + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[32].weather[0].main + '</td></tr>'
//                 + '<tr><td width="80"style="text-align:center; font-size:large;">' + str7.list[32].weather[0].description + '</td></tr>'
//                 + '</table ></div >';
//             $('.list').append(out);
//         }
//         else if (xhttp.readyState == 4 && xhttp.status == 404) { // in case of wrong location entering
//             $('.list').empty('');
//             let out = '';
//             out += `<img id="err" src="404_error_1.jpg">`
//                 + '<p style="text-align:center; font-size:x-large;"> Qwerty could not be found.</p>'
//                 + '<p style="text-align:center; font-size:x-large;"> Please enter a different location.</p> ';
//             $('.list').append(out);
//         }
//     }
//     html5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + $('#inp').val() + "&appid=" + $('#apk').val();
//     xhttp.open("GET", html5, true)
//     xhttp.send();

//     //AJAX request for hourly forecast for selected location
//     let xhttp1 = new XMLHttpRequest();
//     xhttp1.onreadystatechange = function () {
//         if (xhttp1.readyState == 4 && xhttp1.status == 200) {
//             str = this.responseText;
//             str1 = JSON.parse(str);
//             // console.log(str1);
//             // $('.hourly').empty();
//             // $('.details').empty();
//             let out1 = '';
//             out1 += '<div class="head"> <table style="width:100%"><tr><td style="text-align:left;width:200px;padding-left:30px;">HOURLY</td>'
//                 + '</td></tr></table></div>'
//                 + '<div class="newdiv">'
//                 + '<table><tr><th width="80">' + 'TODAY' + '</th><th>'
//                 + unixToTimeHR(str1.list[1].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[2].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[3].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[4].dt) + '</th><th>'
//                 + unixToTimeHR(str1.list[5].dt) + '</th></tr>'
//                 + '<tr><td width="80">' + ' ' + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[1].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[2].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[3].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[4].weather[0]['icon']}@2x.png">` + '</td>'
//                 + '<td>' + `<img src="https://openweathermap.org/img/wn/${str1.list[5].weather[0]['icon']}@2x.png">` + '</td></tr>'
//                 + '<tr><td width="80">' + 'Forecast' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[1].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[2].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[3].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[4].weather[0].main + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + str1.list[5].weather[0].main + '</td></tr>'
//                 + '<tr width="80"><td>' + 'Temp (&deg;C)' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[1].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[2].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[3].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[4].main.temp - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[5].main.temp - 273) + '&deg;' + '</td></tr>'
//                 + '<tr><td width="80">' + 'Real Feel' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[1].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[2].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[3].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[4].main.feels_like - 273) + '&deg;' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[5].main.feels_like - 273) + '&deg;' + '</td></tr>'
//                 + '<tr><td width="80">' + 'Wind (m/s)' + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[1].wind.speed) + ' ' + windDirect(str1.list[1].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[2].wind.speed) + ' ' + windDirect(str1.list[2].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[3].wind.speed) + ' ' + windDirect(str1.list[3].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[4].wind.speed) + ' ' + windDirect(str1.list[4].wind.deg) + '</td>'
//                 + '<td height="30"style="text-align:center; font-size:large;">' + Math.round(str1.list[5].wind.speed) + ' ' + windDirect(str1.list[5].wind.deg) + '</td></tr>'
//                 + '</table></div>';
//             $('.list').append(out1);
//         }
//     }
//     html3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + $('#inp').val() + "&appid=" + $('#apk').val();
//     // console.log(html3);
//     xhttp1.open("GET", html3, true)
//     xhttp1.send();
// });


