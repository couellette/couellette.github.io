mapboxgl.accessToken = 'pk.eyJ1IjoiY291ZWxsZXR0ZSIsImEiOiJjajBrMHVmZW4wMXllMnFtZW9weDhuancwIn0.vSIlhzkgSsNyGQMz5C28iw';

var Americas = [
    [-135.0,12.2], // Southwest coordinates
    [-54.1,55.2] // Northeast coordinates
];

document.getElementById('reset-zoom').addEventListener('click', function() {
    map.fitBounds([ [-135.0,12.2], // Southwest coordinates
    [-54.1,55.2] ]);
    
});




var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //hosted style id
    center: [10, 5], // starting position
    zoom: 0,
    maxBounds: Americas // Sets bounds as max
})
map.dragPan.enable();
map.scrollZoom.enable();



var zoomThreshold = 4;

map.on('load', function() {

/*    map.addSource('population', {
        'type': 'vector',
        'url': 'mapbox://mapbox.660ui7x6'
    });

    map.addLayer({
        'id': 'state-population',
        'source': 'population',
        'source-layer': 'state_county_population_2014_cen',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'filter': ['==', 'isState', true],
        'paint': {
            'fill-color': {
                property: 'population',
                stops: [
                    [0, '#000000'],
                    [500000, '#252525'],
                    [750000, '#525252'],
                    [1000000, '#737373'],
                    [2500000, '#969696'],
                    [5000000, '#bdbdbd'],
                    [7500000, '#d9d9d9'],
                    [10000000, '#f0f0f0'],
                    [25000000, '#ffffff']
                ]
            },


            'fill-opacity': 0.75
        }
    }, 'waterway-label');

    map.addLayer({
        'id': 'county-population',
        'source': 'population',
        'source-layer': 'state_county_population_2014_cen',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'filter': ['==', 'isCounty', true],
        'paint': {
            'fill-color': {
                property: 'population',
                stops: [
                    [0, '#000000'],
                    [500000, '#252525'],
                    [750000, '#525252'],
                    [1000000, '#737373'],
                    [2500000, '#969696'],
                    [5000000, '#bdbdbd'],
                    [7500000, '#d9d9d9'],
                    [10000000, '#f0f0f0'],
                    [25000000, '#ffffff']
                ]
            },
            'fill-opacity': 0.75
        }
    }, 'waterway-label');
*/

var container = map.getCanvasContainer()
var svg = d3.select(container).append("svg")



// the 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
/*map.on('load', function() {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#0099c4',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            },
            'fill-extrusion-opacity': .9
        }
    });
});

*/


var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")

var tweetFeed = d3.select("body")
    .append("div")
    .attr("class", "tooltip2")    
   // .style("opacity", 0);

var isAtStart = true;

//City Filters 



var colorCat = "sentiment";

var circleColor = d3.scale.ordinal()
    .range(["#FF8000", "#0099C4", "#DC0A0A" ])
    .domain(["neutral", "positive", "negative"]);



d3.select("#circle").on("click", function() {
    active = !active;
    circleControl.activate(active)
    if (active) {
        map.dragPan.enable();
    } else {
        map.dragPan.enable();
    }
    d3.select(this).classed("active", active)
})

// Add zoom and rotation controls to the map.
//map.addControl(new mapboxgl.Navigation());



var dayFilter = d3.select("#dayFilter")
    .attr("class", "ui-slider-handle")
    .attr("id", "dayFilter")


var dropDown = d3.select("#filter")

.attr("id", "filter")
    .attr("sentiment", "sentiment-list");

//Variable to hold autocomplete options
var keys;



d3.tsv("ux-july-utf.tsv", function(err, data) {
    //  console.log(data[0], getLL(data[0]), project(data[0]))


var active = false;
var circleControl = new circleSelector(svg)
    .projection(project)

.activate(active);
function project(d) {
    return map.project(getLL(d));
}

function getLL(d) {
    return new mapboxgl.LngLat(+d.lng, +d.lat)
}

    var dots = svg.selectAll("circle.dot")
        .data(data)
    keys = data;
    start();

    var options = dropDown.selectAll("option")
        .data([{
            sentiment: "All"
        }].concat(data))
        .enter()
        //  .append("option");
        //     options.text(function (d) { return d.sentiment; })
        //.attr("value", function (d) { return d.sentiment; });

   



    dots.enter().append("circle").classed("dot", true)
        .attr("id", "tweets")
        .attr("r", 1)
        .style("fill", function(d) {
            return circleColor(d[colorCat]);
        })
        .style("stroke", function(d) {
            return circleColor(d[colorCat]);
        })
        .on("mouseover", function(d) {
            div.attr("id", "boop")
            div.html("<br />" + "<div class='twitter-profile'><img width='50px' height='50px' style='background-size:cover;background-image:url(" + d.user_profile_image_url + ")'>" + "<p>" + "<span class='twitter-username'>" + d.user_name + "</span>" + "<p>" + "<span class='twitter-location'>" + d.user_location + "</span>" + "<p>" + "<span class='twitter-text'>" + d.text + "</span>" + "<p>" + "<div class='twitter-influence-container'>Followers:" + "<p>" + "<div class='twitter-influence'><br />" + d.user_followers_count + "</div>" + "Following:" + "<div class='twitter-influence'><br />" + d.user_friends_count + "</div>"  + "Date:" + "<div style='font-size:13px!important; margin-top:6px' class='twitter-influence'><br />" + d.day + "</div>"  + "<div class='senti'>Sentiment:" + "<div style='font-size:13px!important; margin-top:6px' class='twitter-influence'><br />" + d.sentiment + "</div></div>" + "</div>" + "</div>")
                 .style("left", (d3.event.pageX) -  260 + "px")     
              .style("top", (d3.event.pageY + 18) + "px");    



        })
   // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.attr("id", "boop2")  


    })


    .transition().duration(1000)
        //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
        .attr("r", function(d) {
            return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
        })
        //.attr("r", function(d) { return d.user_followers_count / 15000 * 2 + 3})




    // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
    var legend = d3.select("#legend").append("svg")
        .attr("class", "legend")
        .attr("width", 140)
        .attr("height", 200)
        .selectAll("g")
        .data(d3.map(data, function(d) {
            return d.sentiment;
        }).keys())
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("opacity", .8)
        .style("fill", circleColor);

    legend.append("text")
        .data(d3.map(data, function(d) {
            return d.sentiment;
        }).keys())
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) {
            return d;
        });




    circleControl.on("clear", function() {
        svg.selectAll("circle.dot").style("fill", "#0082a3")
    })

    var dataNested = d3.nest()
        .key(function(d) {
            return d.day;
        })
        .entries(data)

    d3.select('#dayFilter')
        .attr("class", "ui-slider-handle")
        .on('change', change)
        .selectAll('option')
        .data(dataNested)
        .enter()
        .append('option')
        .attr('value', function(d) {
            return d.key
        })
        .text(function(d) {
            return d.key
        })

    var dataFiltered = dataNested.filter(function(d) {
        return d.key === 'All'
    })


$(function() {        
         $('#testw').click(function() {




    $('#filter').val('All').trigger('change');

    $('#dayFilter').val('Tue Mar 21').trigger('change');


 svg.selectAll(".dot")
            .attr("display", "inline")
            .attr("r", 1)
             .transition().duration(1000)
        //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
        .attr("r", function(d) {
            return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
        })
        //.attr("r", function(d) { return d.user_followers_count / 15000 * 2 + 3})



        svg.selectAll(".dot")
            .filter(function(d) {
                return data.indexOf(d) < 0
            })
            .attr("display", "none");


totalValue = 0;

        var pieRedraw = d3.nest()
            .key(function(d) {
                return d.sentiment;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(data);
        pieRedraw.total = 0;

        if (pieRedraw.length < 3) {

        }
        pieRedraw.forEach(function(d) {
            d.sentiment = d.key;
            d.amount = d.values;
            totalValue += d.values;
            pieRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });

        circleGraph.data(pie(pieRedraw));

        circleGraph.transition().duration(750).attrTween("d", arcTween).style("fill", function(d) {
            return color(d.data.sentiment);
        });

        totalTweets = 0;


        var barRedraw = d3.nest()
            .key(function(d) {
                return d.place_full_name;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(data);
        barRedraw.total = 0;

        if (barRedraw.length < 3) {

        }


        barRedraw.forEach(function(d) {
            d.city = d.key;
            d.tweets = d.values;
            totalTweets += d.values;
            barRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });



        var NewCity = barRedraw.sort(function(a, b) {
            return b.tweets - a.tweets
        }).slice(0, 5);

        xScale.domain(NewCity.map(function(d) {
            return d.city;
        }));
        yScale.domain([0, d3.max(NewCity, function(d) {
            return d.tweets;
        })]);

        Barsvg.selectAll("g.y.axis")
            .transition()
            .duration(750)
            .call(yAxis);

        Barsvg.selectAll("g.x.axis")
            .transition()
            .duration(750)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        Barsvg.selectAll(".bar")
            .data(NewCity)
            .transition()
            .duration(750)
            .attr("height", function(d) {
                return height - yScale(d.tweets);
            })
            .attr("y", function(d) {
                return yScale(d.tweets);
            })


}); 
});



  function Sentchange() {
 var selected = document.getElementById("filter").value;
    $('#dayFilter').val('Tue Mar 21').trigger('change');

        var value = this.value
        dataFiltered2 = dataNested2.filter(function(d) {
            return d.key === value
        })



        if (selected == 'All') {
            svg.selectAll(".dot")
                .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
                .attr("display", "inline");


  var value = this.value
        dataFiltered = dataNested.filter(function(d) {
            return d.key === value
        })

        totalTweets = 0;


        var barRedraw = d3.nest()
            .key(function(d) {
                return d.place_full_name;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(data);
        barRedraw.total = 0;

        if (barRedraw.length < 3) {

        }


        barRedraw.forEach(function(d) {
            d.city = d.key;
            d.tweets = d.values;
            totalTweets += d.values;
            barRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });



        var NewCity = barRedraw.sort(function(a, b) {
            return b.tweets - a.tweets
        }).slice(0, 5);

        xScale.domain(NewCity.map(function(d) {
            return d.city;
        }));
        yScale.domain([0, d3.max(NewCity, function(d) {
            return d.tweets;
        })]);

        Barsvg.selectAll("g.y.axis")
            .transition()
            .duration(750)
            .call(yAxis);

        Barsvg.selectAll("g.x.axis")
            .transition()
            .duration(750)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        Barsvg.selectAll(".bar")
            .data(NewCity)
            .transition()
            .duration(750)
            .attr("height", function(d) {
                return height - yScale(d.tweets);
            })
            .attr("y", function(d) {
                return yScale(d.tweets);
            })


  totalValue = 0;

        var pieRedraw = d3.nest()
            .key(function(d) {
                return d.sentiment;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(data);
        pieRedraw.total = 0;

        if (pieRedraw.length < 3) {

        }
        pieRedraw.forEach(function(d) {
            d.sentiment = d.key;
            d.amount = d.values;
            totalValue += d.values;
            pieRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });

        circleGraph.data(pie(pieRedraw));

        circleGraph.transition().duration(750).attrTween("d", arcTween).style("fill", function(d) {
            return color(d.data.sentiment);
        });

    

        } else {
        svg.selectAll(".dot")
          .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
            .attr("display", "inline");

        svg.selectAll(".dot")
            .filter(function(d) {
                return dataFiltered2[0].values.indexOf(d) < 0
            })
             .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
            .attr("display", "none");
        }



       

$(function() {        
         $('#neutral').click(function() {
    $('#pie path').css('fill', '#FF8000');
}); 
});
$(function() {        
         $('#positive').click(function() {
    $('#pie path').css('fill', '#0099C4');
}); 
});
$(function() {        
         $('#negative').click(function() {
    $('#pie path').css('fill', '#DC0A0A');
}); 
});




///

        var value = this.value
        dataFiltered = dataNested.filter(function(d) {
            return d.key === value
        })

        totalTweets = 0;


        var barRedraw = d3.nest()
            .key(function(d) {
                return d.place_full_name;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(dataFiltered2[0].values);
        barRedraw.total = 0;

        if (barRedraw.length < 3) {

        }


        barRedraw.forEach(function(d) {
            d.city = d.key;
            d.tweets = d.values;
            totalTweets += d.values;
            barRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });



        var NewCity = barRedraw.sort(function(a, b) {
            return b.tweets - a.tweets
        }).slice(0, 5);

        xScale.domain(NewCity.map(function(d) {
            return d.city;
        }));
        yScale.domain([0, d3.max(NewCity, function(d) {
            return d.tweets;
        })]);

        Barsvg.selectAll("g.y.axis")
            .transition()
            .duration(750)
            .call(yAxis);

        Barsvg.selectAll("g.x.axis")
            .transition()
            .duration(750)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        Barsvg.selectAll(".bar")
            .data(NewCity)
            .transition()
            .duration(750)
            .attr("height", function(d) {
                return height - yScale(d.tweets);
            })
            .attr("y", function(d) {
                return yScale(d.tweets);
            })



    }



    function change() {

  $('#filter').val('All').trigger('change');
        var value = this.value
        dataFiltered = dataNested.filter(function(d) {
            return d.key === value
        })

         svg.selectAll(".dot")
          .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
            .attr("display", "inline");

        svg.selectAll(".dot")
            .filter(function(d) {
                return dataFiltered[0].values.indexOf(d) < 0
            })
             .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
            .attr("display", "none");



        totalValue = 0;

        var pieRedraw = d3.nest()
            .key(function(d) {
                return d.sentiment;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(dataFiltered[0].values);
        pieRedraw.total = 0;

        if (pieRedraw.length < 3) {

        }
        pieRedraw.forEach(function(d) {
            d.sentiment = d.key;
            d.amount = d.values;
            totalValue += d.values;
            pieRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });

        circleGraph.data(pie(pieRedraw));

        circleGraph.transition().duration(750).attrTween("d", arcTween).style("fill", function(d) {
            return color(d.data.sentiment);
        });




        var value = this.value
        dataFiltered = dataNested.filter(function(d) {
            return d.key === value
        })

        totalTweets = 0;


        var barRedraw = d3.nest()
            .key(function(d) {
                return d.place_full_name;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(dataFiltered[0].values);
        barRedraw.total = 0;

        if (barRedraw.length < 3) {

        }


        barRedraw.forEach(function(d) {
            d.city = d.key;
            d.tweets = d.values;
            totalTweets += d.values;
            barRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });



        var NewCity = barRedraw.sort(function(a, b) {
            return b.tweets - a.tweets
        }).slice(0, 5);

        xScale.domain(NewCity.map(function(d) {
            return d.city;
        }));
        yScale.domain([0, d3.max(NewCity, function(d) {
            return d.tweets;
        })]);

        Barsvg.selectAll("g.y.axis")
            .transition()
            .duration(750)
            .call(yAxis);

        Barsvg.selectAll("g.x.axis")
            .transition()
            .duration(750)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        Barsvg.selectAll(".bar")
            .data(NewCity)
            .transition()
            .duration(750)
            .attr("height", function(d) {
                return height - yScale(d.tweets);
            })
            .attr("y", function(d) {
                return yScale(d.tweets);
            })



    }

    function arcTween(a) {

        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }


 var dataNested2 = d3.nest()
        .key(function(d) {
            return d.sentiment;
        })
        .entries(data)

    d3.select('#filter')
        .attr("class", "ui-slider-handle")
        .on('change', Sentchange)
        .selectAll('option')
        .data(dataNested2)
        .enter()
      //  .append('option')
      /*  .attr('value', function(d) {
            return d.key
        })
        .text(function(d) {
            return d.key
        })*/

    var dataFiltered = dataNested.filter(function(d) {
        return d.key === 'All'
    })

  

    //Call back for when user selects an option
    function onSelect(data) {
          // depending on whether we're currently at point a or b, aim for
    // point a or b
   /* var target = isAtStart ? [data.lng,
        data.lat
    ] : start;

    // and now we're at the opposite point
    isAtStart = !isAtStart;*/

    map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: [data.lng,
        data.lat
    ],
        zoom: 10,
     //   pitch: 70,
    //    bearing: -17.6,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 3, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function(t) {
            return t;
        }
    });
    tweetFeed
                .attr("id", "boop")   
        tweetFeed.html("<br />" + "<div class='twitter-profile-search'><img  style='background-image:url(" + data.user_profile_image_url + ")'>" + "<p>" + "<span class='twitter-username'>" + data.user_name + "</span>" + "<p>" + "<span class='twitter-text'>" + data.text + "</span>" + "<p>" + "<div class='twitter-influence-container'>Followers:" + "<p>" + "<div class='twitter-influence'><br />" + data.user_followers_count + "</div>" + "Following:" + "<div class='twitter-influence'><br />" + data.user_friends_count + "</div>" + "</div>" + "</div>")
                 d3.select("body").on("mousemove", function(d) {       
        tweetFeed.attr("id", "boop3")   
    }) 


            // dots  = svg.selectAll("circle.dot").remove()
            // svg.selectAll(".dot")
            // .filter(function(d) {return d == data;})
            // .attr("display", displayOthers);

        svg.selectAll(".dot")
            .filter(function(d) {
                return d != data;
            })
            .attr("display", "inline");






    }


 /*   dropDown.on("change", function() {
        var selected = document.getElementById("filter").value;
        displayOthers = document.getElementById("filter").checked ? "inline" : "none";
        display = document.getElementById("filter").checked ? "none" : "inline";

        if (selected == 'All') {
            svg.selectAll(".dot")
                .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
                .attr("display", display);




        } else {
            svg.selectAll(".dot")
                .filter(function(d) {
                    return selected != d.sentiment;
                })
                .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
                .attr("display", displayOthers);

            svg.selectAll(".dot")
                .filter(function(d) {
                    return selected == d.sentiment;
                })
                .attr("r", 1)
                .transition().duration(500)
                //      .attr("r", function(d) { return d.size * d.sentiment / 2.5;})
                .attr("r", function(d) {
                    return .075 * Math.sqrt(d.user_followers_count / Math.PI) + 3;
                })
                .attr("display", display);
        }

    });
*/



    function process(matches) {
        svg.selectAll(".dot")
            .attr("display", "inline");

        svg.selectAll(".dot")
            .filter(function(d) {
                return matches.indexOf(d) < 0
            })
            .attr("display", "none");

        totalValue = 0;
        totalTweets = 0;


        var barRedraw = d3.nest()
            .key(function(d) {
                return d.place_full_name;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(matches);
        barRedraw.total = 0;

        if (barRedraw.length < 3) {

        }


        barRedraw.forEach(function(d) {
            d.city = d.key;
            d.tweets = d.values;
            totalTweets += d.values;
            barRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });



        var NewCity = barRedraw.sort(function(a, b) {
            return b.tweets - a.tweets
        }).slice(0, 5);

        xScale.domain(NewCity.map(function(d) {
            return d.city;
        }));
        yScale.domain([0, d3.max(NewCity, function(d) {
            return d.tweets;
        })]);

        Barsvg.selectAll("g.y.axis")
            .transition()
            .duration(750)
            .call(yAxis);

        Barsvg.selectAll("g.x.axis")
            .transition()
            .duration(750)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-35)");

        Barsvg.selectAll(".bar")
            .data(NewCity)
            .transition()
            .duration(750)
            .attr("height", function(d) {
                return height - yScale(d.tweets);
            })
            .attr("y", function(d) {
                return yScale(d.tweets);
            })







        //


        var pieRedraw = d3.nest()
            .key(function(d) {
                return d.sentiment;
            })
            .rollup(function(v) {
                return v.length;
            })
            .entries(matches);
        pieRedraw.total = 0;

        if (pieRedraw.length < 3) {

        }
        pieRedraw.forEach(function(d) {
            d.sentiment = d.key;
            d.amount = d.values;
            totalValue += d.values;
            pieRedraw.total += d.values;
            delete d["key"];
            delete d["values"];
        });

        circleGraph.data(pie(pieRedraw));

        circleGraph.transition().duration(750).attrTween("d", arcTween).style("fill", function(d) {
            return color(d.data.sentiment);
        });




    }

    //Setup and render the autocomplete
    function start() {
        var mc = autocomplete(document.getElementById('test'))
            .keys(keys)
            .dataField("text")
            .placeHolder("Search Tweets")
            .width(960)
            .height(500)
            .processCallback(process)
            .onSelected(onSelect)
            .render();
    }




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

    function arcTween(a) {

        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }

setInterval(update, 5000);

function update(d){
    var randomTweet = Math.floor(Math.random()*2697);

    var color = d3.scale.ordinal()
        .range(["rgba(255, 128, 0, .75)", "rgba(0, 153, 196, .75)", "rgba(220, 10, 10, .75)" ])
        .domain(["neutral", "positive", "negative"]);

    var colorSent = data[randomTweet].sentiment;

    d3.select("#content").append("div").style("opacity", 0)
 
    .attr("class","tweet-box")
    .attr("id", function(d) { return randomTweet})
    .style("background", function(d) {
            return color([colorSent])
        })    .html("<img id='ido' width='40px' style='background-image:url("+ data[randomTweet].user_profile_image_url+")'><div class='tweet-text'>" + data[randomTweet].text + "</div>")
   
    .transition()
            .duration(20)
            .style("opacity", 1)

 document.getElementById('content').addEventListener('click', function(d) {

    // depending on whether we're currently at point a or b, aim for
    // point a or b
     console.log($(d.target));
    randomTweets = parseInt($(d.target).parent().attr('id') )
    console.log(randomTweets)
 /* var target = isAtStart ? [data[randomTweets].lng,
        data[randomTweets].lat
    ] : start;

    // and now we're at the opposite point
    isAtStart = !isAtStart;*/

    map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: [data[randomTweets].lng,
        data[randomTweets].lat
    ],
        zoom: 10,
     //   pitch: 70,
//        bearing: -17.6,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 3, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function(t) {
            return t;
        }
    });
    tweetFeed.attr("id", "boop")
        tweetFeed.html("<br />" + "<div class='twitter-profile-search'><img  style='background-image:url(" + data[randomTweets].user_profile_image_url + ")'>" + "<p>" + "<span class='twitter-username'>" + data[randomTweets].user_name + "</span>" + "<p>" + "<span class='twitter-text'>" + data[randomTweets].text + "</span>" + "<p>" + "<div class='twitter-influence-container'>Followers:" + "<p>" + "<div class='twitter-influence'><br />" + data[randomTweets].user_followers_count + "</div>" + "Following:" + "<div class='twitter-influence'><br />" + data[randomTweets].user_friends_count + "</div>" + "</div>" + "</div>")

    d3.select("body").on("mousemove", function(d) {       
        tweetFeed.attr("id", "boop3")   
    })

});     

}

function updateData() {

    // Get the data again
    d3.csv("data-alt.csv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
        });

        // Scale the range of the data again 
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline(data));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    });
}

console.log(data)
/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - selectToUISlider - creates a UI slider component from a select element(s)
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_jquery_ui_16_slider_from_a_select_element/
 * demo page: http://www.filamentgroup.com/examples/slider_v2/index.html
 * 
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Usage Notes: please refer to our article above for documentation
 *  
 * --------------------------------------------------------------------
 */


jQuery.fn.selectToUISlider = function(settings){
    var selects = jQuery(this);
    
    //accessible slider options
    var options = jQuery.extend({
        labels: 3, //number of visible labels
        tooltip: true, //show tooltips, boolean
        tooltipSrc: 'text',//accepts 'value' as well
        labelSrc: 'value',//accepts 'value' as well ,
        sliderOptions: null
    }, settings);


    //handle ID attrs - selects each need IDs for handles to find them
    var handleIds = (function(){
        var tempArr = [];
        selects.each(function(){
            tempArr.push('handle_'+jQuery(this).attr('id'));
        });
        return tempArr;
    })();
    
    //array of all option elements in select element (ignores optgroups)
    var selectOptions = (function(){
        var opts = [];
        selects.eq(0).find('option').each(function(){
            opts.push({
                value: jQuery(this).attr('value'),
                text: jQuery(this).text()
            });
        });
        return opts;
    })();
    
    //array of opt groups if present
    var groups = (function(){
        if(selects.eq(0).find('optgroup').size()>0){
            var groupedData = [];
            selects.eq(0).find('optgroup').each(function(i){
                groupedData[i] = {};
                groupedData[i].label = jQuery(this).attr('label');
                groupedData[i].options = [];
                jQuery(this).find('option').each(function(){
                    groupedData[i].options.push({text: jQuery(this).text(), value: jQuery(this).attr('value')});
                });
            });
            return groupedData;
        }
        else return null;
    })();   
    
    //check if obj is array
    function isArray(obj) {
        return obj.constructor == Array;
    }
    //return tooltip text from option index
    function ttText(optIndex){
        return (options.tooltipSrc == 'text') ? selectOptions[optIndex].text : selectOptions[optIndex].value;
    }
    
    //plugin-generated slider options (can be overridden)
    var sliderOptions = {
        step: 1,
        min: 0,
        orientation: 'horizontal',
        max: selectOptions.length-1,
        range: selects.length > 1,//multiple select elements = true
        slide: function(e, ui) {//slide function
                var thisHandle = jQuery(ui.handle);
                //handle feedback 
                var textval = ttText(ui.value);
                thisHandle
                    .attr('aria-valuetext', textval)
                    .attr('aria-valuenow', ui.value)
                    .find('.ui-slider-tooltip .ttContent')
                        .text( textval );

                //control original select menu
                var currSelect = jQuery('#' + thisHandle.attr('id').split('handle_')[1]);
            //  var myInput = d3.select(currSelect[0]);
            //  myInput.on("change")();
            $(currSelect).change();
            //  $(currSelect).trigger("change");
                currSelect.find('option').eq(ui.value).attr('change', change);
                    console.log(currSelect)

        },
        values: (function(){
            var values = [];
            selects.each(function(){
                values.push( jQuery(this).get(0).selectedIndex );
            });
            return values;
        })()
    };
    
    //slider options from settings
    options.sliderOptions = (settings) ? jQuery.extend(sliderOptions, settings.sliderOptions) : sliderOptions;
        
    //select element change event   
    selects.bind('change keyup click', function(){
        var thisIndex = jQuery(this).get(0).selectedIndex;
        var thisHandle = jQuery('#handle_'+ jQuery(this).attr('id'));
        var handleIndex = thisHandle.data('handleNum');
        thisHandle.parents('.ui-slider:eq(0)').slider("values", handleIndex, thisIndex);
    });
    

    //create slider component div
    var sliderComponent = jQuery('<div></div>');

    //CREATE HANDLES
    selects.each(function(i){
        var hidett = '';
        
        //associate label for ARIA
        var thisLabel = jQuery('label[for=' + jQuery(this).attr('id') +']');
        //labelled by aria doesn't seem to work on slider handle. Using title attr as backup
        var labelText = (thisLabel.size()>0) ? 'Slider control for '+ thisLabel.text()+'' : '';
        var thisLabelId = thisLabel.attr('id') || thisLabel.attr('id', 'label_'+handleIds[i]).attr('id');
        
        
        if( options.tooltip == false ){hidett = ' style="display: none;"';}
        jQuery('<a '+
                'href="#" tabindex="0" '+
                'id="'+handleIds[i]+'" '+
                'class="ui-slider-handle" '+
                'role="slider" '+
                'aria-labelledby="'+thisLabelId+'" '+
                'aria-valuemin="'+options.sliderOptions.min+'" '+
                'aria-valuemax="'+options.sliderOptions.max+'" '+
                'aria-valuenow="'+options.sliderOptions.values[i]+'" '+
                'aria-valuetext="'+ttText(options.sliderOptions.values[i])+'" '+
            '><span class="screenReaderContext">'+labelText+'</span>'+
            '<span class="ui-slider-tooltip ui-widget-content ui-corner-all"'+ hidett +'><span class="ttContent"></span>'+
                '<span class="ui-tooltip-pointer-down ui-widget-content"><span class="ui-tooltip-pointer-down-inner"></span></span>'+
            '</span></a>')
            .data('handleNum',i)
            .appendTo(sliderComponent);
    });
    
    //CREATE SCALE AND TICS
    
    //write dl if there are optgroups
    if(groups) {
        var inc = 0;
        var scale = sliderComponent.append('<dl class="ui-slider-scale ui-helper-reset" role="presentation"></dl>').find('.ui-slider-scale:eq(0)');
        jQuery(groups).each(function(h){
            scale.append('<dt style="width: '+ (100/groups.length).toFixed(2) +'%' +'; left:'+ (h/(groups.length-1) * 100).toFixed(2)  +'%' +'"><span>'+this.label+'</span></dt>');//class name becomes camelCased label
            var groupOpts = this.options;
            jQuery(this.options).each(function(i){
                var style = (inc == selectOptions.length-1 || inc == 0) ? 'style="display: none;"' : '' ;
                var labelText = (options.labelSrc == 'text') ? groupOpts[i].text : groupOpts[i].value;
                scale.append('<dd style="left:'+ leftVal(inc) +'"><span class="ui-slider-label">'+ labelText +'</span><span class="ui-slider-tic ui-widget-content"'+ style +'></span></dd>');
                inc++;
            });
        });
    }
    //write ol
    else {
        var scale = sliderComponent.append('<ol class="ui-slider-scale  ui-helper-reset" role="presentation"></ol>').find('.ui-slider-scale:eq(0)');
        jQuery(selectOptions).each(function(i){
            var style = (i == selectOptions.length-1 || i == 0) ? 'style="display: none;"' : '' ;
            var labelText = (options.labelSrc == 'text') ? this.text : this.value;
            scale.append('<li style="left:'+ leftVal(i) +'"><span class="ui-slider-label">'+ labelText +'</span><span class="ui-slider-tic ui-widget-content"'+ style +'></span></li>');
        });
    }
    
    function leftVal(i){
        return (i/(selectOptions.length-1) * 100).toFixed(2)  +'%';
        
    }
    

    
    
    //show and hide labels depending on labels pref
    //show the last one if there are more than 1 specified
    if(options.labels > 1) sliderComponent.find('.ui-slider-scale li:last span.ui-slider-label, .ui-slider-scale dd:last span.ui-slider-label').addClass('ui-slider-label-show');

    //set increment
    var increm = Math.max(1, Math.round(selectOptions.length / options.labels));
    //show em based on inc
    for(var j=0; j<selectOptions.length; j+=increm){
        if((selectOptions.length - j) > increm){//don't show if it's too close to the end label
            sliderComponent.find('.ui-slider-scale li:eq('+ j +') span.ui-slider-label, .ui-slider-scale dd:eq('+ j +') span.ui-slider-label').addClass('ui-slider-label-show');
        }
    }

    //style the dt's
    sliderComponent.find('.ui-slider-scale dt').each(function(i){
        jQuery(this).css({
            'left': ((100 /( groups.length))*i).toFixed(2) + '%'
        });
    });
    

    //inject and return 
    sliderComponent
    .insertAfter(jQuery(this).eq(this.length-1))
    .slider(options.sliderOptions)
    .attr('role','application')
    .find('.ui-slider-label')
    .each(function(){
        jQuery(this).css('marginLeft', -jQuery(this).width()/2);
    });
    
    //update tooltip arrow inner color
    sliderComponent.find('.ui-tooltip-pointer-down-inner').each(function(){
                var bWidth = jQuery('.ui-tooltip-pointer-down-inner').css('borderTopWidth');
                var bColor = jQuery(this).parents('.ui-slider-tooltip').css('backgroundColor')
                jQuery(this).css('border-top', bWidth+' solid '+bColor);
    });
    
    var values = sliderComponent.slider('values');
    
    if(isArray(values)){
        jQuery(values).each(function(i){
            sliderComponent.find('.ui-slider-tooltip .ttContent').eq(i).text( ttText(this) );
        });
    }
    else {
        sliderComponent.find('.ui-slider-tooltip .ttContent').eq(0).text( ttText(values) );
    }
    
    return this;
}



    // re-render our visualization whenever the view changes
    map.on("viewreset", function() {
        render()
    })
    map.on("move", function() {
        render()
    })

    // render our initial visualization
    render();
})
});