var margin = { 
	top: 30,
	left: 65,
	right: 20,
	bottom: 50
}
height = 400 - margin.top - margin.bottom
width = 300 - margin.left - margin.right

var Barsvg = d3.select("#bar").append("svg")
			.attr("height", height + margin.top + margin.bottom)
			.attr("width", width + margin.left + margin.right)
			.append("g") //investigate the effects of removing this
   			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scale.ordinal()
    .range(["#FF8000", "#0099C4", "#DC0A0A" ])
    .domain(["neutral", "positive", "negative"]);
//xAxis
var stack = d3.layout
    .stack(); // default view is "zero" for the count display.


var xScale = d3.scale.ordinal()
		.rangeRoundBands([width,0], .1);
				
var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
			
var yScale = d3.scale.linear()
		.range([height,0])
				
var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		//we use Tickformat to round our high numbers accordingly
		.tickFormat(function(d) {
			if ( (d/100000000) >= 1 ) {
				d = d/1000000000
			}
			return d;
		});
var tip = d3.tip()
		.attr("class","d3-tip")
		.html(function (d) {
			return "<strong>"+ d.key +"</strong> <span style='color:red'>" + d.values + "</span>";
		});

Barsvg.call(tip);		

d3.csv("ux-july.csv", function(err, data) {
    //  console.log(data[0], getLL(data[0]), project(data[0]))
console.log(data)
	var cityCount = d3.nest()
	  .key(function(d) { return d.place_full_name; })
	  .rollup(function(v) { return v.length; })
	  .entries(data);


	var cityOrder = cityCount.sort(function(a,b){return b.values - a.values }).slice(0, 7);




	 //if you want to just keep top thre
	console.log(cityOrder);

	xScale.domain(cityOrder.map(function(d) {return d.key;})); 
	yScale.domain([0, d3.max(cityOrder, function(d) { return d.values; } )]);
	
	//xAxis
	Barsvg.append("g")
		.attr("class","x axis")
		.attr("transform", "translate(0," + height + ")") 
		.call(xAxis)			
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-35)");
	//yAxis
	Barsvg.append("g")
		.attr("class","y axis")
		.call(yAxis);
	
	//x axis label
	Barsvg.append("text")
		.attr("x", width/2)
		.attr("y", height + margin.bottom)
		.text("Year");
	
	//y axis label
	Barsvg.append("text")
        .attr("transform", "rotate(-90)")
		//NOTE - we actually rotate our reference point by 90 degrees
		//http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html gives more detail
	.attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Users (billions)");

	//title
	Barsvg.append("g")
	.attr("class","title")
	.append("text")
	.attr("x", width/2)
	.attr("y", (margin.top / 2))
	.attr("text-anchor", "middle")
	.text("Internet users over time")

	Barsvg.selectAll(".bar")
	.data(cityOrder)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("x", function(d) {return xScale(d.key);})
	.attr("height", function (d) {return height - yScale(d.values);  })
	.attr("y", function(d) {return yScale(d.values); })	
	.attr("width",xScale.rangeBand())
	//show and hide tooltip
	.on("mouseover", tip.show)
	.on("mouseout", tip.hide) ;	
});
function type(cityOrder) {
		cityOrder.values.count = cityOrder.values.count;
		return cityOrder;
	}