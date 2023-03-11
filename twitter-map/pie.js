


if ($(window).width() < 768) {
var width = $(window).width()/2.2,
    height = $(window).width()/2.2,
    radius = Math.min(width, height) / 1.9;
}
else {
var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;
}

var totalAmount = 0;
var circleGraph;
var circlePath;

var color = d3.scale.ordinal()
    .range(["#FF8000", "#0099C4", "#DC0A0A" ])
    .domain(["neutral", "positive", "negative"]);
  
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.amount; });

var Piesvg = d3.select("#pie").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.tsv("ux-july-utf.tsv", function(err, data) {
    //  console.log(data[0], getLL(data[0]), project(data[0]))
  var sentimentCount = d3.nest()
    .key(function(d) { return d.sentiment; })
    .rollup(function(v) { return v.length; })
    .entries(data);




sentimentCount.forEach(function(d) {
    d.sentiment = d.key;
    d.amount = d.values;
    totalAmount += d.values;
    delete d["key"];
    delete d["values"];
  });
  //console.log("nested", nested);

  circleGraph = Piesvg.selectAll("path")
      .data(pie(sentimentCount)).enter()
  .append("path")
      .attr("d", arc)
      .style("fill", function(d) {  return color(d.data.sentiment); })
      .each(function(d) { this._current = d; });

  circleGraph.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.sentiment; });

});

function type(d) {
  d.amount = +d.amount;
  return d;
}
