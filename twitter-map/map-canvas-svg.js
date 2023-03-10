var viewportWidth = $(window).width();
var viewportHeight = $(window).height()/2;
var width = viewportWidth * 1;
var height = width/1.85;
var centered;
prefix = prefixMatch(["webkit", "ms", "Moz", "O"]);

d3.csv("tweets_drink.csv", function(error, dataset) { createMap(dataset) });

var tile = d3.geo.tile()
    .size([width, height]);



var projection = d3.geo.mercator()
      projection
      .scale([width/8])
      .translate([width/2.8, height/1.7]);  // just temporary

var zoom = d3.behavior.zoom()
 //   .scale(projection.scale() * 2 * Math.PI)
   .scaleExtent([1 << 11, 1 << 25])
    // .translate(projection([-73.975536, 40.691674]).map(function(x) { return -x; }))
    .scale([width])
     .translate([width/2, height/1.7])
    .on("zoom", zoomed);

var container = d3.select("#container")
      .style("width", width + "px")
      .style("height", height + "px")
     .call(zoom)
      .on("mousemove", mousemoved);
        
var base = d3.select('#map-canvas');

var chart = d3.select('canvas')
      .attr("class", "layer")
      .attr('width', width)
      .attr('height', height);


var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

var g = svg.append("g");

svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);



d3.json("world.json", function(error, world) {
  if (error) throw error;

  g.append("path")
      .datum({type: "Sphere"})
      .attr("class", "sphere")
      .attr("d", path);

  g.append("path")
      .datum(topojson.merge(world, world.objects.countries.geometries))
      .attr("class", "land")
      .attr("d", path);

  g.append("path")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);
});


d3.select(self.frameElement).style("height", height + "px");

var context = chart.node().getContext('2d');

var locations = d3.select('#points');

var layer = d3.select('.layer');

var info = base.append("div")
    .attr("class", "info");

zoomed();

function createMap(dataset) {
  
  var dataBinding = locations.selectAll("points.arc")
    .data(dataset)
  
      .enter()
      .append("points")
      .classed("arc", true)
      .attr("x", function(d) {return projection([d.lon,d.lat])[0]})
      .attr("y", function(d) {return projection([d.lon,d.lat])[1]})
      .attr("radius", 1)
      .attr("fillStyle", "#fff")
      .attr("strokeStyle", "#fff")
  drawCanvas();
}

function drawCanvas() {

  var elements = locations.selectAll("points.arc");
    elements.each(function(d) {
    var node = d3.select(this);
    
    context.beginPath();
    context.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2 * Math.PI);
    context.fillStyle = node.attr("fillStyle");
    context.fillStroke = node.attr("fillStroke");
    context.fill();
    context.closePath();
  })
}

function reDraw() {
  context.clearRect(0, 0, width, height);
  drawCanvas();
}

function zoomed() {
  var tiles = tile
      .scale(zoom.scale())
      .translate(zoom.translate())
      ()

 projection
      .scale(zoom.scale() / 2 / Math.PI)
      .translate(zoom.translate());

     g.selectAll("path")
      .attr("d", path);

       d3.selectAll("points.arc")
      .attr("x", function(d) {return projection([d.lon,d.lat])[0]})
      .attr("y", function(d) {return projection([d.lon,d.lat])[1]})
      reDraw(); 
}
   


      
  /*var image = layer
      .style(prefix + "transform", matrix3d(tiles.scale, tiles.translate))
    .selectAll(".tile")
      .data(tiles, function(d) { return d; });

  image.exit()
      .remove();

 /* image.enter().append("img")
      .attr("class", "tile")
      .attr("src", function(d) { return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".basemaps.cartocdn.com/light_all/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .style("left", function(d) { return (d[0] << 8) + "px"; })
      .style("top", function(d) { return (d[1] << 8) + "px"; });*/





function mousemoved() {
  info.text(formatLocation(projection.invert(d3.mouse(this)), zoom.scale()));
}

function matrix3d(scale, translate) {
  var k = scale / 256, r = scale % 1 ? Number : Math.round;
  return "matrix3d(" + [k, 0, 0, 0, 0, k, 0, 0, 0, 0, k, 0, r(translate[0] * scale), r(translate[1] * scale), 0, 1 ] + ")";
}

function prefixMatch(p) {
  var i = -1, n = p.length, s = document.body.style;
  while (++i < n) if (p[i] + "Transform" in s) return "-" + p[i].toLowerCase() + "-";
  return "";
}

function formatLocation(p, k) {
  var format = d3.format("." + Math.floor(Math.log(k) / 2 - 2) + "f");
  return (p[1] < 0 ? format(-p[1]) + " S" : format(p[1]) + " N") + " "
       + (p[0] < 0 ? format(-p[0]) + " W" : format(p[0]) + " E");
};

