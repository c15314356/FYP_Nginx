/* GLOBAL VARIABLES */
var HEATLAYER;
var CURRENTCLUSTERLAYER;
// Creating intial map, zoom level and location.
var MAP = L.map('mapid').setView([52.686373, -1.362305], 8);
FULLCLUSTERLAYER = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
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
    $('#submitAlert').hide();
    
    // Add OpenStreetMap tile layer, so we have an actual map.
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYzE1MzE0MzU2IiwiYSI6ImNqb2ZtcmU5ZjA1anAzdnF6cWVtaWUxMG4ifQ.YoM7Ip2CPDpiIsect76L1Q'
    }).addTo(MAP);

    // Jump to top of page.
    MAP.on('zoomend', function() {
        window.scrollTo(0,0);
    });

    // Managing heat toggle 
    $('#heatMapOption').on('change.bootstrapSwitch', function(e) {
        if(e.target.checked == true) {
            generateHeatMap();
            removeAllLayers();
        }
        else {
            MAP.removeLayer(HEATLAYER);
            filterCrimes();
        }
    });

    // Refreshes map on resizing
    MAP._onResize(); 

    // Creates graph colour scheme on page load.
    createGraphColourScheme();
});
