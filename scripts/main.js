// This will execute when the page is ready.
$(function() {
    
    $.ajax({
        // url: 'http://51.141.10.255:9000/db',
        url: 'http://127.0.0.1:9000/db',
        method: 'GET',
        withCredentials: true
    }).done(function(response){
        // printResponse(response);
        mapMarkers(response, mymap);
    }).fail(function(error){
        console.error('Something bad happened.', error);
    });

    // // Create Ajax request (XMLHTTPRequest)
    // test = $.ajax({
    //     url: 'http://127.0.0.1:9000/login', // URL TO HOST
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

    // Creating intial map, zoom level and location.
    var mymap = L.map('mapid').setView([51.505, -0.09], 14);

    // Add OpenStreetMap tile layer, so we have an actual map.
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    minZoom: 11,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYzE1MzE0MzU2IiwiYSI6ImNqb2ZtcmU5ZjA1anAzdnF6cWVtaWUxMG4ifQ.YoM7Ip2CPDpiIsect76L1Q'
    }).addTo(mymap);

    // Open Home tab as default on pageload
    document.getElementById("defaultTab").click(); 
    
    // Visualises graphical data.
    loadgraph();

});
