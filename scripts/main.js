/* GLOBAL VARIABLES */
// Creating intial map, zoom level and location.
var MAP = L.map('mapid').setView([51.505, -0.09], 14);
var LOCAL_URL = 'http://127.0.0.1:9000/db';
var EXTERNAL_URL = 'http://51.141.10.255:9000/db';

/* Calls all functions once page is ready. */
$(function() {

    /* Retrieves geoghraphical data from database and adds them to initial map. */
    $.ajax({
        url: LOCAL_URL,
        method: 'GET',
        withCredentials: true
    }).done(function(response){
        // addMarkerTypesThenAddToMap(response);
        addMarkerCLusterGroupsToMap(response);
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

    // Open home tab as default on pageload
    document.getElementById("defaultTab").click(); 
    
    // Visualises graphical data.
    loadgraph();

});
