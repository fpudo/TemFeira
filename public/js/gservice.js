// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
  .factory('gservice', function($http){

    // Start Variables
    // ===============================
    // Service our factory will return
    var googleMapService = {};
    // Array of Locations obtained from API calls
    var locations = [];
    // Selected Location (Initialize to center of Brazil)
    var selectedLat = -16.333333;
    var selectedLong = -48.966667;

    // Functions
    // ===============================
    // Refresh the Map with new data. Function will take new lat and long coordinates.
    googleMapService.refresh = function(latitude, longitude){
      // Clear the holding array of locations
      locations = [];
      // Set the selected lat and long equal to the ones provided on the refresh() calls
      selectedLat = latitude;
      selectedLong = longitude;
      // Perform an AJAX call to get all of the records in the db.
      $http.get('/feira').success(function(response){
        // Convert the results into google Map format
        locations = convertToMapPoints(response);
        // Then Initialize the Map
        initialize(latitude, longitude);
      }).error(function(){});
    };

    // Private Innner Functions
    // ===============================
    // Convert a JSON of feiras into map points
    var convertToMapPoints = function(response){
      // Clear the locations holder
      var locations = [];
      // Loop through all of the JSON entries provided in the response
      for (var i = 0; i < response.length; i++) {
        var feira = response[i];
        // Create popup windows for each record
        var contentString =
          '<p><b>Nome</b>: ' + feira.nomefeira +
          '<br><b>Endereço</b>: ' + feira.rua + ', ' + feira.numero +
          '<br><b>Bairo</b>: ' + feira.bairro +
          '<br><b>Cidade</b>: ' + feira.cidade +
          '<br><b>CEP</b>: ' + feira.cep +
          '<br><b>Horário</b>:' + feira.horarioinicio + ' / ' + feira.horariotermino +
          '</p>';
        // Converts each of the JSON records into Google Maps Location format(Note [Lat, Lng] format).
        locations.push({
          latlon: new google.maps.LatLng(feira.location[1], feira.location[0]),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
          }),
          nomefeira: feira.nomefeira,
          rua: feira.rua,
          numero: feira.numero,
          bairro: feira.bairro,
          cidade: feira.cidade,
          cep: feira.cep,
          horarioinicio: feira.horarioinicio,
          horariotermino: feira.horariotermino
        });
      }
      // location is now an array populated with records in Google Maps format
      return locations;
    };

    // Initialize the map.
    var initialize = function(latitude, longitude){
      // Uses the selected lat, long as starting point
      var myLatLng = {lat: selectedLat, lng: selectedLong};
      // If map has not been created already.
      if(!map){
        // Create new Map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'),{
          zoom: 3,
          center: myLatLng
        });
      }
      // Loop through each location in the array and place a marker
      locations.foreach(function(n, i){
        var marker = new google.maps.Marker({
          position: n.latlon,
          map: map,
          title: "Big Map",
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Lembrar da virgula
        });
        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', functions(e){
          // When clicked, open the selected marker's message
          currentSelectedMarker = n;
          n.message.open(map, marker);
        });
      });
      // Set initial location as a bouncind red marker
      var initialLocation = new google.maps.LatLng(latitude, longitude);
      var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });
      lastMarker = marker;
    };
    // Refresh the page upon window load. Use the initial latitude and longitude
    google.maps.event.addDomListener(window, 'load',
        googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
  });
