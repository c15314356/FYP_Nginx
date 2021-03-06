clusterSubGroupViolenceAndSexualOffences = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupPublicOrder = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupDrugs = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupPossessionOfWeapons = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupCriminalDamageAndArson = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupAntiSocialBehaviour = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupRobbery = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupVehicleCrime = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupTheftFromPorperty = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupTheftFromPerson = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupShopLifting = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupBicycleTheft = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupOtherTheft = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupOtherCrime = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
clusterSubGroupOtherCrime = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60}); 
clusterSubGroups = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
var graphColors = [];

/* Adds type markers to crimes based off of their type and then assigns them to map. */
function addMarkerTypesThenAddToMap(response) {
    for (let i = 0; i < response.length; i++) {
        crime = response[i];
        addMarkerTypes(crime);
    }
}

/* Adds locations to maps. */
function addLocationToMap(crime, myIcon=null) {
    if(myIcon == null) {
        L.marker(crime.location.coordinates.reverse()).addEventListener('click', function() {
            getCrimeInfo(crime.properties.crime_id);
            $('#crimeInfoModal').modal('show');
        }).addTo(MAP);
    }
    else{
        L.marker(crime.location.coordinates.reverse(), {icon: myIcon}).addEventListener('click', function() {
            getCrimeInfo(crime.properties.crime_id);
            $('#crimeInfoModal').modal('show');
        }).addTo(MAP);
    }
}

/* Adds locations to maps but in cluster groups. */
function addLocationToMapUsingCLusters(crime, markerCluster, myIcon=null) {
    if(myIcon == null) {
        var cluster = L.marker(crime.location.coordinates.reverse()).addEventListener('click', function() {
            getCrimeInfo(crime.properties.crime_id);
            $('#crimeInfoModal').modal('show');
        });
    }
    else{
        var cluster = L.marker(crime.location.coordinates.reverse(), {icon: myIcon}).addEventListener('click', function() {
            getCrimeInfo(crime.properties.crime_id);
            $('#crimeInfoModal').modal('show');
        });
    }
    markerCluster.addLayer(cluster);
}

function createAndDisplayRegions(response) {
    for (let i = 0; i < response.length; i++) {
        region = response[i];
        createPolygon(region);
    }
}

function createPolygon(region) {
    // Polygons used to spilt Map.
    var regionPolygon = L.polygon(region.geometry.coordinates, {opacity: 0.4, fillOpacity: 0.0, color: "orange", weight: 2}).addEventListener('click', function(){
        months = dateRange();
        if(months) {
            loadRegion(region.properties.name, months);
            $("#filterCrimeTypeLabel").text("Filter On Crime Type");
            $("#filterCrimeType").removeAttr('disabled');
            $("#graphTabID").prop("disabled", false);
            regionPolygon.setStyle({opacity: 1.0, color: "blue"});
            // MAP.panTo(regionPolygon.getBounds().getCenter());
            regionPolygon.removeEventListener('click');
            
        }
    })
    MAP.addLayer(regionPolygon);
}

function dateRange() {
    var year = $('#yearSelect').find(":selected").text();
    var check = $("input[name='month']:checked").length > 0;
    var months = [];
    if(check){
        $.each($("input[name='month']:checked"), function(){         
            months.push({'properties.crime_date': year + '-' + $(this).val()});
        });
        return months;
    }
    else {
        alert("Please check at least one month");
    }
}

function addLocationToSubClusters(crime, clusterSubGroup, myIcon) {
    var cluster = L.marker(crime.location.coordinates, {icon: myIcon}).addEventListener('click', function() {
        getCrimeInfo(crime.properties.crime_id);
        $('#crimeInfoModal').modal('show');
    });
    clusterSubGroup.addLayer(cluster);
}

function getSelectedCrimeTypeFilter() {
    selectedCrimeTypes = [];
    $.each($(".crimeTypeOptions option:selected"), function() {            
        selectedCrimeTypes.push($(this).val());
    });
    return selectedCrimeTypes
}

function filterCrimes() {
    clusterSubGroups.clearLayers();
    selectedCrimeTypes = getSelectedCrimeTypeFilter();
    filterClusterGroupOnMap(selectedCrimeTypes);
}

/* Adds special markers to crimes based on type. */
function addMarkerTypes(crime, markerCluster=null) {
    var myIcon;
    // Switch case for crime types which adds location to maps using markers.
    if(markerCluster == null) {
        switch (crime.properties.crime_type) {
            case 'Other theft':
                myIcon = L.icon({iconUrl: 'images/type_theft.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Burglary':
                myIcon = L.icon({iconUrl: 'images/type_robbery.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Theft from the person':
                myIcon = L.icon({iconUrl: 'images/type_robbery.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Shoplifting':
                myIcon = L.icon({iconUrl: 'images/type_robbery.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Robbery':
                myIcon = L.icon({iconUrl: 'images/type_theft.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Possession of weapons':
                myIcon = L.icon({iconUrl: 'images/type_weapons.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Violence and sexual offences':
                myIcon = L.icon({iconUrl: 'images/type_assault.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Drugs':
                myIcon = L.icon({iconUrl: 'images/type_drugs.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Vehicle crime':
                myIcon = L.icon({iconUrl: 'images/type_vehicle_crime.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Bicycle theft':
                myIcon = L.icon({iconUrl: 'images/type_bicycle_theft.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Criminal damage and Arson':
                myIcon = L.icon({iconUrl: 'images/type_criminal_damage_and_arson.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Anti-social behaviour':
                myIcon = L.icon({iconUrl: 'images/type_anti_social.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Public order':
                myIcon = L.icon({iconUrl: 'images/type_public_order.png'});
                addLocationToMap(crime, myIcon);
                break;
            case 'Other crime':
                myIcon = L.icon({iconUrl: 'images/type_anti_social.png'});
                addLocationToMap(crime, myIcon);
                break;
            default:
                addLocationToMap(crime)
                break;
        }
    }
    // Switch case for crime types using marker clusters which adds location to map.
    else {
        switch (crime.properties.crime_type) {
            case 'Other theft':
                myIcon = L.icon({iconUrl: 'images/type_theft.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupOtherTheft, myIcon);
                break;
            case 'Burglary':
                myIcon = L.icon({iconUrl: 'images/type_robbery.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupTheftFromPorperty, myIcon);
                break;
            case 'Theft from the person':
                myIcon = L.icon({iconUrl: 'images/type_robbery.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupTheftFromPerson, myIcon);
                break;
            case 'Shoplifting':
                myIcon = L.icon({iconUrl: 'images/type_robbery.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupShopLifting, myIcon);
                break;
            case 'Robbery':
                myIcon = L.icon({iconUrl: 'images/type_theft.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupRobbery, myIcon);
                break;
            case 'Possession of weapons':
                myIcon = L.icon({iconUrl: 'images/type_weapons.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupPossessionOfWeapons, myIcon);
                break; 
            case 'Violence and sexual offences':
                myIcon = L.icon({iconUrl: 'images/type_assault.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupViolenceAndSexualOffences, myIcon);
                break;
            case 'Drugs':
                myIcon = L.icon({iconUrl: 'images/type_drugs.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupDrugs, myIcon);
                break;
            case 'Vehicle crime':
                myIcon = L.icon({iconUrl: 'images/type_vehicle_crime.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupVehicleCrime, myIcon);
                break;
            case 'Bicycle theft':
                myIcon = L.icon({iconUrl: 'images/type_bicycle_theft.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupBicycleTheft, myIcon);
                break;
            case 'Criminal damage and arson':
                myIcon = L.icon({iconUrl: 'images/type_criminal_damage_and_arson.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupCriminalDamageAndArson, myIcon);
                break;
            case 'Anti-social behaviour':
                myIcon = L.icon({iconUrl: 'images/type_anti_social.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupAntiSocialBehaviour, myIcon);
                break;
            case 'Public order':
                myIcon = L.icon({iconUrl: 'images/type_public_order.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupPublicOrder, myIcon);
                break;
            case 'Other crime':
                myIcon = L.icon({iconUrl: 'images/type_anti_social.png'});
                addLocationToMapUsingCLusters(crime, markerCluster, myIcon);
                addLocationToSubClusters(crime, clusterSubGroupOtherCrime, myIcon);
                break;
            default:
                myIcon = L.icon({iconUrl: 'images/type_anti_social.png'});
                addLocationToMapUsingCLusters(crime, clusterSubGroupOtherCrime, myIcon);
                break;
        }
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

/* Creates and ajax request to the mapbox geocoding API to retreive approximation of coords based on search. */
function getGeoCoords(searchString) {
    var accessToken = 'pk.eyJ1IjoiYzE1MzE0MzU2IiwiYSI6ImNqb2ZtcmU5ZjA1anAzdnF6cWVtaWUxMG4ifQ.YoM7Ip2CPDpiIsect76L1Q';
    $.ajax({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchString + ', ' + 'United Kingdom' + '.json?access_token=' + accessToken,
        method: 'GET',
        withCredentials: true
    }).done(function(response){
        centerMapOnCoords(response.features[0].center)
    }).fail(function(error){
        console.error('Unable to retrieve geocoordinate information:', error);
    });
}

/* Centers map using coords. */
function centerMapOnCoords(coords) {
    MAP.panTo(coords.reverse());
}

/* Creates a marker cluster group and adds it to the map. */
function addMarkerCLusterGroupsToMap(response) {
    selectedCrimeTypes = getSelectedCrimeTypeFilter()
    CURRENTCLUSTERLAYER = L.markerClusterGroup({disableClusteringAtZoom: 16, maxClusterRadius: 60});
    for (let i = 0; i < response.length; i++) {
        crime = response[i];
        addMarkerTypes(crime, CURRENTCLUSTERLAYER);
    }
    FULLCLUSTERLAYER.addLayer(CURRENTCLUSTERLAYER);
    filterClusterGroupOnMap(selectedCrimeTypes);
}

/* Retrieves geoghraphical data from database and adds them to initial map. */
function loadRegion(region_name, months) {
    $.ajax({
        url: CURRENT_URL + '/db',
        method: 'GET',
        data:{
            region_name : region_name,
            crime_dates : months
        },
        withCredentials: true
    }).done(function(response){
        // addMarkerTypesThenAddToMap(response);
        addMarkerCLusterGroupsToMap(response);
        addToHeatMapData(response);
        loadgraphs(response, region_name);
    }).fail(function(error){
        console.error('Problem occurred when trying to connect to Node Service API.', error);
    });
}

function addToHeatMapData(response){
    for (let i = 0; i < response.length; i++) {
        crime = response[i];
        HEATMAPCOORDINATES.push(crime);
    }
}

function generateHeatMap() {
    var coordinates = [];
    for (let i = 0; i < HEATMAPCOORDINATES.length; i++) {
        crime = HEATMAPCOORDINATES[i];
        coordinates.push([crime.location.coordinates[0], crime.location.coordinates[1], 0.5]);
    }
    HEATLAYER = L.heatLayer(coordinates, {radius: 25});
    MAP.addLayer(HEATLAYER);
}

function showTutorialAlert() {
    $("#tutorialOneAlert").fadeTo(3000, 600).slideUp(600, function(){
        $("#tutorialOneAlert").slideUp(600);
    });
}

function showSubmitAlert() {
    $("#submitAlert").fadeTo(3000, 600).slideUp(600, function(){
        $("#submitAlert").slideUp(600);
    });
}

/* Retrieves crime information from UK police API */
function getCrimeInfo(crime_id) {
    $.ajax({
        url:'https://data.police.uk/api/outcomes-for-crime/' + crime_id,
        method: 'GET',
        withCredentials: true,
        beforeSend: function() {
            $("#modalSpinner").show();
            $('#crimeInfoBody').hide();
            $("#modalSpinnerFail").hide();
        }
    }).done(function(response) {
        $("#crimeInfoBody").show();
        $('#modalSpinner').hide();
        setCrimeInfoModal(response);
        setCrimeAlertInfo(response);
    }).fail(function(error) {
        console.error('Problem occurred when trying to connect to Polic Data UK API.', error);
        $("#modalSpinnerFail").show();
        $('#modalSpinner').hide();
        resetAlertSelection();
    });
}

function setCrimeInfoModal(response){
    $("#crimeInfoTableBody").empty();
    $('#crimeInfoCategory').text(response.crime.category);
    $('#crimeInfoID').text(response.crime.id);
    $('#crimeInfoLat').text(response.crime.location.latitude);
    $('#crimeInfoLong').text(response.crime.location.longitude);
    $('#crimeInfoStreet').text(response.crime.location.street.name);
    $('#crimeInfoDate').text(response.crime.month);

    response.outcomes.forEach(function(item) {
        var $tableRowDate = jQuery('<tr/>', {
        }).appendTo('#crimeInfoTableBody');

        jQuery('<td/>', {
            text: item.date
        }).appendTo($tableRowDate);

        jQuery('<td/>', {
            text: item.category.name
        }).appendTo($tableRowDate);
    });
}

function resetAlertSelection() {
    $('#crimeReportCategory').val("");
    $('#crimeReportCategory').prop("disabled", false);

    $('#crimeReportID').val("");
    $('#crimeReportID').prop("disabled", false);

    $('#crimeReportLat').val("");
    $('#crimeReportLat').prop("disabled", false);

    $('#crimeReportLong').val("");
    $('#crimeReportLong').prop("disabled", false);

    $('#crimeReportStreet').val("");
    $('#crimeReportStreet').prop("disabled", false);

    $('#crimeReportDate').val("");
    $('#crimeReportDate').prop("disabled", false);

    $('#crimeReportOutcome').val("");
    $('#crimeReportOutcome').prop("disabled", false);
}

function setCrimeAlertInfo(response){
    $('#crimeReportCategory').val(response.crime.category);
    $('#crimeReportID').val(response.crime.id);
    $('#crimeReportLat').val(response.crime.location.latitude);
    $('#crimeReportLong').val(response.crime.location.longitude);
    $('#crimeReportStreet').val(response.crime.location.street.name);
    $('#crimeReportDate').val(response.crime.month);
    $('#crimeReportOutcome').val(response.outcomes[response.outcomes.length-1].category.name);
}


function removeAllLayers() {
    MAP.removeLayer(clusterSubGroupViolenceAndSexualOffences);
    MAP.removeLayer(clusterSubGroupPublicOrder);
    MAP.removeLayer(clusterSubGroupDrugs);
    MAP.removeLayer(clusterSubGroupPossessionOfWeapons);
    MAP.removeLayer(clusterSubGroupCriminalDamageAndArson);
    MAP.removeLayer(clusterSubGroupAntiSocialBehaviour);
    MAP.removeLayer(clusterSubGroupRobbery);
    MAP.removeLayer(clusterSubGroupVehicleCrime);
    MAP.removeLayer(clusterSubGroupTheftFromPorperty);
    MAP.removeLayer(clusterSubGroupTheftFromPerson);
    MAP.removeLayer(clusterSubGroupShopLifting);
    MAP.removeLayer(clusterSubGroupBicycleTheft);
    MAP.removeLayer(clusterSubGroupOtherTheft);
    MAP.removeLayer(clusterSubGroupOtherCrime);
    MAP.removeLayer(clusterSubGroupOtherCrime);
    MAP.removeLayer(FULLCLUSTERLAYER);
    MAP.removeLayer(clusterSubGroups);
}

function filterClusterGroupOnMap(selectedCrimeTypes) {
    removeAllLayers();
    selectedCrimeTypes.forEach(function(item) {
        switch (item) {
            case 'All Crimes':
                MAP.addLayer(FULLCLUSTERLAYER);
                break;
        
            case 'Violence & Sexual Offences':
                clusterSubGroups.addLayer(clusterSubGroupViolenceAndSexualOffences);
                break;
        
            case 'Public Order':
                clusterSubGroups.addLayer(clusterSubGroupPublicOrder);
                break;
        
            case 'Drugs':
                clusterSubGroups.addLayer(clusterSubGroupDrugs);
                break;
        
            case 'Possession of Weapons':
                clusterSubGroups.addLayer(clusterSubGroupPossessionOfWeapons);
                break;
        
            case 'Criminal Damage & Arson':
                clusterSubGroups.addLayer(clusterSubGroupCriminalDamageAndArson);
                break;
        
            case 'Anti-social Behaviour':
                clusterSubGroups.addLayer(clusterSubGroupAntiSocialBehaviour);
                break;
                    
            case 'Robbery':
                clusterSubGroups.addLayer(clusterSubGroupRobbery);
                break;
        
            case 'Theft From Property (Burglary)':
                clusterSubGroups.addLayer(clusterSubGroupTheftFromPorperty);
                break;
        
            case 'Theft From Person':
                clusterSubGroups.addLayer(clusterSubGroupTheftFromPerson);
                break;
        
            case 'Shoplifting':
                clusterSubGroups.addLayer(clusterSubGroupShopLifting);
                break;
        
            case 'Bicycle Theft':
                clusterSubGroups.addLayer(clusterSubGroupBicycleTheft);
                break;

            case 'Vehicle Crime':
                clusterSubGroups.addLayer(clusterSubGroupVehicleCrime);
                break;
        
            case 'Other Theft':
                clusterSubGroups.addLayer(clusterSubGroupOtherTheft);
                break;
        
            case 'Other Crime':
                clusterSubGroups.addLayer(clusterSubGroupOtherCrime);
                break;
        
            default:
                console.log("Unidentified selection in filterClusterGroupOnMap()");
                break;
        }
    });
    MAP.addLayer(clusterSubGroups);
}

function createGraphicalDataTotals(response) {
    var other_theft = 0; 
    var burglary = 0; 
    var theft_from_the_person = 0; 
    var shoplifting = 0; 
    var robbery = 0; 
    var possession_of_weapons = 0; 
    var violence_and_sexual_offences = 0; 
    var drugs = 0; 
    var vehicle_crime = 0; 
    var bicycle_theft = 0; 
    var criminal_damage_and_arson = 0; 
    var antisocial_behaviour = 0; 
    var public_order = 0; 
    var other_crime = 0; 

    response.forEach(function(item) {
        switch (item.properties.crime_type) {
            case 'Other theft':
                other_theft++;
                break;
    
            case 'Burglary':
                burglary++;
                break;
           
            case 'Theft from the person':
                theft_from_the_person++; 
                break;
            
            case 'Shoplifting':
                shoplifting++;
                break;
    
            case 'Robbery':
                robbery++;
                break;
    
            case 'Possession of weapons':
                possession_of_weapons++;
                break;
                    
            case 'Violence and sexual offences':
                violence_and_sexual_offences++;
                break;
    
            case 'Drugs':
                drugs++;
                break;
                
            case 'Vehicle crime':
                vehicle_crime++;
                break;
    
            case 'Bicycle theft':
                bicycle_theft++;
                break;
    
            case 'Criminal damage and arson':
                criminal_damage_and_arson++;
                break;
    
            case 'Anti-social behaviour':
                antisocial_behaviour++;
                break;
            
            case 'Public order':
                public_order++;
                break;
    
            case 'Other crime':
                other_crime++;
                break;
    
            default:
                other_crime++;
                break;
        }
    });
    return [public_order, drugs, possession_of_weapons, 
        violence_and_sexual_offences, criminal_damage_and_arson, 
        antisocial_behaviour, robbery, burglary,
        theft_from_the_person, shoplifting, bicycle_theft, 
        vehicle_crime, other_theft, other_crime]
}

function generatePolarChart(total_values, region_name, graphColors, labels) {
    var PolarChartCanvas = document.getElementById('generatedPolarChart' + GRAPHNUMBER);
    var data = {
        labels: labels,
        datasets: [
            {
                label: "Breakdown of Crime in " + region_name + " Region",
                data: total_values,
                backgroundColor: graphColors
            }
        ]
    };

    var option = {
        animation: {
            duration:5000
        },
        title : {
            display: true,
            text: "Breakdown of Crime in " + region_name + " Region",
            fontSize: 14,
            padding: 10
        },
        legend: {
            display: false,
            position: "right"
        }
    };

    var myPolarChart = new Chart(PolarChartCanvas, {
        type: 'polarArea',
        data: data,
        options: option
    });
}

function generateBarChart(total_values, region_name, graphColors, hoverGraphColors, labels) {
    var barChartCanvas = document.getElementById('generatedBarChart' + GRAPHNUMBER);
    var data = {
        labels: labels,
        datasets: [
            {
                label: "Number of Reports Per Region" ,
                backgroundColor: graphColors,
                borderColor: "rgba(192,192,192,1)",
                borderWidth: 2,
                hoverBackgroundColor: hoverGraphColors,
                hoverBorderColor: "rgba(192,192,192,1)",
                data: total_values,
            }
        ]
    };
    var option = {
        animation: {
            duration:5000
        },
        title : {
            display: true,
            text: "Breakdown of Crime in " + region_name + " Region",
            fontSize: 14,
        }
    };
    var myBarChart = Chart.Bar(barChartCanvas, {
        data:data,
        options:option
    });
}

function createRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var opacity = 0.5;
    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}

function changeColorOpacity(colors) {
    var hoverGraphColors = [];
    var opacity = 0.9;
    colors.forEach(function(item) {
        item = item.slice(0, -4);
        item = item + opacity + ")";
        hoverGraphColors.push(item);
    });
    return hoverGraphColors
}

function createGraphColourScheme() {
    var i;
    for(i = 0; i < 14; i++) {
        graphColors.push(createRandomColor());
    }
}

/* All graph generation methods. */
function loadgraphs(response, region_name) {
    var hoverGraphColors = [];
    var labels = [ "Public Order", "Drugs", "Possession of Weapons","Violence & Sexual Offences", 
        "Criminal Damage and Arson", "Anti-social Behaviour", "Robbery", "Burglary", 
        "Theft From Person", "Shoplifting", "Bicycle Theft", "Vehicle Crime", "Other Theft", "Other Crime"];

    total_values = createGraphicalDataTotals(response);

    // Generate the hover colors by increasing intensity of color
    hoverGraphColors = changeColorOpacity(graphColors);

    var $graphBody = jQuery('<div/>', {
        class: "padding-top-25"
    }).appendTo('#graphCanvas');

    var $chartRow = jQuery('<div/>', {
        class: "row margin-right-0",
    }).appendTo($graphBody);

    var $chartDivLeft = jQuery('<div/>', {
        id: "generatedBarChartDiv" + GRAPHNUMBER,
        class: "col-sm-6"
    }).appendTo($chartRow);

    var $chartDivRight = jQuery('<div/>', {
        id: "generatedPolarChartDiv" + GRAPHNUMBER,
        class: "col-sm-6"
    }).appendTo($chartRow);

    var $chartOptionsLeft = jQuery('<div/>', {
        class: 'float-right'
    }).appendTo($chartDivLeft);

    var $chartOptionsRight = jQuery('<div/>', {
        class: 'float-right'
    }).appendTo($chartDivRight);

    jQuery('<button/>', {
        id: "chartButtonLeft" + GRAPHNUMBER,
        class: "btn btn-primary",
        type: "button",
        html: '<i class="far fa-save"></i>'
    }).appendTo($chartOptionsLeft);

    jQuery('<button/>', {
        id: "chartButtonRight" + GRAPHNUMBER,
        class: "btn btn-primary",
        type: "button",
        html: '<i class="far fa-save"></i>'
    }).appendTo($chartOptionsRight);

    jQuery('<canvas/>', {
        id: "generatedBarChart" + GRAPHNUMBER
    }).appendTo($chartDivLeft);

    jQuery('<canvas/>', {
        id: "generatedPolarChart" + GRAPHNUMBER
    }).appendTo($chartDivRight);

    var currentChartButtonLeft = $("#chartButtonLeft" + GRAPHNUMBER);
    var currentChartButtonRight = $("#chartButtonRight" + GRAPHNUMBER);
    var currentGeneratedBarChart = $("#generatedBarChart" + GRAPHNUMBER);
    var currentGeneratedPolarChart = $("#generatedPolarChart" + GRAPHNUMBER);

    $(currentChartButtonLeft).click(function() {
        $(currentGeneratedBarChart).get(0).toBlob(function(blob) {
           saveAs(blob, "chart.png");
       });
    });

    $(currentChartButtonRight).click(function() {
        $(currentGeneratedPolarChart).get(0).toBlob(function(blob) {
           saveAs(blob, "chart.png");
       });
    });

    generatePolarChart(total_values, region_name, graphColors, labels);
    generateBarChart(total_values, region_name, graphColors, hoverGraphColors, labels);

    GRAPHNUMBER++;
}

