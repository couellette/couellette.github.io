var viewportWidth = $(window).width();
var viewportHeight = $(window).height()/2;
var width = viewportWidth * .90;
var height = width/1.85;
var centered;

//Define map projection 
var projection = d3.geo.mercator()
      projection
      .scale([width/6.5])
      .translate([width/2.3, height/1.5]);      // scale things down so see entire US
        
// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
         .projection(projection)
           // tell path generator to use albersUsa projection

    
// Define linear scale for output
var color = d3.scale.linear()
        .range(["#D0D0D0", "#FFA100", "#FF8000","#FF5900"]);

var legendText = ["High Vulnerability State", "Mid Vulnerability State", "Low Vulnerability State", "Information Unavailable"];

//Create SVG element and append map to the SVG
var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

     
        
// Append Div for tooltip to SVG
var div = d3.select("#map")
        .append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

// Load in my states data!
d3.csv("states.csv", function(data) {
color.domain([0,1,2,3]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("world.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

    
// Bind the data to the SVG and create one path per GeoJSON feature


    var g = svg.append("g");



     
// Map the areas with vulnerability issues
d3.csv("tweets_drink.csv", function(data) {

g.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return projection([d.lon, d.lat])[0];
  })
  .attr("cy", function(d) {
    return projection([d.lon, d.lat])[1];
  })
.attr("r", function(d) {
    return Math.sqrt(d.size) * 2;
  })
    .style("fill", "rgba (0,0,0, .7)") 
    .style("stroke", "white") 
    .style("stroke-width","2px")
    .style("opacity", 0.85) 

  // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
  // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
  .on("mouseover", function(d) {      
      div.transition()        
           .duration(200)      
           .style("opacity", .9);      
           div.html("<br />" + d.comment + "<p>")
           .style("left", (d3.event.pageX) -  320 + "px")     
           .style("top", (d3.event.pageY - 8) + "px");    
  })   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.transition()        
           .duration(4500)      
           .style("opacity", 0);   
    });

 d3.select("#ip").append("div")
          .selectAll("div")
          .data(data)
          .enter()
          .append("div")
          .text(function(d) { return d.comment; });

              d3.select("#type").append("div")
          .selectAll("div")
          .data(data)
          .enter()

          .append("div")
          .html(function(d) { return  d.comment + "<p>" });



});  

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });


  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

d3.select(window).on('resize', resize);

function resize() {
  
    width = parseInt(d3.select('#map').style('width'));
    width = $(window).width() * .90;
    height = width/1.85;
  
   projection
      .scale([width/6.5])
      .translate([width/2.3, height/1.5]); 
    
   d3.select("#map").attr("width",width).attr("height",height);
   d3.select("svg").attr("width",width).attr("height",height);
  
   d3.selectAll("path").attr('d', path)
   d3.selectAll("circle").attr("cy", function(d) {
    return projection([d.lon, d.lat])[1];
  })
   d3.selectAll("circle").attr("cx", function(d) {
    return projection([d.lon, d.lat])[0];
  })
 
 

};
 


// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
var legend = d3.select("#map").append("svg")
            .attr("class", "legend")
          .attr("width", 140)
          .attr("height", 200)
          .selectAll("g")
          .data(color.domain().slice().reverse())
          .enter()
          .append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .data(legendText)
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d) { return d; });
  });
d3.select("#change").on("click", function() {
  projection = d3.geo.albers();
path.projection(projection);
svg.transition()
      .duration(10000)
      .attr("d", path);
});

