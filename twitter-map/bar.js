var margin = {
    top: 70,
    left: 45,
    right: 20,
    bottom: 50
}

if ($(window).width() < 768) {
   height = 270 - margin.top - margin.bottom
width = ($(window).width()/2) - margin.left - margin.right
}
else {
   height = 370 - margin.top - margin.bottom
width = 300 - margin.left - margin.right
}
var totalTweets = 0;

var Barsvg = d3.select("#bar").append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g") //investigate the effects of removing this
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//xAxis
var xScale = d3.scale.ordinal()
    .rangeRoundBands([width, 0], .1);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yScale = d3.scale.linear()
    .range([height, 0])

var yAxis = d3.svg.axis()
    .scale(yScale)
    .innerTickSize(-width)
    .outerTickSize(0)
    .ticks(5)
    .tickPadding(10)
    .orient("left")
    //we use Tickformat to round our high numbers accordingly
    .tickFormat(function(d) {
        if ((d / 100000000) >= 1) {
            d = d / 1000000000
        }
        return d;
    });
var tip = d3.tip()
    .attr("class", "d3-tip")
    .html(function(d) {
        return "<strong>" + d.city + "</strong> <span style='color:red'>" + d.tweets + "</span>";
    });

Barsvg.call(tip);

d3.tsv("ux-july-utf.tsv", function(err, data) {
    //  console.log(data[0], getLL(data[0]), project(data[0]))
    var cityCount = d3.nest()
        .key(function(d) {
            return d.place_full_name;
        })
        .rollup(function(v) {
            return v.length;
        })
        .entries(data);









    cityCount.forEach(function(d) {
        d.city = d.key;
        d.tweets = d.values;
        totalTweets += d.values;
        delete d["key"];
        delete d["values"];
    });


    var cityOrder = cityCount.sort(function(a, b) {
        return b.tweets - a.tweets
    }).slice(0, 5);



    //if you want to just keep top thre

    xScale.domain(cityOrder.map(function(d) {
        return d.city;
    }));
    yScale.domain([0, d3.max(cityOrder, function(d) {
        return d.tweets;
    })]);

    //xAxis
    Barsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-35)");
    //yAxis
    Barsvg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    //x axis label
    Barsvg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        //	.text("Location");

    //y axis label
    Barsvg.append("text")
        .attr("transform", "rotate(-90)")
        //NOTE - we actually rotate our reference point by 90 degrees
        //http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html gives more detail
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        //     .text("Number of Tweets");

    //title
    Barsvg.append("g")
        .attr("class", "title")
        .append("text")
        .attr("x", width / 2)
        .attr("y", (margin.top / 2))
        .attr("text-anchor", "middle")
        //.text("Internet users over time")

    Barsvg.selectAll(".bar")
        .data(cityOrder)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return xScale(d.city);
        })
        .attr("height", function(d) {
            return height - yScale(d.tweets);
        })
        .attr("y", function(d) {
            return yScale(d.tweets);
        })
        .attr("width", xScale.rangeBand())
        //show and hide tooltip
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);
});

function type(cityOrder) {
    cityOrder.tweets = cityOrder.tweets;
    return cityOrder;
}