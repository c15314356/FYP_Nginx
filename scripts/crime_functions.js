/* Adds type markers to crimes based off of their type and then assigns them to map. */
function addMarkerTypesThenAddToMap(response){
    for (let i = 0; i < response.length; i++) {
        crime = response[i];
        addMarkerTypes(crime);
    }
}

/* Adds locations to maps. */
function addLocationToMap(crime, myIcon=null){
    if(myIcon == null) {
        L.marker([crime.latitude, crime.longitude]).bindPopup(crime.location_details + '<br>' + crime.last_outcome).openPopup().addTo(MAP);
    }
    else{
        L.marker([crime.latitude, crime.longitude],{icon: myIcon}).bindPopup(crime.location_details + '<br>' + crime.last_outcome).openPopup().addTo(MAP);
    }
}

/* Adds special markers to crimes based on type. */
function addMarkerTypes(crime){
    var myIcon;
    // Switch case for crime types.
    switch (crime.crime_type) {
        case 'Other theft':
            myIcon = L.icon({iconUrl: 'src/type_theft.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Burglary':
            myIcon = L.icon({iconUrl: 'src/type_robbery.png'});
            addLocationToMap(crime, myIcon);
            break;
        
        case 'Theft from the person':
            myIcon = L.icon({iconUrl: 'src/type_robbery.png'});
            addLocationToMap(crime, myIcon);
            break;
        
        case 'Shoplifting':
            myIcon = L.icon({iconUrl: 'src/type_robbery.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Robbery':
            myIcon = L.icon({iconUrl: 'src/type_theft.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Possession of weapons':
            myIcon = L.icon({iconUrl: 'src/type_weapons.png'});
            addLocationToMap(crime, myIcon);
            break;
             
        case 'Violence and sexual offences':
            myIcon = L.icon({iconUrl: 'src/type_assault.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Drugs':
            myIcon = L.icon({iconUrl: 'src/type_drugs.png'});
            addLocationToMap(crime, myIcon);
            break;
            
        case 'Vehicle crime':
            myIcon = L.icon({iconUrl: 'src/type_vehicle_crime.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Bicycle theft':
            myIcon = L.icon({iconUrl: 'src/type_bicycle_theft.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Criminal damage and arson':
            myIcon = L.icon({iconUrl: 'src/type_criminal_damage_and_arson.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Anti-social behaviour':
            myIcon = L.icon({iconUrl: 'src/type_anti_social.png'});
            addLocationToMap(crime, myIcon);
            break;
        
        case 'Public order':
            myIcon = L.icon({iconUrl: 'src/type_public_order.png'});
            addLocationToMap(crime, myIcon);
            break;

        case 'Other crime':
            myIcon = L.icon({iconUrl: 'src/type_anti_social.png'});
            addLocationToMap(crime, myIcon);
            break;

        default:
            addLocationToMap(crime)
            break;
    }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px. */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("fullMap").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0. */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("fullMap").style.marginLeft = "0";
}

/* Functionality of nav bar, used to traveser menu & pages. */
function openPage(pageName, elmnt) {
    // Hide all elements with class="tabcontent" by default. */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons.
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content.
    elmnt.style.backgroundColor = "orange";
}

/* Creates and ajax request to the mapbox geocoding API t0 retreive approximation of coords based on search. */
function getGeoCoords(searchString){
    console.log(searchString);
    var accessToken = 'pk.eyJ1IjoiYzE1MzE0MzU2IiwiYSI6ImNqb2ZtcmU5ZjA1anAzdnF6cWVtaWUxMG4ifQ.YoM7Ip2CPDpiIsect76L1Q';
    $.ajax({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchString + '.json?access_token=' + accessToken,
        method: 'GET',
        withCredentials: true
    }).done(function(response){
        // Log response.
        // console.log(response)
        centerMapOnCoords(response.features[0].center)
    }).fail(function(error){
        console.error('Something bad happened.', error);
    });
}

/* Centers map using coords. */
function centerMapOnCoords(coords){
    MAP.panTo(coords.reverse());
}

/* All graph generation methods. */
function loadgraph() {
    var canvas = document.getElementById('myChart');
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [65, 59, 30, 81, 56, 55, 40],
            }
        ]
    };
    var option = {
        animation: {
            duration:5000
    }
    };


    var myBarChart = Chart.Bar(canvas, {
        data:data,
        options:option
    });
}

