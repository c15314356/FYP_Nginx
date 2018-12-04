function createMarkers(mymap){
    // Add markers.
    L.marker([51.5, -0.09]).bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup().addTo(mymap);
    
    L.marker([51.516703, -0.093558]).bindPopup("<b>Hello world!</b><br>I am a popup.2").openPopup().addTo(mymap);
}

function printResponse(response){
    const container = $('#test')[0];
    for (let i = 0; i < response.length; i++) {
        const test = response[i];
        const div = document.createElement( 'div');
        div.classList.add('row');
        div.innerHTML = 'Crime: ' + test.crime_type + ' Lat/Long: ' + test.latitude + ',' + test.longitude + ' Loc Details: ' + test.location_details + ' outcome: ' + test.last_outcome;
        container.appendChild(div);
    }
}

function mapMarkers(response, mymap){
    for (let i = 0; i < response.length; i++) {
        const crime = response[i];
        L.marker([crime.latitude, crime.longitude]).bindPopup(crime.location_details + '<br>' + crime.last_outcome).openPopup().addTo(mymap);
    }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("fullMap").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("fullMap").style.marginLeft = "0";
}

function openPage(pageName, elmnt) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = "orange";
}

// Example Graph template from Chart.js
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

