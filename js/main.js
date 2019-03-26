/* GLOBAL VARIABLES */
// Creating intial map, zoom level and location.
var HEATLAYER;
var CLUSTERLAYER;
var MAP = L.map('mapid').setView([52.686373, -1.362305], 8);
LOCAL_URL = 'http://127.0.0.1:9000';
EXTERNAL_URL = 'http://51.141.10.255:9000';
CURRENT_URL = LOCAL_URL;
GRAPHNUMBER = 0;
HEATMAPCOORDINATES = [];


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
        showTutorialAlert();
    }).fail(function(error){
        console.error('Problem occurred when trying to connect to Node Service API.', error);
    });

    // Open home tab as default on pageload
    document.getElementById("defaultTab").click(); 
    
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

    // Jump to top of page.
    MAP.on('zoomend', function() {
        window.scrollTo(0,0);
    });

    // $('#heatMapOption').on('switchChange.bootstrapSwitch', function (event, state) {
    //     console.log("Switch worked");
    // }); 

    $('#heatMapOption').on('change.bootstrapSwitch', function(e) {
        console.log(e.target.checked);
        if(e.target.checked == true) {
            generateHeatMap();
            MAP.removeLayer(CLUSTERLAYER);
        }
        else {
            MAP.removeLayer(HEATLAYER);
            MAP.addLayer(CLUSTERLAYER);
        }
        
    });

    //go to my current location WORK ON THESE LATER
    // MAP.locate();

    // // Geojson.
    // L.geoJSON(geojsonFeature, {
    //     // style: myStyle
    // }).addTo(MAP);
    // console.log('done');

    // Map events & functions.
    // var popup = L.popup();
    // function onMapClick(e) {
    //     popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(MAP);
    // }
    // MAP.on('click', onMapClick);
});
