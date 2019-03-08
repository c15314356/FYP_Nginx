/* GLOBAL VARIABLES */
// Creating intial map, zoom level and location.
var MAP = L.map('mapid').setView([52.686373, -1.362305], 8);
LOCAL_URL = 'http://127.0.0.1:9000';
EXTERNAL_URL = 'http://51.141.10.255:9000';
CURRENT_URL = LOCAL_URL;

/* Calls all functions once page is ready. */
$(function() {
    /* Retrieves regional coordinate data from database and creates regions based on them. */
    $.ajax({
        url: CURRENT_URL +'/regions',
        method: 'GET',
        withCredentials: true
    }).done(function(response){
        console.log(response);
        createAndDisplayRegions(response);
    }).fail(function(error){
        console.error('Problem occurred when trying to connect to Node Service API.', error);
    });
    
    // // Create Ajax request (XMLHTTPRequest)
    // test = $.ajax({
    //     url: 'http://127.0.0.1:9000/login',
    //     method: 'POST', // METHOD
    //     // DATA TO SEND
    //     data: { 
    //         username: 'test', 
    //         password: 'hello world'
    //     }
    //     // When data received (response == 200)
    // }).done(function(response){
    //     console.log(response);
    //     // When response failed (no internet conenction, connection aborted ect)
    // }).fail(function(error){
    //     console.error('Something bad happened.', error);
    // });

    // Add OpenStreetMap tile layer, so we have an actual map.
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 22,
    // minZoom: 11,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYzE1MzE0MzU2IiwiYSI6ImNqb2ZtcmU5ZjA1anAzdnF6cWVtaWUxMG4ifQ.YoM7Ip2CPDpiIsect76L1Q'
    }).addTo(MAP);

    //go to my current location WORK ON THESE LATER
    // MAP.locate();

    // var geojsonFeature = {
    //     "type": "Feature",
    //     "properties": {
    //         "name": "Coors Field",
    //         "amenity": "Baseball Stadium",
    //         "popupContent": "This is where the Rockies play!"
    //     },
    //     "geometry": {
    //         "type": "Polygon",
    //         "coordinates": [
    //             [53.8913912806, -5.72387693339],
    //             [54.438102791, -8.6242675385],
    //             [53.943154694, -7.22900388672],
    //             [53.8913912806, -5.72387693339],
    //     ]
    //     }
    // };

    // // Geojson.
    // L.geoJSON(geojsonFeature, {
    //     // style: myStyle
    // }).addTo(MAP);
    // console.log('done');

    // Map events & functions.
    var popup = L.popup();
    function onMapClick(e) {
        popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(MAP);
    }

    MAP.on('click', onMapClick);

    // Open home tab as default on pageload
    document.getElementById("defaultTab").click(); 
    
    // Visualises graphical data.
    loadgraph();

});
