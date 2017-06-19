var map;
var origin, destination;
var destinations = [];
var waypoints = [];
var newmark = [];
var directionsDisplay;

$('#getDir').hide();
var save = [];
lawang_sewu = {
            lat: -6.983956,
            lng: 110.410409
}

maerakaca_grand = {
            lat: -6.960774,
            lng: 110.390567
}
unika = {
            lat: -7.024912,
            lng: 110.404926
}
sampokong = {
            lat:  -6.996161,
            lng: 110.398164
}

kost_simpang_lima = {
            lat: -6.989312163612732,
            lng: 110.42530148693845
}

kost_sisinga_raja = {
            lat: -7.01589158203397,
            lng: 110.42186825939939
}

kost_menoreh = {
            lat: -7.008906112413216,
            lng: 110.39380162426755
}
kost_pandanaran = {
            lat: -6.986585983846024,
            lng: 110.41646092602537
}
kost_pemuda = {
            lat: -6.97994085408084,
            lng:  110.4126843757324
}
function initMap() {
    check();
    map = new google.maps.Map($("#map")[0], {
        center: {
            lat: -7.0071388,
            lng: 110.4304819
        },
        zoom: 14,
        streetViewControl: false,
        mapTypeControl: false
    });

    initGeolocation();
    initAutocomplete();
}

function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            markOrigin(position);
        }, function (error) {
            var position = {
                lat: -7.023814,
                lng: 110.403243
            }
            markOrigin(position);
        });
    }
}

function routeList(origin,destination){
    console.log(origin);
}

function initAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search'), {
        componentRestrictions: {'country': 'id'}
    });

    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            window.alert("No details available for '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        var infowindow = new google.maps.InfoWindow({
            content: place.name
        });

        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: "images/star.png"
        });

        marker.addListener("click", function() {
            $('#getDir').show();
            console.log(place.id);
            $('#places').append("<li class=\"list-group-item\">"+place.name+"</li>");
            $('#destination').html("<strong>"+place.name+"</strong>"+"Address : "+place.formatted_address+"<br>"+
                "Coordinates : "+place.geometry.location+"<br>"+"Contact : "+place.formatted_phone_number);
            waypoints.push({
                location: place.geometry.location,
                stopover: true
            });
            check();
        });

        save.push(marker);

        infowindow.setContent(place.name);
        infowindow.open(map, marker);
    });
}
function check()
{
    if(waypoints.length == 0)
    {
        document.getElementById("show").style.visibility = "hidden";
    }
    else if(waypoints.length != 0)
    {
        document.getElementById("show").style.visibility = "visible";
    }
}

function resetAll()
{
    /*document.getElementById("listDir").innerHTML='';
    save=[];
    waypoints=[];
    marker.setMap(null);
    directionsDisplay.setMap(null);
    newmark.setMap(null);
    $('#getDir').hide();*/
        location.reload();

}

function markOrigin(position) {
    origin = position;

    var icon = "images/regroup.png";
    var icon_kos = "images/mosq.png";

    var marker = new google.maps.Marker({
        map: map,
        position: origin,
        icon: icon,
        draggable:true,
        title: "I'm here!"
    });

    var marker_simpang_lima = new google.maps.Marker({
        map: map,
        position: kost_simpang_lima,
        icon: icon_kos,
        draggable:true,
        title: "Kost Holiday Inn Simpang 5"
    });

    var marker_sisi_raja = new google.maps.Marker({
        map: map,
        position: kost_sisinga_raja,
        icon: icon_kos,
        draggable:true,
        title: "Kost Sisingamangaraja"
    });

    var marker_menoreh = new google.maps.Marker({
        map: map,
        position: kost_menoreh,
        icon: icon_kos,
        draggable:true,
        title: "Kost Menoreh Damai Asri"
    });

    var marker_pandanaran = new google.maps.Marker({
        map: map,
        position: kost_pandanaran,
        icon: icon_kos,
        draggable:true,
        title: "Kost Cewe Pandanaran"
    });

    var marker_pemuda = new google.maps.Marker({
        map: map,
        position: kost_pemuda,
        icon: icon_kos,
        draggable:true,
        title: "Kost Cewe Pandanaran"
    });



    var infoWindow = new google.maps.InfoWindow({
        content: "Current location"
    });

    marker.addListener("click", function() {
        infoWindow.open(map, marker);
        origin = marker.getPosition();
        //alert(origin);
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        $('#waypoints_start').append(results[1].formatted_address);
                        waypoints.push({
                        location: place.geometry.location,
                        stopover: true
                        });
                        //---------
                    }
                }
            });
    });

    marker_simpang_lima.addListener("click", function() {
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= kost_simpang_lima;
                        $('#places').append("<li class=\"list-group-item\">"+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: kost_simpang_lima,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            });            
        });

    marker_sisi_raja.addListener("click", function() {
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= kost_sisinga_raja;
                        $('#places').append("<li class=\"list-group-item\">"+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: kost_sisinga_raja,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            });            
        });

    marker_menoreh.addListener("click", function() {
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= kost_menoreh;
                        $('#places').append("<li class=\"list-group-item\">"+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: kost_menoreh,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            });            
        });

    marker_pandanaran.addListener("click", function() {
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= kost_pandanaran;
                        $('#places').append("<li class=\"list-group-item\">"+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: kost_pandanaran,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            });            
        });

    marker_pemuda.addListener("click", function() {
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= kost_pemuda;
                        $('#places').append("<li class=\"list-group-item\">"+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: kost_pemuda,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            });            
        });
    map.setCenter(origin);
}

function initDirections() {
    optimizeRoute();
}
function jalanfix(){    
map.setCenter(unika);
addMyMarker();
}
function addMyMarker() { //function that will add markers on button click
            var marker = new google.maps.Marker({
                position:unika,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"UNIKA",
              icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
            });

            var marker2 = new google.maps.Marker({
                position:sampokong,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"SAMPOKONG",
              icon: "http://maps.google.com/mapfiles/ms/micons/red.png"
            }); 
            origin = unika;
        //alert(origin);
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        $('#waypoints_start').append("Universitas Katolik Soegijapranata ");
                        waypoints.push({
                        location: place.geometry.location,
                        stopover: true
                        });
                        //---------
                    }
                }
            });
            //------------------------------------
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': sampokong }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= sampokong;
                        $('#places').append("<li class=\"list-group-item\">"+"Klenteng Sam Poo Kong "+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: sampokong,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            }); 
}

function addMyMarkerKaca() { //function that will add markers on button click
            var marker = new google.maps.Marker({
                position:sampokong,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"SAMPOKONG",
              icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
            });

            var marker2 = new google.maps.Marker({
                position:maerakaca_grand,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"MAERAKACA GRAND",
              icon: "http://maps.google.com/mapfiles/ms/micons/red.png"
            }); 
            origin = sampokong;
        //alert(origin);
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        $('#waypoints_start').append("SAMPOKONG LEGENDARY TEMPLE ");
                        waypoints.push({
                        location: place.geometry.location,
                        stopover: true
                        });
                        //---------
                    }
                }
            });
            //------------------------------------
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': maerakaca_grand }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= maerakaca_grand;
                        $('#places').append("<li class=\"list-group-item\">"+"GRAND MAERAKACA "+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: maerakaca_grand,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            }); 

            map.setCenter(sampokong);
}

function addMyMarkerSewu() { //function that will add markers on button click
            var marker = new google.maps.Marker({
                position:maerakaca_grand,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"GRAND MAERAKACA",
              icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
            });

            var marker2 = new google.maps.Marker({
                position:lawang_sewu,
                map: map,
                  draggable:true,
                  animation: google.maps.Animation.DROP,
                title:"MAERAKACA GRAND",
              icon: "http://maps.google.com/mapfiles/ms/micons/red.png"
            }); 
            origin = maerakaca_grand;
        //alert(origin);
        var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': origin }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        $('#waypoints_start').append("GRAND MAERAKACA");
                        waypoints.push({
                        location: place.geometry.location,
                        stopover: true
                        });
                        //---------
                    }
                }
            });
            //------------------------------------
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': lawang_sewu }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //alert("Location: " + results[1].formatted_address);
                        //---------
                        //$('#waypoints').append(results[1].formatted_address);
                        destinations[0]= lawang_sewu;
                        $('#places').append("<li class=\"list-group-item\">"+"MISTICAL LAWANG SEWU "+results[1].formatted_address+"</li>");
                        waypoints.push({
                        location: lawang_sewu,
                        stopover: true
                        });
                        check();                        
                        //---------
                    }
                }
            }); 

            map.setCenter(maerakaca_grand);
}

function optimizeRoute() {
    //var destinations = []; //komen dulu

    for (var i = 0; i < waypoints.length; i++) {
        destinations.push(waypoints[i].location);
    }

    var distanceService = new google.maps.DistanceMatrixService;

    distanceService.getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING'
    }, function(response, status) {
        console.log(response);
        if (status !== 'OK') {
            console.error(status);
        } else {
                var temp;
                var minw=0;
                $('#description').html("");
            for (var i = 0; i < response.destinationAddresses.length; i++)
            {
               console.log(response.rows[0].elements[i].distance.value);
              $('#description').append("<strong>"+response.rows[0].elements[i].duration.text+" ("+response.rows[0].elements[i].distance.text+")");
                for(var j=i+1;j<response.destinationAddresses.length;j++)
                {
                    console.log(response.rows[0].elements[i].distance.value>response.rows[0].elements[j].distance.value);
                    if(response.rows[0].elements[i].distance.value>response.rows[0].elements[j].distance.value)
                    {
                         console.log(minw);
                         temp=waypoints[minw];//c=a
                         waypoints[minw]=waypoints[j];//a=b
                         waypoints[j]=temp;//b=c
                         minw=j;
                    }
                }
            }

         console.log(waypoints);
          var request = {
          origin: origin,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: "DRIVING"
    };

    var directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
    });

    directionsDisplay.setMap(null);
    directionsService.route(request, function(response, status) {
        console.log(response);
        if (status == "OK") {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);

            var places = response.geocoded_waypoints;
            var route = response.routes[0].legs;
            distance =0;
            $('#listDir').html("");
            for (var i = 0; i < route.length; i++) {
                var summary ='Ambil Jl. '+route[i].start_address + ' lalu ke. ' + route[i].end_address;
                distance+=route[i]+distance
                $('#listDir').append("<li class=\"list-group-item\">"+summary+"</li>");
            }
        }
    });

        }
    });
}
