// define "myMap"
let myMap = L.map("map", {
  center: [40.4531, -111.5234],
  zoom: 5
});

    // Create the tile layer that will be the background of our map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

  
    let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    d3.json(url).then(function(response)  {
    
      console.log(response);
             
      // define a features array from the response object
      const quakeFeaturesArray = response.features.map(feat => feat);
      console.log(quakeFeaturesArray);
      
      quakeFeaturesArray.forEach(earthquake => {
        let location = earthquake;
      
        let color = "";
        if (location.geometry.coordinates[2] > 75) {
          color = "#FF4621";
        }
        else if (location.geometry.coordinates[2] > 35) {
          color = "#FE8022";
        }
        else if (location.geometry.coordinates[2] > 15) {
          color = "#FFB521";
        }
        else if (location.geometry.coordinates[2] > 10) {
          color = "#FDDE23";
        }
        else if (location.geometry.coordinates[2] > 5) {
          color = "#EEFE22";
        }
        else {
          color = "#22FE5C";
        }
        
        if(location) {
          L.circle([location.geometry.coordinates[1],location.geometry.coordinates[0]]
            ,{
            color:color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: location.properties.mag * 15000
          })
          .bindPopup("<h3> Latitude: " + location.geometry.coordinates[1]
            + "</h3> <hr> <h3>Longitude: " + location.geometry.coordinates[0]
            + "</h3> <hr> <h3>Place: " + location.properties.place
            + "</h3> <hr> <h3>Magnatude: " + location.properties.mag
            + "</h3> <hr> <h3>Depth: " + location.geometry.coordinates[2]
            + "</h3>")
          .addTo(myMap);
     }
      });
 
          // Set up the legend 
        /*Legend specific*/
          let legend = L.control({ position: "bottomleft" });

          legend.onAdd = function(map) {
            var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h4>Depth Range</h4>";
            div.innerHTML += '<i style="background: #22FE5C"></i><span> -5-5 </span><br>';
            div.innerHTML += '<i style="background: #EEFE22"></i><span> 5-10 </span><br>';
            div.innerHTML += '<i style="background: #FDDE23"></i><span> 10-15 </span><br>';
            div.innerHTML += '<i style="background: #FFB521"></i><span> 15-35 </span><br>';
            div.innerHTML += '<i style="background: #FE8022"></i><span> 35-75 </span><br>';
            div.innerHTML += '<i style="background: #FF4621"></i><span> 75+ </span><br>';
  
            return div;
          };

          legend.addTo(myMap);         
      
    });
     
      

    

  