mapboxgl.accessToken = 'pk.eyJ1IjoiY291ZWxsZXR0ZSIsImEiOiJjajBrMHVmZW4wMXllMnFtZW9weDhuancwIn0.vSIlhzkgSsNyGQMz5C28iw';

var bounds = [
    [-134.56, 27.25], // Southwest coordinates
    [ -61.17,  57.11]  // Northeast coordinates
];


var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //hosted style id
    center: [0, 8], // starting position
    zoom: 2,
  // maxBounds: bounds // Sets bounds as max
    })
    map.dragPan.enable();
    map.scrollZoom.enable();
    
    // Setup our svg layer that we can manipulate with d3
    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")

// the 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function() {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            },
            'fill-extrusion-opacity': .6
        }
    });
});




var div = d3.select("#map")
        .append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);


//City Filters 
document.getElementById('pune').addEventListener('click', function() {
    map.fitBounds([[
       -123.22,
        49.19
    ], [
        -123.02,
        49.31
    ]]);
});

document.getElementById('waterloo').addEventListener('click', function() {
    map.fitBounds([[
       -80.62,
        43.30
    ], [
        -80.29,
        43.53
    ]]);
});

document.getElementById('toronto').addEventListener('click', function() {
    map.fitBounds([[
       -79.86,
        43.47
    ], [
        -79.12,
        43.93
    ]]);
});


  var colorCat = "sentiment";

   var circleColor = d3.scale.ordinal()
      .range(["#0099C4", "#FF8000","#DC0A0A" ]);  


    var active = true;
    var circleControl = new circleSelector(svg)
      .projection(project)
 
      .activate(active);
    
    d3.select("#circle").on("click", function() {
      active = !active;
      circleControl.activate(active)
      if(active) {
        map.dragPan.enable();
      } else {
        map.dragPan.enable();
      }
      d3.select(this).classed("active", active)
    })
    
    // Add zoom and rotation controls to the map.
  //map.addControl(new mapboxgl.Navigation());
    
    function project(d) {
      return map.project(getLL(d));
    }
    function getLL(d) {
      return new mapboxgl.LngLat(+d.lng, +d.lat)
    }
  

 var dropDown = d3.select("#filter")
               .attr("class","chartSelector")
                    .attr("id", "filter")
                    .attr("sentiment", "sentiment-list");

    //Variable to hold autocomplete options
    var keys;

    d3.csv("amir.csv", function(err, data) {
      console.log(data[0], getLL(data[0]), project(data[0]))
      var dots = svg.selectAll("circle.dot")
        .data(data)
 keys=data;
        start();

  var options = dropDown.selectAll("option")
           .data([{sentiment:"All"}].concat(data)) 
         .enter()
         //  .append("option");
      //     options.text(function (d) { return d.sentiment; })
       //.attr("value", function (d) { return d.sentiment; });



  dropDown.on("change", function() {
      var selected = document.getElementById("filter").value;
      displayOthers = document.getElementById("filter").checked ? "inline" : "none";
      display = document.getElementById("filter").checked ? "none" : "inline";

      if(selected == 'All'){
        svg.selectAll(".dot")
            .attr("display", display);
      }
      else{
        svg.selectAll(".dot")
            .filter(function(d) {return selected != d.sentiment;})
            .attr("display", displayOthers);
            
        svg.selectAll(".dot")
            .filter(function(d) {return selected == d.sentiment;})
            .attr("display", display);
      }
  });
      
      dots.enter().append("circle").classed("dot", true)
      .attr("r", 1)
      .style("fill", function(d) { return circleColor(d[colorCat]); })
  .on("mouseover", function(d) {      
      div.transition()        
           .duration(200)      
           .style("opacity", .9)
           div.html("<br />" + "<div class='twitter-profile'><img width='200px' height='200px' src="+d.img+">" + "<p>" +"<span class='twitter-username'>"+ d.city+"</span>" + "<p>"+"<span class='twitter-text'>Number of citations:"  + d.citation +"</span>" +  "<p></div>")
          .style("left", (d3.event.pageX) -  10 + "px")     
           .style("top", (d3.event.pageY - 8) + "px");    
  })   


      .transition().duration(1000)
//      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
.attr("r", function (d) { return d.duration * 1.5; })
       //.attr("r", function(d) { return d.user_followers_count / 15000 * 2 + 3})
 
var timeline = d3.select("#timeline")
.classed("times", true)
          .selectAll("div")
          .data(data)
          .enter()
       

                   // .attr("transform", function(d, i) { return "translate("+d.order+ ",0)"; });



timeline.append("div") 
.attr("class", "country")
.html(function(d) {return d.city + ": " + d.duration + " year(s)"})         
.style("width", function(d, i) {return d.duration * 29.9 + 120 + "px"} )
.style("height",35+ "px")
.style("background", circleColor)
 


// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
var legend = d3.select("#legend").append("svg")
            .attr("class", "legend")
          .attr("width", 140)
          .attr("height", 200)
          .selectAll("g")
          .data(d3.map(data, function(d){return d.sentiment;}).keys())
          .enter()
          .append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", circleColor);

    legend.append("text")
          .data(d3.map(data, function(d){return d.sentiment;}).keys())
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d) { return d; });


 

      circleControl.on("clear", function() {
        svg.selectAll("circle.dot").style("fill", "#0082a3")
      })
      


    //Call back for when user selects an option
    function onSelect(d) {
                  div.html("<br />" + "<div class='twitter-profile'><img width='300px' height='300px' src="+d.user_profile_image_url+">" + "<p>" +"<span class='twitter-username'>"+ d.user_name+"</span>" + "<p>"+"<span class='twitter-text'>"  + d.text +"</span>" +  "<p>" + "<div class='twitter-influence-container'>Followers:" + "<p>" +"<div class='twitter-influence'><br />" + d.user_followers_count + "</div>" + "Following:" + "<div class='twitter-influence'><br />" + d.user_friends_count + "</div>" + "</div>" + "</div>")
dots.data(function(d) {return d.text;})
    }

    //Setup and render the autocomplete
    function start() {
        var mc = autocomplete(document.getElementById('test'))
                .keys(keys)
                .dataField("text")
                .placeHolder("Search Tweets - Start typing here")
                .width(960)
                .height(500)
                .onSelected(onSelect)
                .render();
    }


 // when the input range changes update the rectangle 




      function render() {
        dots.attr({
          cx: function(d) { 
            var x = project(d).x;
            return x
          },
          cy: function(d) { 
            var y = project(d).y;
            return y
          },
        })
        
        circleControl.update(svg)
      }

      // re-render our visualization whenever the view changes
      map.on("viewreset", function() {
        render()
      })
      map.on("move", function() {
        render()
      })

      // render our initial visualization
      render()
    })