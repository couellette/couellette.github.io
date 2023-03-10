function getUrlVars() {
    var vars = {},
        hash;

    if (window.location.href.indexOf("?") >= 1) {
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
    } else {
        var vars = {
            "data": "main"
        }
    }


    return vars;
}

$("#newData").click(function(){
    $(".wall").css("background","#000000a1").css("z-index","1000")
    $(".newupload").css("top","50%")
})
urlVars = getUrlVars()
console.log(urlVars.data)
const color = d3.scaleOrdinal(["rgb(63, 125, 152)", "#FF5900", "rgb(250, 165, 43)", "#77A22D", "#666666", "rgb(0, 153, 196)"]);



var currency = [{
    "country": "USD",
    "value": "1"
}, {
    "country": "AED",
    "value": "3.67"
}]

var currencySelect = d3.select("header").append("select").attr("id", "currencySelector")

var currencyOptions = currencySelect.selectAll("option")
    .data(currency)
    .enter()
    .append("option");

currencyOptions.text(function(d) {
        return d.country
    })
    .attr("value", function(d) {
        return d.value;


    })
    .attr("id", function(d) {
        return d.country;


    });

currencySelect.on("change", changeIt)

var sect = document.getElementById("currencySelector");
var country = sect.options[sect.selectedIndex].value;
var countryName = sect.options[sect.selectedIndex].id;
//console.log(country)
if (countryName == "AED") {
    var symbol = "د.إ"
} else {
    var symbol = "$"
}
// console.log(country)

function changeIt() {


    if ($(".changeView").attr("onclick") == "SingularView()") {
        $(".legend-container").remove()
        dashboard()
    } else {
        SingularView()
    }
    sideAnalytics()

}


function load_dataset(csv) {
    var data = d3.csvParse(csv)
    create_table(data);
}

function create_table(data) {

    // console.log(data)

}





$(".changeView").click(function() {

    if ($(".changeView").attr("onclick") == "SingularView()") {
        d3.select(".changeView").attr("onclick", "dashboard()")
        $(".changeView").text("Entitiy View")

        d3.select("#fourth").style("height", "91%").style("width", "-webkit-fill-available")
            // d3.select(".categories").style("height", "48%")


    } else {
        d3.select(".changeView").attr("onclick", "SingularView()")
        $(".changeView").text("Overall View")
    }
})

SingularView()
sideAnalytics()
var appHeight = "82%"

$(".main-container").css("height", appHeight)
    // $("#receivables").css("width", "50%")

d3.select(".main-container").style("height", $(".main-container").height() - 100)
d3.select(".side").style("height", $(".main-container").height() + 22)

var lastWidth = $(window).width();

$(window).resize(function() {

    if ($(window).width() != lastWidth) {
        // window.onresize = function(event) {
        var countdiv = $("#pie").length;
        var i = 1;
        $("#pie").remove()
        $("#pie").each(function() {

            if (countdiv != i) {
                $(this).remove();
            }
            i++;

        });

        var cnt = $("#newContainer").contents();
        $("#newContainer").replaceWith(cnt);
        $("svg").remove()
        $("#fourth *").remove()
        $("#taxrate *").remove()
        $("#pie *").remove()
        $("#pie").remove()
        $(".main h2").remove()

        // $(".side ul").remove()
        $(".main-container").css("height", appHeight)

        d3.select(".main-container").style("height", $(".main-container").height() - 100).attr("width", "-webkit-fill-available")
        d3.select(".side").style("height", $(".main-container").height() + 65)
        var obj = {};
        // $('#pie').each(function(){
        //     var text = $.trim($(this));
        //     if(obj[text]){
        //         $(this).remove();
        //     } else {
        //         obj[text] = true;
        //     }
        // })
        // $(function(){                                                               


        // });
        if ($(".changeView").attr("onclick") == "SingularView()") {
            dashboard()
        } else {
            SingularView()
        }




        // d3.selectAll("svg").attr("viewBox","0 0 "+$("#receivables").width()+" "+$("#receivables").width())

        setTimeout(function() {

                // var obj = {};
                // $('.legend-container').each(function(){
                //     var text = $.trim($(this).text());
                //     if(obj[text]){
                //         $(this).remove();
                //     } else {
                //         obj[text] = true;
                //     }
                // })
                var seen = {};
                $('.legend-container .legend').each(function() {
                    var txt = $(this).text();
                    if (seen[txt])
                        $(this).remove();
                    else
                        seen[txt] = true;
                });
                $('.legend-container').each(function() {
                    var txt = $(this).text();
                    if (seen[txt])
                        $(this).remove();
                    else
                        seen[txt] = true;
                });
            }, 150)
            // }
        lastWidth = $(window).width();
    }
})

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 0 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function SingularView() {
    var sect = document.getElementById("currencySelector");
    var country = sect.options[sect.selectedIndex].value;
    var countryName = sect.options[sect.selectedIndex].id;
    // console.log(country)
    if (countryName == "AED") {
        var symbol = "د.إ"
    } else {
        var symbol = "$"
    }
    $("#pie svg").remove()
    $("#pie *").remove()
    $("#pie").remove()
    $(".tooltip").remove()
    $("#receivables").remove()
    $("#payables").remove()
    $("#taxrate").remove()
    $(".lower").hide()
    $("#secondary").addClass("SecondView")
    d3.select(".main").style("display", "flex")
    d3.select("#primary").style("display", "block")
    d3.select("#fourth").style("width", "100%")
    d3.select("#primary").append("div").attr("id", "newContainer").style("width", "100%")
    d3.select("#newContainer").append("div").attr("id", "receivables")
    d3.select("#newContainer").append("div").attr("id", "payables")
    d3.select("#newContainer").append("div").attr("id", "taxrate")
        // d3.select("#primary").append("div").attr("id", "distribution")
        // d3.select("#taxrate").style("margin-top", "1%")
    d3.select("#secondary").style("display", "block").style("height", "56%")
    d3.select("#fourth").style("height", "91%").style("width", "-webkit-fill-available")
    d3.select("#secondary").append("div").attr("id", "pie").style("width", "-webkit-fill-available")
    $("#pie").insertBefore("#fourth");
    $("svg").remove()
    $("#fourth *").remove()
    $(".main h2").remove()
    d3.csv("data/" + urlVars.data + "/data.csv", function(data) {


        // Iterate over array
        data.forEach(function(e, i) {
            // Iterate over the keys of object
            Object.keys(e).forEach(function(key) {

                // Copy the value
                var val = e[key],
                    newKey = key.replace(/\s+/g, '');

                // Remove key-value from object
                delete data[i][key];

                // Add value with new key
                data[i][newKey] = val;
            });
        });

        // // console.log(data)

        var parseTime = d3.timeParse("%d-%m-%y");
        // console.log(data);
        // console.log(country)

        var Entitydata = data.map(data => ({

            EntityCode: data.EntityCode,
            ReportingDate: Date.parse(parseTime(data.ReportingDate)),
            TransactionTypeCode: data.TransactionTypeCode,
            TaxClassificationCode: data.TaxClassificationCode,
            TransactionAmountNet: data.TransactionAmountNet * parseInt(country),
            TransactionAmountTax: data.TransactionAmountTax * parseInt(country),
            InvoiceID: data.InvoiceID,
            InvoiceDate: data.InvoiceDate,
            TransactionCurrency: data.TransactionCurrency,
            Currency: data.Currency,
            SupplyTypeCode: data.SupplyTypeCode,
            IrrecoverableCode: data.IrrecoverableCode,
            CustomerVATNumber: data.CustomerVATNumber,
            ShipTo: data.ShipTo,
            ShipFrom: data.ShipFrom,
            Emirate: data.Emirate
        }))

        // console.log(Entitydata)

        var data = data.map(data => ({

            // EntityCode: "one",

            EntityCode: data.EntityCode.split('_')[0],
            ReportingDate: Date.parse(parseTime(data.ReportingDate)),
            ClassicDate: parseTime(data.ReportingDate),
            TransactionTypeCode: data.TransactionTypeCode,
            TaxClassificationCode: data.TaxClassificationCode,
            TransactionAmountNet: data.TransactionAmountNet * parseInt(country),
            TransactionAmountTax: data.TransactionAmountTax * parseInt(country),
            InvoiceID: data.InvoiceID,
            InvoiceDate: data.InvoiceDate,
            TransactionCurrency: data.TransactionCurrency,
            Currency: data.Currency,
            SupplyTypeCode: data.SupplyTypeCode,
            IrrecoverableCode: data.IrrecoverableCode,
            CustomerVATNumber: data.CustomerVATNumber,
            ShipTo: data.ShipTo,
            ShipFrom: data.ShipFrom,
            Emirate: data.Emirate
        }))





        // console.log(data)

        // 2. Use the margin convention practice 
        var margin = {
                top: 50,
                right: 30,
                bottom: 30,
                left: 50
            },
            width = $("#taxrate").width() - margin.left - margin.right // Use the window's width 
            ,
            height = $("#taxrate").height() - margin.top - margin.bottom; // Use the window's height



        var dataset = data.filter(function(d) {
            return d.TransactionTypeCode == "receivable";
        })

        var Fulldataset = Entitydata.filter(function(d) {
            return d.TransactionTypeCode == "receivable";
        })


        d3.select("#receivables").append("h2").html("Total VAT on Receivables Per Month Per Country")


        // console.log(dataset)

        var svg = d3.select("#receivables")
            .append("svg")
            // .attr("viewBox","0 0 "+width+" "+height)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);





        // console.log(min)

        // Scale the range of the data
        x.domain(d3.extent(dataset, function(d) {
            return d.ReportingDate;
        }));
        // y.domain(d3.extent(dataset, function(d) {
        //     return d.TransactionAmountTax;
        // })).nice();


        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .key(function(d) {
                return d.ReportingDate;
            })
            .rollup(function(v) {
                return d3.sum(v, function(d) {
                    return d.TransactionAmountTax;
                });
            })
            .entries(dataset);

        // // console.log(dataNest);
        // Define the line
        var priceline = d3.line()
            .x(function(d) {
                return x(d.key);
            })
            .y(function(d) {
                return y(d.value);
            });


        // set the colour scale
        // var color = d3.scaleOrdinal(["rgb(0, 153, 196)","rgb(63, 125, 152)","rgb(238, 49, 36)","rgb(250, 165, 43)"]);

        // var color = d3.scaleOrdinal(["rgb(0, 153, 196)", "rgb(63, 125, 152)", "rgb(238, 49, 36)", "rgb(250, 165, 43)"]);


        legendSpace = width / dataNest.length; // spacing for the legend

        // // console.log(dataNest)


        // Loop through each symbol / key
        dataNest.forEach(function(d, i) {
            // console.log(d)

            var max = d3.max(d.values, function(d) {
                    // console.log(d);
                    return parseInt(d.value);
                })
                // console.log(max)

            var min = d3.min(d.values, function(d) {
                    return d.value;
                })
                // console.log([min, max])
            y.domain([(min * 1.2), (max * 1.2)])
                // console.log(dataNest)

            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() { // Add the colours dynamically
                    return d.color = color(d.key);
                })
                .attr("d", priceline(d.values));

            // Add the Legend
            // var legend =    d3.selectAll(".lower").append("section").classed("legend-container",true)

            // d3.select(".legend-container").append("section")
            //        // .attr("x", (legendSpace/4)+i*legendSpace)  // space legend
            //        // .attr("y", height + (margin.bottom/2)+ 15)
            //        .attr("class", "legend")    // style the legend
            //        .style("fill", function() { // Add the colours dynamically
            //            return d.color = color(d.key); })
            //        .html("<section style='background:"+ color(d.key)+"' class='block'></section>"+d.key.replace(/_/g," ")); 

        });

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")

        .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).tickFormat(d3.format(".0s")));

        //END OF RECIEVABLES

        //
        //
        //
        //

        //START OF PAYABLES

        var paydataset = data.filter(function(d) {
            return d.TransactionTypeCode == "payable";
        })


        d3.select("#payables").append("h2").html("Total VAT on Payables Per Month Per Country")

        var svg = d3.select("#payables")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);




        // var max = d3.max(paydataset, function(d) {
        //         return parseInt(d.TransactionAmountTax);
        //     })
        // console.log(max)

        // var min = d3.min(paydataset, function(d) {
        //         return d.TransactionAmountTax;
        //     })
        // console.log(min)

        // Scale the range of the data
        x.domain(d3.extent(paydataset, function(d) {
            return d.ReportingDate;
        }));
        // y.domain(d3.extent(dataset, function(d) {
        //     return d.TransactionAmountTax;
        // })).nice();
        // y.domain([min - 200000, max])

        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .key(function(d) {
                return d.ReportingDate;
            })
            .rollup(function(v) {
                return d3.sum(v, function(d) {
                    return d.TransactionAmountTax;
                });
            })
            .entries(paydataset);


        // Define the line
        var priceline = d3.line()
            .x(function(d) {
                return x(d.key);
            })
            .y(function(d) {
                return y(d.value);
            });

        // set the colour scale
        // var color = d3.scaleOrdinal(["#FF8000","#005DA2","#DC0A0A","#387C2B"]);

        legendSpace = width / dataNest.length; // spacing for the legend

        // console.log(dataNest)


        // Loop through each symbol / key
        dataNest.forEach(function(d, i) {


            var max = d3.max(d.values, function(d) {
                    // console.log(d);
                    return parseInt(d.value);
                })
                // console.log(max)

            var min = d3.min(d.values, function(d) {
                    return d.value;
                })
                // console.log([min, max])
            y.domain([(min * 1.2), (max * 1.2)])
                // console.log(dataNest)
            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() { // Add the colours dynamically
                    return d.color = color(d.key)
                })
                .attr("d", priceline(d.values))


            // Add the Legend
            // svg.append("text")
            //     .attr("x", (legendSpace/4)+i*legendSpace)  // space legend
            //     .attr("y", height + (margin.bottom/2)+ 15)
            //     .attr("class", "legend")    // style the legend
            //     .style("fill", function() { // Add the colours dynamically
            //         return d.color = color(d.key); })
            //     .text(d.key.replace(/_/g," ")); 

        });

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".0s")));



        //END of PAYABLES

        //
        //
        //
        //

        // Start of Effective tax rate on sales 

        // set the ranges


        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin



        var EntityVat = d3.nest()
            .key(function(d) {
                return d.ClassicDate;
            })
            .key(function(d) {
                return d.EntityCode;
            })
            .rollup(function(v) {
                return {
                    count: v.length,
                    // EntityCode: data.EntityCode,
                    totalReceivables: d3.sum(v, function(d) {
                        return d.TransactionAmountNet;
                    }),
                    totalPayable: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),
                    taxRate: d3.sum(v, function(d) {
                            return d.TransactionAmountTax;
                        }) / d3.sum(v, function(d) {
                            return d.TransactionAmountNet;
                        })
                        // taxRate: (totalReceivables/totalPayable)
                        // avg: d3.mean(v, function(d) { return d.amount; })
                };
            })
            .entries(data);


        // console.log("EntityVat:", EntityVat)

        var taxMetrics = [];


        for (var j = 0; j < EntityVat.length; j++) {
            for (var i = 0; i < EntityVat[j].values.length; i++) {
                // console.log(j)

                taxMetrics.push({
                    Date: EntityVat[j].key,
                    [EntityVat[j].values[i].key]: EntityVat[j].values[i].value.taxRate
                })


            }
        }
        var taxMetrics = taxMetrics.filter(function(v) {
            return this[v.Date] ?
                !Object.assign(this[v.Date], v) :
                (this[v.Date] = v);
        }, {});

        var columns = Object.keys(taxMetrics[0]).slice(1)


        var causes = Object.keys(taxMetrics[0]).slice(1)
            // // console.log(Object.keys(taxMetrics[0]))

        var x = d3.scaleBand()
            .rangeRound([0, width])

        var y = d3.scaleLinear()
            .rangeRound([height, 0])

        var z = d3.scaleOrdinal(d3.schemeCategory10)

        var xAxis = d3.axisBottom()
            .scale(x)
            // .tickFormat(d3.timeFormat('%b'))

        var yAxis = d3.axisRight()
            .scale(y)

        d3.select("#taxrate").append("h2").html("Effective Tax Rate on Purchases by Country")

        var svg = d3.select("#taxrate").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");




        // var type = (d) => {
        //     d.date = parseDate(d.date)
        //     causes.forEach(c => {
        //         d[c] = +d[c]
        //     })
        //     return d
        // }

        // d3.tsv('crimea.tsv', type, (crimea) => {

        var layers = d3.stack()
            .keys(causes)
            (taxMetrics)
            // console.log(layers)
            // console.log(layers)

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        x.domain(layers[0].map(d => d.data.Date.slice(4, 8)))

        y.domain([0, d3.max(layers[layers.length - 1], d => (d[0] + d[1]))]).nice()
        z.domain(causes)

        var layer = svg.selectAll('layer')
            .data(layers)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .attr("fill", function(d) {
                return color(d.key);
            })

        layer.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            // .attr("class",fun)
            .attr('x', d => x(d.data.Date.slice(4, 8)))
            .attr('y', d => y(d[0] + d[1]))
            .attr('height', d => y(d[0]) - y(d[1] + d[0]))
            .attr('width', x.bandwidth() - 1)
            // .on("mouseover", function() {
            //     tooltip.style("display", null);
            // })
            // .on("mouseout", function() {
            //     tooltip.style("display", "none");
            // })
            // .on("mousemove", function(d) {
            //     var xPosition = d3.mouse(this)[0] - 15;
            //     var yPosition = d3.mouse(this)[1] - 25;
            //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            //     tooltip.select("text").text(((d[1]-d[0])*100).toFixed(2)+"%");
            // })
            .on("mouseover", function(d) { // console.log(d);       
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(((d[1] - d[0]) * 100).toFixed(2) + "%")

                // .html(d.properties.NAME_1+ "<br />"+)    
                .style("left", (d3.event.pageX - $(".tooltip").width() - 20) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // var legend = layer.append("g")
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", 10)
        //     .attr("text-anchor", "end")
        //   .selectAll("g")
        //   .data(causes.slice().reverse())
        //   .enter().append("g")
        //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        // legend.append("rect")
        //     .attr("x", width - 19)
        //     .attr("width", 19)
        //     .attr("height", 19)
        //     .attr("fill", color);

        // legend.append("text")
        //     .attr("x", width - 24)
        //     .attr("y", 9.5)
        //     .attr("dy", "0.32em")
        //     .text(function(d) { return d; });


        // Prep the tooltip bits, initial display is hidden


        svg.append("g")
            .attr("class", "axis")
            .attr("id", "goodAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5))


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(7));

        var regionlocations = dataset.filter(function(d) {

                return d.Emirate != "";
            })
            // console.log(regionlocations);

        // .rollup(function(v) { return {
        //     count: v.length,
        //     // EntityCode: data.EntityCode,
        //     totalReceivables: d3.sum(v, function(d) { return d.TransactionAmountNet; }),
        //     totalPayable: d3.sum(v, function(d) { return d.TransactionAmountTax; }),
        //     taxRate:d3.sum(v, function(d) { return d.TransactionAmountNet; })/d3.sum(v, function(d) { return d.TransactionAmountTax; })
        //     // taxRate: (totalReceivables/totalPayable)
        //     // avg: d3.mean(v, function(d) { return d.amount; })
        //   }; })


        var locationCount = d3.nest()
            .key(function(d) {
                return d.Emirate;
            })
            .rollup(function(v) {
                return {
                    count: v.length,
                    totalReceivables: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),


                }
            })
            .entries(regionlocations);



        var EntitiyCount = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .rollup(function(v) {
                return {
                    count: v.length,
                    totalReceivables: d3.sum(v, function(d) {
                        return d.TransactionAmountNet;
                    }),


                }
            })
            .entries(Fulldataset);
        // console.log(locationCount);
        var children = locationCount

        var dataset = {
            children
        }

        // console.log(dataset)
        // var diameter = width;
        //   var color = d3.scaleOrdinal(d3.schemeCategory20);

        //   var bubble = d3.pack(dataset)
        //       .size([width, height])
        //       // .padding(1.5);

        //   var svg = d3.select("#fourth")
        //       .append("svg")
        //       .attr("width", width)
        //       .attr("height", height)
        //       .attr("class", "bubble");

        //   var nodes = d3.hierarchy(dataset)
        //       .sum(function(d) { return d.value; });

        //   var node = svg.selectAll(".node")
        //       .data(bubble(nodes).descendants())
        //       .enter()
        //       .filter(function(d){
        //           return  !d.children
        //       })
        //       .append("g")
        //       .attr("class", "node")
        //       .attr("transform", function(d) {
        //           return "translate(" + d.x + "," + d.y + ")";
        //       });

        //   node.append("title")
        //       .text(function(d) {
        //           return d.key + ": " + d.value;
        //       });

        //   node.append("circle")
        //       .attr("r", function(d) {
        //           return d.r;
        //       })
        //       .style("fill", function(d,i) {
        //           return color(i);
        //       });

        //   node.append("text")
        //       .attr("dy", ".2em")
        //       .style("text-anchor", "middle")
        //       .text(function(d) {
        //           return d.data.key.substring(0, d.r / 3);
        //       })
        //       .attr("font-family", "sans-serif")
        //       .attr("font-size", function(d){
        //           return d.r/5;
        //       })
        //       .attr("fill", "white");

        //   node.append("text")
        //       .attr("dy", "1.3em")
        //       .style("text-anchor", "middle")
        //       .text(function(d) {
        //           return d.data.value;
        //       })
        //       .attr("font-family",  "Gill Sans", "Gill Sans MT")
        //       .attr("font-size", function(d){
        //           return d.r/5;
        //       })
        //       .attr("fill", "white");

        //   d3.select(self.frameElement)
        //       .style("height", height + "px");

        // var tooltip = d3.select('#pie')
        //     .append('div')
        //     .attr('class', 'tooltip');

        // tooltip.append('div')
        //     .attr('class', 'label');

        // tooltip.append('div')
        //     .attr('class', 'count');

        // tooltip.append('div')
        //     .attr('class', 'percent');

        d3.select("#fourth").append("h2").html("Total Net VAT By Emirate")

        // if($(window).width() == 1424) {
        //         // 2. Use the margin convention practice 
        //      var width = $("#fourth").width()*.75;
        //         var height = $("#fourth").height()*.75;
        // }
        // else{
        //         // 2. Use the margin convention practice 

        // }

        var width = $("#fourth").width();
        var height = $("#fourth").height();

        var radius = Math.min(width, height) / 2.2;

        // var color = d3.scaleOrdinal(["rgb(0, 153, 196)", "rgb(63, 125, 152)", "rgb(238, 49, 36)", "rgb(250, 165, 43)"]);

        var lowColor = '#fdd49e'
        var highColor = '#d7301f'


        var minVal = d3.min(locationCount, function(d) {
            return d.value.totalReceivables;
        })
        var maxVal = d3.max(locationCount, function(d) {
                return d.value.totalReceivables;
            })
            // console.log(minVal,maxVal)
        var ramp = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])

        var payables = data.filter(function(d) {
            return d.TransactionTypeCode == "payable";
        })

        var expenseMetrics = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .rollup(function(v) {
                return {
                    payableCount: v.length,
                    totalTransactions: d3.sum(v, function(d) {
                        return d.TransactionAmountNet;
                    }),
                    totalTax: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),
                    // taxRate: (totalReceivables/totalPayable)
                    // avg: d3.mean(v, function(d) { return d.amount; })
                };
            })
            .entries(payables);

        var expenseMetrics = expenseMetrics.map(expenseMetrics => ({

            region: expenseMetrics.key,
            total_Payable_Tax: expenseMetrics.value.totalTax,
            total_Payable_Transactions: expenseMetrics.value.totalTransactions,
            tax_Payable_Rate: expenseMetrics.value.totalTax / expenseMetrics.value.totalTransactions,
            payableCount: expenseMetrics.value.payableCount


        }))



        d3.select("#pie").append("h2").html("Country contribution rate to VAT")
        var svg = d3.select('#pie')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
                ',' + (height / 2) + ')');


        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        var donutWidth = 45;

        var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function(d) {
                return d.total_Payable_Tax;
            })
            .sort(null);

        var legendRectSize = 18;
        var legendSpacing = 4;

        // console.log(pie(EntitiyCount))

        var path = svg.selectAll('path')
            .data(pie(expenseMetrics))
            .enter()
            .append('path')
            .attr("id", d => d.data.region)
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(d.data.region);

            })
            .on("mouseover", function(d) { // console.log(d);       
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.region + "<br />" + symbol + formatMoney(d.data.total_Payable_Tax))

                // .html(d.properties.NAME_1+ "<br />"+)    
                .style("left", (d3.event.pageX - $(".tooltip").width() - 20) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });


        // d3.select("#fourth").data(locationCount).enter().append("div").html(d=>d.key +": " +d.value)

        // path.on('mouseover', function(d) {
        //     var total = d3.sum(EntitiyCount.map(function(d) {
        //         return d.value.count;
        //     }));
        //     var percent = Math.round(1000 * d.data.value.count / total) / 10;
        //     tooltip.select('.label').html(d.data.key);
        //     tooltip.select('.count').html(d.data.value.count);
        //     tooltip.select('.percent').html(percent + '%');
        //     tooltip.style('display', 'block');
        // });

        // path.on('mouseout', function() {
        //     tooltip.style('display', 'none');
        // });


        // console.log(EntitiyCount)
        var legend = d3.select('#pie')
            .append('span')
            .attr('class', 'pieLegend')

        legend.selectAll("#pie")
            .data(expenseMetrics)
            .enter()
            .append('section')
            .attr("id", function(d) {
                // console.log(d);
                return d.region.replace(/ /g, "").toLowerCase()
            })
            .style('width', legendRectSize)
            .style('height', legendRectSize)
            .style("fill", function(d) {
                return color(d.region)
            })
            .style('background', function(d) {
                return color(d.region)
            })
            .append('article')
            // .data(locationCount)
            // .enter()
            // .attr('x', legendRectSize + legendSpacing)
            // .attr('y', legendRectSize - legendSpacing)

        .html(function(d) {
            if (d.total_Payable_Tax < 0) {
                return d.region.replace(/_/g, " Entity ") + ": <a><span style='color:#2daf2d'> " + symbol + "(" + formatMoney(d.total_Payable_Tax.toFixed(0).replace("-", "")) + ")</span></a>"
            } else {
                return d.region.replace(/_/g, " Entity ") + ": <a>" + symbol + formatMoney(d.total_Payable_Tax) + "</a>"
            }
        })



        // console.log(color.domain())

        var legend = d3.select('#fourth')
            .append('span')
            .attr('class', 'fourthLegend')

        legend.selectAll("#fourth")
            .data(locationCount.sort(function(a, b) {
                return a.value.totalReceivables - b.value.totalReceivables
            }))
            .enter()
            .append('section')
            .attr("id", function(d) {
                return d.key.replace(/ /g, "").toLowerCase()
            })
            .style('width', legendRectSize)
            .style('height', legendRectSize)
            .style("fill", function(d) {
                return ramp(d.value.totalReceivables)
            })
            .style('background', function(d) {
                return ramp(d.value.totalReceivables)
            })
            .append('article')
            // .data(locationCount)
            // .enter()
            // .attr('x', legendRectSize + legendSpacing)
            // .attr('y', legendRectSize - legendSpacing)

        .html(function(d) {
                if (d.value.totalReceivables < 0) {
                    return d.key + ": <a><span style='color:#2daf2d'>  " + symbol + "(" + formatMoney(d.value.totalReceivables.toFixed(0).replace("-", "")) + ")</span></a>"
                } else {
                    return d.key + ": <a>" + symbol + formatMoney(d.value.totalReceivables) + "</a>"
                }
            })
            // .html(function(d) { // console.log(d); return d.key + ": <a>" + d.value.totalReceivables; + "</a>" });
        var projection = d3.geoAlbers()
            .scale(1)
            .translate([0, 0])
            .rotate([0, 50]);


        var path = d3.geoPath()
            .projection(projection);

        var svg = d3.select("#fourth").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("data/map_data/UAE.json", function(error, topology) {
            if (error) throw error;
            // console.log(topology);
            var states = topojson.feature(topology, topology.objects.ARE_adm1)
                // var states = topojson.feature(topologym,.objects.continent_Asia_subunits)
                // var continents = topojson.feature(topology, topology.objects.continent_Asia_subunits).features;

            var continents = topojson.feature(topology, topology.objects.ARE_adm1).features;
            // state = states.features.filter(function(d) { return d.id === 34; })[0];



            for (var i = 0; i < locationCount.length; i++) {

                // Grab State Name
                var dataState = locationCount[i].key;
                // console.log(dataState)
                // Grab data value 
                var dataValue = locationCount[i].value.totalReceivables;

                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < states.features.length; j++) {
                    var jsonState = states.features[j].properties.NAME_1.toUpperCase()
                        // console.log(jsonState)
                    if (dataState == jsonState) {

                        // Copy the data value into the JSON
                        states.features[j].properties.financial = dataValue;

                        // Stop looking through the JSON
                        break;
                    }
                }
            }
            // console.log(states)
            // projection
            var b = path.bounds(states),
                s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

            projection
                .scale(s)
                .translate(t);

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


            svg.append("path")
                .datum(states)
                .style("display", "none")
                .attr("id", function(d) {
                    return d.features[0].properties.NAME_1.replace(/ /g, "").toLowerCase()
                })
                .attr("d", path)
                // .style("fill", function(d, i) {return $("#"+d.properties.NAME_1.replace(/ /g,"").toLowerCase()).css('fill') });

            svg.append("path")
                .datum(topojson.mesh(topology, topology.objects.ARE_adm1, function(a, b) {
                    return a !== b;
                }))
                .attr("class", "mesh")
                .attr("d", path)


            svg.append("path")
                .datum(states)
                .attr("class", "outline")
                .attr("d", path);

            svg.selectAll(".continent")
                .data(continents)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", function(d) {
                    return d.properties.NAME_1.replace(/ /g, "").toLowerCase()
                })
                .attr("title", function(d, i) {
                    //// console.log(d.properties.continent)
                    return d.properties.ARE_adm1;
                })
                .style("fill", function(d, i) {
                    return $("#" + d.properties.NAME_1.replace(/ /g, "").toLowerCase()).css('fill')
                })
                .on("mouseover", function(d) { // console.log(d);		
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(function() {
                        if (d.properties.financial < 0) {
                            return d.properties.NAME_1 + "<br /><a><span style='color:#2daf2d'> " + symbol + "(" + formatMoney(d.properties.financial.toFixed(0).replace("-", "")) + ")</span></a>"
                        } else {
                            return d.properties.NAME_1 + "<br /><a>" + symbol + formatMoney(d.properties.financial) + "</a>"
                        }
                    })

                    // .html(d.properties.NAME_1+ "<br />"+)	
                    .style("left", (d3.event.pageX - $(".tooltip").width() - 20) + "px")
                        .style("top", (d3.event.pageY + 10) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

        });

    })

}

function dashboard() {
    // <div class="lower"><section class="label">Entity:</section></div>
    var sect = document.getElementById("currencySelector");
    var country = sect.options[sect.selectedIndex].value;
    var countryName = sect.options[sect.selectedIndex].id;
    // console.log(country)
    if (countryName == "AED") {
        var symbol = "د.إ"
    } else {
        var symbol = "$"
    }
    $(".lower").show()
    $(".legend-container").remove()
    $(".tooltip").remove()
    $("svg").remove()
    $("#fourth *").remove()
    $("#pie").remove()
    $("#pie *").remove()
    $(".main h2").remove()
    $("#payables").remove()
    $("#secondary").removeClass("SecondView")

    var cnt = $("#newContainer").contents();
    $("#newContainer").replaceWith(cnt);
    // d3.select("#newContainer").remove()
    // d3.select("#primary").append("div").attr("id", "receivables")
    // d3.select("#newContainer").append("div").attr("id", "payables")
    // d3.select("#newContainer").append("div").attr("id", "taxrate")
    d3.select("#secondary").style("display", "").style("height", "")
        // d3.select("#secondary").append("div").attr("id", "taxrate")

    d3.select(".main").style("display", "block")
    d3.select("#primary").style("display", "flex").append("div").attr("id", "payables")

    $("#taxrate").insertBefore("#fourth");


    $(".main-container").css("height", appHeight)
    $("#receivables").css("width", "50%")
    d3.select("#fourth").style("height", "").style("width", "")
    d3.select(".main-container").style("height", $(".main-container").height() - 100)
    d3.select(".side").style("height", $(".main-container").height() + 22)


    d3.csv("data/" + urlVars.data + "/data.csv", function(data) {

        data.forEach(function(e, i) {
            // Iterate over the keys of object
            Object.keys(e).forEach(function(key) {

                // Copy the value
                var val = e[key],
                    newKey = key.replace(/\s+/g, '');

                // Remove key-value from object
                delete data[i][key];

                // Add value with new key
                data[i][newKey] = val;
            });
        });



        // // console.log(data)

        var parseTime = d3.timeParse("%d-%m-%y");
        // console.log(data);
        var data = data.map(data => ({

            EntityCode: data.EntityCode,
            ReportingDate: Date.parse(parseTime(data.ReportingDate)),
            ClassicDate: parseTime(data.ReportingDate),
            TransactionTypeCode: data.TransactionTypeCode,
            TaxClassificationCode: data.TaxClassificationCode,
            TransactionAmountNet: data.TransactionAmountNet * parseInt(country),
            TransactionAmountTax: data.TransactionAmountTax * parseInt(country),
            InvoiceID: data.InvoiceID,
            InvoiceDate: data.InvoiceDate,
            TransactionCurrency: data.TransactionCurrency,
            Currency: data.Currency,
            SupplyTypeCode: data.SupplyTypeCode,
            IrrecoverableCode: data.IrrecoverableCode,
            CustomerVATNumber: data.CustomerVATNumber,
            ShipTo: data.ShipTo,
            ShipFrom: data.ShipFrom,
            Emirate: data.Emirate
        }))



        // console.log(data)
        if ($(window).width() <= 1024) {
            // 2. Use the margin convention practice 
            var margin = {
                    top: 50,
                    right: 30,
                    bottom: 30,
                    left: 50
                },
                width = $("#receivables").width() - margin.left - margin.right // Use the window's width 
                ,
                height = $("#receivables").height() - margin.top - margin.bottom; // Use the window's height

        } else {
            // 2. Use the margin convention practice 
            var margin = {
                    top: 50,
                    right: 30,
                    bottom: 30,
                    left: 50
                },
                width = $("#fourth").width() - margin.left - margin.right // Use the window's width 
                ,
                height = $("#fourth").height() - margin.top - margin.bottom; // Use the window's height

        }

        var dataset = data.filter(function(d) {
            return d.TransactionTypeCode == "receivable";
        })


        d3.select("#receivables").append("h2").html("Total VAT on Receivables Per Month Per Entity")


        // console.log(dataset)

        var svg = d3.select("#receivables")
            .append("svg")
            // .attr("viewBox","0 0 "+width+" "+height)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);




        // var max = d3.max(dataset, function(d) {
        //         return parseInt(d.TransactionAmountTax);
        //     })
        //     // console.log(max)

        // var min = d3.min(dataset, function(d) {
        //         return d.TransactionAmountTax;
        //     })
        // console.log(min)

        // Scale the range of the data
        x.domain(d3.extent(dataset, function(d) {
            return d.ReportingDate;
        }));
        // y.domain(d3.extent(dataset, function(d) {
        //     return d.TransactionAmountTax;
        // })).nice();
        // y.domain(["-18000", "22000"])

        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .key(function(d) {
                return d.ReportingDate;
            })
            .rollup(function(v) {
                return d3.sum(v, function(d) {
                    return d.TransactionAmountTax;
                });
            })
            .entries(dataset);

        // // console.log(dataNest);
        // Define the line
        var priceline = d3.line()
            .x(function(d) {
                return x(d.key);
            })
            .y(function(d) {
                return y(d.value);
            });

        // set the colour scale
        // var color = d3.scaleOrdinal(["rgb(0, 153, 196)","rgb(63, 125, 152)","rgb(238, 49, 36)","rgb(250, 165, 43)"]);



        legendSpace = width / dataNest.length; // spacing for the legend

        // // console.log(dataNest)


        // Loop through each symbol / key
        dataNest.forEach(function(d, i) {

            var max = d3.max(d.values, function(d) {
                    // console.log(d);
                    return parseInt(d.value);
                })
                // console.log(max)

            var min = d3.min(d.values, function(d) {
                    return d.value;
                })
                // console.log([min, max])
            y.domain([(min * 1.2), (max * 1.2)])
                // console.log(dataNest)

            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() { // Add the colours dynamically
                    return d.color = color(d.key);
                })
                .attr("d", priceline(d.values));

            // Add the Legend
            var legend = d3.selectAll(".lower").append("section").classed("legend-container", true)

            d3.select(".legend-container").append("section")
                // .attr("x", (legendSpace/4)+i*legendSpace)  // space legend
                // .attr("y", height + (margin.bottom/2)+ 15)
                .attr("class", "legend") // style the legend
                .style("fill", function() { // Add the colours dynamically
                    return d.color = color(d.key);
                })
                .html("<section style='background:" + color(d.key) + "' class='block'></section>" + d.key.replace(/_/g, " "));

        });

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).tickFormat(d3.format(".0s")));

        //END OF RECIEVABLES

        //
        //
        //
        //

        //START OF PAYABLES

        var paydataset = data.filter(function(d) {
            return d.TransactionTypeCode == "payable";
        })


        d3.select("#payables").append("h2").html("Total VAT on Payables Per Month Per Entity")

        var svg = d3.select("#payables")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);




        var max = d3.max(paydataset, function(d) {
                return parseInt(d.TransactionAmountTax);
            })
            // console.log(max)

        var min = d3.min(paydataset, function(d) {
                return d.TransactionAmountTax;
            })
            // console.log(min)

        // Scale the range of the data
        x.domain(d3.extent(paydataset, function(d) {
            return d.ReportingDate;
        }));
        // console.log(min, max)
        // y.domain(d3.extent(dataset, function(d) {
        //     return d.TransactionAmountTax;
        // })).nice();
        y.domain([min - 10000, max])

        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .key(function(d) {
                return d.ReportingDate;
            })
            .rollup(function(v) {
                return d3.sum(v, function(d) {
                    return d.TransactionAmountTax;
                });
            })
            .entries(paydataset);


        // Define the line
        var priceline = d3.line()
            .x(function(d) {
                return x(d.key);
            })
            .y(function(d) {
                return y(d.value);
            });

        // set the colour scale
        // var color = d3.scaleOrdinal(["#FF8000","#005DA2","#DC0A0A","#387C2B"]);

        legendSpace = width / dataNest.length; // spacing for the legend

        // console.log(dataNest)


        // Loop through each symbol / key
        dataNest.forEach(function(d, i) {

            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() { // Add the colours dynamically
                    return d.color = color(d.key);
                })
                .attr("d", priceline(d.values));

            // Add the Legend
            // svg.append("text")
            //     .attr("x", (legendSpace/4)+i*legendSpace)  // space legend
            //     .attr("y", height + (margin.bottom/2)+ 15)
            //     .attr("class", "legend")    // style the legend
            //     .style("fill", function() { // Add the colours dynamically
            //         return d.color = color(d.key); })
            //     .text(d.key.replace(/_/g," ")); 

        });

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".0s")));



        //END of PAYABLES

        //
        //
        //
        //

        // Start of Effective tax rate on sales 

        // set the ranges


        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin


        var EntityVat = d3.nest()
            .key(function(d) {
                return d.ClassicDate;
            })
            .key(function(d) {
                return d.EntityCode;
            })
            .rollup(function(v) {
                return {
                    count: v.length,
                    // EntityCode: data.EntityCode,
                    totalReceivables: d3.sum(v, function(d) {
                        return d.TransactionAmountNet;
                    }),
                    totalPayable: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),
                    taxRate: d3.sum(v, function(d) {
                            return d.TransactionAmountTax;
                        }) / d3.sum(v, function(d) {
                            return d.TransactionAmountNet;
                        })
                        // taxRate: (totalReceivables/totalPayable)
                        // avg: d3.mean(v, function(d) { return d.amount; })
                };
            })
            .entries(data);


        // console.log("EntityVat:", EntityVat)

        var taxMetrics = [];


        for (var j = 0; j < EntityVat.length; j++) {
            for (var i = 0; i < EntityVat[j].values.length; i++) {
                // console.log(j)

                taxMetrics.push({
                    Date: EntityVat[j].key,
                    [EntityVat[j].values[i].key]: EntityVat[j].values[i].value.taxRate
                })


            }
        }

        var taxMetrics = taxMetrics.filter(function(v) {
            return this[v.Date] ?
                !Object.assign(this[v.Date], v) :
                (this[v.Date] = v);
        }, {});

        var columns = Object.keys(taxMetrics[0]).slice(1)


        var causes = Object.keys(taxMetrics[0]).slice(1)
            // // console.log(Object.keys(taxMetrics[0]))

        var x = d3.scaleBand()
            .rangeRound([0, width])

        var y = d3.scaleLinear()
            .rangeRound([height, 0])

        var z = d3.scaleOrdinal(d3.schemeCategory10)

        var xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(d3.timeFormat('%b'))

        var yAxis = d3.axisRight()
            .scale(y)

        d3.select("#taxrate").append("h2").html("Effective Tax Rate on Purchases by Entity")

        var svg = d3.select("#taxrate").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");




        // var type = (d) => {
        //     d.date = parseDate(d.date)
        //     causes.forEach(c => {
        //         d[c] = +d[c]
        //     })
        //     return d
        // }

        // d3.tsv('crimea.tsv', type, (crimea) => {

        var layers = d3.stack()
            .keys(causes)
            (taxMetrics)
            // console.log(layers)
            // console.log(layers)

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        x.domain(layers[0].map(d => d.data.Date.slice(4, 8)))

        y.domain([0, d3.max(layers[layers.length - 1], d => (d[0] + d[1]))]).nice()
        z.domain(causes)

        var layer = svg.selectAll('layer')
            .data(layers)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .attr("fill", function(d) {
                return color(d.key);
            })

        layer.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            // .attr("class",fun)
            .attr('x', d => x(d.data.Date.slice(4, 8)))
            .attr('y', d => y(d[0] + d[1]))
            .attr('height', d => y(d[0]) - y(d[1] + d[0]))
            .attr('width', x.bandwidth() - 1)
            // .on("mouseover", function() {
            //     tooltip.style("display", null);
            // })
            // .on("mouseout", function() {
            //     tooltip.style("display", "none");
            // })
            // .on("mousemove", function(d) {
            //     var xPosition = d3.mouse(this)[0] - 15;
            //     var yPosition = d3.mouse(this)[1] - 25;
            //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            //     tooltip.select("text").text(((d[1]-d[0])*100).toFixed(2)+"%");
            // })
            .on("mouseover", function(d) { // console.log(d);       
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(((d[1] - d[0]) * 100).toFixed(2) + "%")

                // .html(d.properties.NAME_1+ "<br />"+)    
                .style("left", (d3.event.pageX - $(".tooltip").width() - 20) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))


        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        var regionlocations = dataset.filter(function(d) {
            return d.Emirate != "";
        })

        // console.log(regionlocations);

        // .rollup(function(v) { return {
        //     count: v.length,
        //     // EntityCode: data.EntityCode,
        //     totalReceivables: d3.sum(v, function(d) { return d.TransactionAmountNet; }),
        //     totalPayable: d3.sum(v, function(d) { return d.TransactionAmountTax; }),
        //     taxRate:d3.sum(v, function(d) { return d.TransactionAmountNet; })/d3.sum(v, function(d) { return d.TransactionAmountTax; })
        //     // taxRate: (totalReceivables/totalPayable)
        //     // avg: d3.mean(v, function(d) { return d.amount; })
        //   }; })


        var locationCount = d3.nest()
            .key(function(d) {
                return d.Emirate;
            })
            .rollup(function(v) {
                return {
                    count: v.length,
                    totalReceivables: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),


                }
            })
            .entries(regionlocations);
        // console.log(locationCount);
        var children = locationCount

        var dataset = {
            children
        }

        // console.log(dataset)
        // var diameter = width;
        //   var color = d3.scaleOrdinal(d3.schemeCategory20);

        //   var bubble = d3.pack(dataset)
        //       .size([width, height])
        //       // .padding(1.5);

        //   var svg = d3.select("#fourth")
        //       .append("svg")
        //       .attr("width", width)
        //       .attr("height", height)
        //       .attr("class", "bubble");

        //   var nodes = d3.hierarchy(dataset)
        //       .sum(function(d) { return d.value; });

        //   var node = svg.selectAll(".node")
        //       .data(bubble(nodes).descendants())
        //       .enter()
        //       .filter(function(d){
        //           return  !d.children
        //       })
        //       .append("g")
        //       .attr("class", "node")
        //       .attr("transform", function(d) {
        //           return "translate(" + d.x + "," + d.y + ")";
        //       });

        //   node.append("title")
        //       .text(function(d) {
        //           return d.key + ": " + d.value;
        //       });

        //   node.append("circle")
        //       .attr("r", function(d) {
        //           return d.r;
        //       })
        //       .style("fill", function(d,i) {
        //           return color(i);
        //       });

        //   node.append("text")
        //       .attr("dy", ".2em")
        //       .style("text-anchor", "middle")
        //       .text(function(d) {
        //           return d.data.key.substring(0, d.r / 3);
        //       })
        //       .attr("font-family", "sans-serif")
        //       .attr("font-size", function(d){
        //           return d.r/5;
        //       })
        //       .attr("fill", "white");

        //   node.append("text")
        //       .attr("dy", "1.3em")
        //       .style("text-anchor", "middle")
        //       .text(function(d) {
        //           return d.data.value;
        //       })
        //       .attr("font-family",  "Gill Sans", "Gill Sans MT")
        //       .attr("font-size", function(d){
        //           return d.r/5;
        //       })
        //       .attr("fill", "white");

        //   d3.select(self.frameElement)
        //       .style("height", height + "px");

        var tooltip = d3.select('#chart')
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');

        d3.select("#fourth").append("h2").html("Total Net VAT By Emirate")

        var width = $("#fourth").width();
        var height = height + 80;
        var radius = Math.min(width, height) / 2.2;

        // var color = d3.scaleOrdinal(['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000']);

        var lowColor = '#fdd49e'
        var highColor = '#d7301f'


        var minVal = d3.min(locationCount, function(d) {
            return d.value.totalReceivables;
        })
        var maxVal = d3.max(locationCount, function(d) {
                return d.value.totalReceivables;
            })
            // console.log(minVal,maxVal)
        var ramp = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])

        // var svg = d3.select('#fourth')
        //   .append('svg')
        //   .attr('width', width)
        //   .attr('height', height)
        //   .append('g')
        //   .attr('transform', 'translate(' + (width / 1.35) + 
        //     ',' + (height / 2) + ')');

        // var donutWidth = 45;

        // var arc = d3.arc()
        //   .innerRadius(radius - donutWidth)
        //   .outerRadius(radius);

        // var pie = d3.pie()
        //   .value(function(d) { return d.value.count; })
        //   .sort(null);

        var legendRectSize = 18;
        var legendSpacing = 4;

        //         var path = svg.selectAll('path')
        //           .data(pie(locationCount))
        //           .enter()
        //           .append('path')
        //           .attr('d', arc)
        //           .attr('fill', function(d, i) { 
        //             return color(d.data.key);

        //           })

        //          // d3.select("#fourth").data(locationCount).enter().append("div").html(d=>d.key +": " +d.value)

        //         path.on('mouseover', function(d) {
        //   var total = d3.sum(dataset.map(function(d) {
        //     return d.value.count;
        //   }));
        //   var percent = Math.round(1000 * d.data.value.count / total) / 10;
        //   tooltip.select('.label').html(d.data.key);
        //   tooltip.select('.count').html(d.data.value.count);
        //   tooltip.select('.percent').html(percent + '%');
        //   tooltip.style('display', 'block');
        // });

        //         path.on('mouseout', function() {
        //   tooltip.style('display', 'none');
        // });
        // console.log(color.domain())  

        var legend = d3.select('#fourth')
            .append('span')
            .attr('class', 'fourthLegend')

        legend.selectAll("#fourth")
            .data(locationCount.sort(function(a, b) {
                return a.value.totalReceivables - b.value.totalReceivables
            }))
            .enter()
            .append('section')
            .attr("id", function(d) {
                return d.key.replace(/ /g, "").toLowerCase()
            })
            .style('width', legendRectSize)
            .style('height', legendRectSize)
            .style("fill", function(d) {
                return ramp(d.value.totalReceivables)
            })
            .style('background', function(d) {
                return ramp(d.value.totalReceivables)
            })
            .append('article')
            // .data(locationCount)
            // .enter()
            // .attr('x', legendRectSize + legendSpacing)
            // .attr('y', legendRectSize - legendSpacing)

        .html(function(d) {
                if (d.value.totalReceivables < 0) {
                    return d.key + ": <a><span style='color:#2daf2d'> " + symbol + "(" + formatMoney(d.value.totalReceivables.toFixed(0).replace("-", "")) + ")</span></a>"
                } else {
                    return d.key + ": <a>" + symbol + formatMoney(d.value.totalReceivables) + "</a>"
                }
            })
            // .html(function(d) { // console.log(d); return d.key + ": <a>" + d.value.totalReceivables; + "</a>" });
        var projection = d3.geoAlbers()
            .scale(1)
            .translate([0, 0])
            .rotate([0, 50]);


        var path = d3.geoPath()
            .projection(projection);

        var svg = d3.select("#fourth").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("data/map_data/UAE.json", function(error, topology) {
            if (error) throw error;
            // console.log(topology)
            var states = topojson.feature(topology, topology.objects.ARE_adm1)
            var continents = topojson.feature(topology, topology.objects.ARE_adm1).features;
            // state = states.features.filter(function(d) { return d.id === 34; })[0];



            for (var i = 0; i < locationCount.length; i++) {

                // Grab State Name
                var dataState = locationCount[i].key;
                // console.log(dataState)
                // Grab data value 
                var dataValue = locationCount[i].value.totalReceivables;

                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < states.features.length; j++) {
                    var jsonState = states.features[j].properties.NAME_1.toUpperCase()
                        // console.log(jsonState)
                    if (dataState == jsonState) {

                        // Copy the data value into the JSON
                        states.features[j].properties.financial = dataValue;

                        // Stop looking through the JSON
                        break;
                    }
                }
            }
            // console.log(states)
            // projection
            var b = path.bounds(states),
                s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

            projection
                .scale(s)
                .translate(t);

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


            svg.append("path")
                .datum(states)
                .style("display", "none")
                .attr("id", function(d) {
                    return d.features[0].properties.NAME_1.replace(/ /g, "").toLowerCase()
                })
                .attr("d", path)
                // .style("fill", function(d, i) {return $("#"+d.properties.NAME_1.replace(/ /g,"").toLowerCase()).css('fill') });

            svg.append("path")
                .datum(topojson.mesh(topology, topology.objects.ARE_adm1, function(a, b) {
                    return a !== b;
                }))
                .attr("class", "mesh")
                .attr("d", path)


            svg.append("path")
                .datum(states)
                .attr("class", "outline")
                .attr("d", path);

            svg.selectAll(".continent")
                .data(continents)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", function(d) {
                    return d.properties.NAME_1.replace(/ /g, "").toLowerCase()
                })
                .attr("title", function(d, i) {
                    //// console.log(d.properties.continent)
                    return d.properties.ARE_adm1;
                })
                .style("fill", function(d, i) {
                    return $("#" + d.properties.NAME_1.replace(/ /g, "").toLowerCase()).css('fill')
                })
                .on("mouseover", function(d) { // console.log(d);		
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(function() {
                        if (d.properties.financial < 0) {
                            return d.properties.NAME_1 + "<br /><a><span style='color:#2daf2d'>" + symbol + "(" + formatMoney(d.properties.financial.toFixed(0).replace("-", "")) + ")</span></a>"
                        } else {
                            return d.properties.NAME_1 + "<br /><a>" + symbol + formatMoney(d.properties.financial) + "</a>"
                        }
                    })

                    // .html(d.properties.NAME_1+ "<br />"+)	
                    .style("left", (d3.event.pageX - $(".tooltip").width() - 20) + "px")
                        .style("top", (d3.event.pageY + 10) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

        });

    })
}



function sideAnalytics() {


    $(".side *").remove()
    $(".lower-content *").remove()
    var sect = document.getElementById("currencySelector");
    var country = sect.options[sect.selectedIndex].value;
    var countryName = sect.options[sect.selectedIndex].id;
    // console.log(country)
    if (countryName == "AED") {
        var symbol = "د.إ"
    } else {
        var symbol = "$"
    }
    // console.log(countryName)
    d3.csv("data/" + urlVars.data + "/data.csv", function(data) {

  // Iterate over array
        data.forEach(function(e, i) {
            // Iterate over the keys of object
            Object.keys(e).forEach(function(key) {

                // Copy the value
                var val = e[key],
                    newKey = key.replace(/\s+/g, '');

                // Remove key-value from object
                delete data[i][key];

                // Add value with new key
                data[i][newKey] = val;
            });
        });

        var receivables = data.filter(function(d) {
            return d.TransactionTypeCode == "receivable";
        })
        var payables = data.filter(function(d) {
                return d.TransactionTypeCode == "payable";
            })
            // console.log(receivables,payables)
        var invoiceData = data
        var expenseMetrics = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .rollup(function(v) {
                return {
                    payableCount: v.length,
                    totalTransactions: d3.sum(v, function(d) {
                        return d.TransactionAmountNet;
                    }),
                    totalTax: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),
                    // taxRate: (totalReceivables/totalPayable)
                    // avg: d3.mean(v, function(d) { return d.amount; })
                };
            })
            .entries(payables);


        var receivableMetrics = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .rollup(function(v) {
                return {
                    receivableCount: v.length,
                    totalTransactions: d3.sum(v, function(d) {
                        return d.TransactionAmountNet;
                    }),
                    totalTax: d3.sum(v, function(d) {
                        return d.TransactionAmountTax;
                    }),
                    // taxRate: (totalReceivables/totalPayable)
                    // avg: d3.mean(v, function(d) { return d.amount; })
                };
            })
            .entries(receivables);

        // // console.log(expenseMetrics)
        // console.log(receivableMetrics)



        var receivableMetrics = receivableMetrics.map(receivableMetrics => ({

            region: receivableMetrics.key,
            total_Receivable_Tax: receivableMetrics.value.totalTax,
            total_Receivable_Transactions: receivableMetrics.value.totalTransactions,
            tax_Receivable_Rate: receivableMetrics.value.totalTax / receivableMetrics.value.totalTransactions,
            receivableCount: receivableMetrics.value.receivableCount


        }))

        var expenseMetrics = expenseMetrics.map(expenseMetrics => ({

                region: expenseMetrics.key,
                total_Payable_Tax: expenseMetrics.value.totalTax,
                total_Payable_Transactions: expenseMetrics.value.totalTransactions,
                tax_Payable_Rate: expenseMetrics.value.totalTax / expenseMetrics.value.totalTransactions,
                payableCount: expenseMetrics.value.payableCount


            }))
            // console.log(receivableMetrics)

        // console.log(expenseMetrics)

        var result = [receivableMetrics, expenseMetrics].reduce((a, b) => a.map((c, i) => Object.assign({}, c, b[i])));

        // console.log(result);

        var payableData = invoiceData.filter(function(d) {
            return d.TransactionTypeCode == "payable";
        })

        payableData.sort(function(a, b) {
            return b.TransactionAmountTax - a.TransactionAmountTax
        })
        var size = 10;
        var payableData = payableData.slice(0, size)


        var dataNest = d3.nest()
            .key(function(d) {
                return d.EntityCode;
            })
            .key(function(d) {
                return d.ReportingDate;
            })
            .rollup(function(v) {
                return d3.sum(v, function(d) {
                    return d.TransactionAmountTax;
                });
            })
            .entries(data);

        // var color = d3.scaleOrdinal(["rgb(0, 153, 196)", "rgb(63, 125, 152)", "rgb(238, 49, 36)", "rgb(250, 165, 43)"]);


        // dataNest.forEach(function(d, i) {

        //     // svg.append("path")
        //     //     .attr("class", "line")
        //     //     .style("stroke", function() { // Add the colours dynamically
        //     //         return d.color = color(d.key); })
        //     //     .attr("d", priceline(d.values));

        //     // Add the Legend



console.log(payableData)
        // });


        // console.log(payableData)
        d3.select(".side").append("h2").html("Top 10 Invoices")

        var invoices = d3.selectAll(".side")
            .append("ul")

        invoices.selectAll(".side")
            .data(payableData)
            .enter()
            .append("div")
            .attr("class", "li-holder ")
            .append("li")
            .append("b")
            .classed("invoice", true)
            .html(d => "<b>Invoice Date: </b>" + d.InvoiceDate)

        invoices.selectAll(".invoice").append("div").html(d => "<b>Reported: </b>" + d.ReportingDate)
        invoices.selectAll(".invoice").append("div").html(d => "<b>ID: </b>" + d.InvoiceID)

        invoices.selectAll(".invoice").append("div").html(function(d) {
            // console.log(d);
            if (d.TransactionAmountTax < 0) {
                return "<b>Tax: </b><span style='color:#2daf2d'> " + symbol + "(" + formatMoney((d.TransactionAmountTax * parseInt(country)).replace("-", "")) + ")</span>"
            } else {
                return "<b>Tax: </b> " + symbol + formatMoney(d.TransactionAmountTax * parseInt(country))
            }
        })
        invoices.selectAll(".invoice").append("div").html(function(d) {
            if (d.TransactionAmountNet < 0) {
                return "<b>Net: </b><span style='color:#2daf2d'> " + symbol + "(" + formatMoney((d.TransactionAmountNet * parseInt(country)).replace("-", "")) + ")</span>"
            } else {
                return "<b>Net: </b> " + symbol + formatMoney(d.TransactionAmountNet * parseInt(country))
            }
        })

        // invoices.selectAll(".invoice").append("div").html(d=>"<b>Net: </b> $"+ d.TransactionAmountNet)   
        // invoices.selectAll(".invoice").append("div").html(d => "<b>Currency: </b>" + d.TransactionCurrency)
        invoices.selectAll(".invoice").append("div").html(function(d) {
            // console.log(d);
            if (d.Emirate.length != "") {
                return "<b>Region: </b>" + d.Emirate
            } else {
                return "<b>Region: </b>"+ d.EntityCode.split('_')[0]
            }
        })


        var sideAnalytics = d3.selectAll(".lower-content")
            .append("ul")

        sideAnalytics.selectAll(".lower-content")
            .data(result)
            .enter()
            .append("div")
            .attr("class", "li-holder ")
            // .attr("value", d => d.StateCode)
            .attr("id", d => d.region)
            // .attr("name", d=> d.Flag)
            .append("li")
            .append("b")
            .classed("region", true)
            .html(d => d.region.replace(/_/g, " Entity "))


        sideAnalytics.selectAll("li").classed("divider", true).append("div").classed("section", true)
        sideAnalytics.selectAll(".section").append("div").attr("id", "payable_section").html("Payables")
        sideAnalytics.selectAll(".section").append("div").attr("id", "receivables_section").html("receivables")
        sideAnalytics.selectAll("#payable_section").append("div").html(d => "<strong>Transactions:</strong> <div>" + d.payableCount + "</div>")
        sideAnalytics.selectAll("#payable_section").append("div").html(function(d) {
            if (d.total_Payable_Tax < 0) {
                return "<strong>VAT: </strong><span style='color:#2daf2d'> " + symbol + "(" + formatMoney((d.total_Payable_Tax * parseInt(country)).toFixed(2).replace("-", "")) + ")</span>"
            } else {
                return "<strong>VAT: </strong> <span>" + symbol + formatMoney((d.total_Payable_Tax * parseInt(country)).toFixed(2)) + "</span>"
            }
        })

        // d=>"<strong>Tax:</strong> $"+d.total_Payable_Tax.toFixed(2))   

        sideAnalytics.selectAll("#payable_section").append("div")
            .html(function(d) {
                if (d.total_Payable_Transactions < 0) {
                    return "<strong>Net: </strong><div><span style='color:#2daf2d'> " + symbol + "(" + formatMoney((d.total_Payable_Transactions * parseInt(country)).toFixed(2).replace("-", "")) + ")</span></div>"
                } else {
                    return "<strong>Net: </strong><span>" + symbol + formatMoney((d.total_Payable_Transactions * parseInt(country)).toFixed(2)) + "</span>"
                }
            })
            // .html(d=>"<strong>Transactions:</strong> <div>$"+d.total_Payable_Transactions.toFixed(2)+"</div>")   
        sideAnalytics.selectAll("#payable_section").append("div").style("border-bottom", "none").html(function(d) {
                if (d.tax_Payable_Rate < 0) {
                    return "<strong>ETR: </strong><span style='color:#2daf2d'> (" + d.tax_Payable_Rate.toFixed(2).replace("-", "") + "%)</span>"
                } else {
                    return "<strong>ETR: </strong> <span>" + (d.tax_Payable_Rate * 100).toFixed(2) + "%</span>"
                }
            })
            // .html(d=>"<strong>Tax Rate:</strong> "+d.tax_Payable_Rate.toFixed(2) + "%")   


        sideAnalytics.selectAll("#receivables_section").append("div").html(d => "<strong>Transactions:</strong> <div>" + d.receivableCount + "</div>")

        sideAnalytics.selectAll("#receivables_section").append("div").html(function(d) {
                if (d.total_Receivable_Tax < 0) {
                    return "<strong>VAT: </strong><span style='color:#2daf2d'> " + symbol + "(" + formatMoney(d.total_Receivable_Tax.toFixed(2).replace("-", "")) + ")</span>"
                } else {
                    return "<strong>VAT: </strong> <span>" + symbol + formatMoney(d.total_Receivable_Tax.toFixed(2)) + "</span>"
                }
            })
            // .html(d=>"<strong>Tax:</strong> $"+d.total_Receivable_Tax.toFixed(2))   

        sideAnalytics.selectAll("#receivables_section").append("div").html(function(d) {
                if (d.tax_Receivable_Rate < 0) {
                    return "<strong>Net: </strong><span style='color:#2daf2d'> " + symbol + "(" + formatMoney(d.total_Receivable_Transactions.toFixed(2).replace("-", "")) + "</span>"
                } else {
                    return "<strong>Net: </strong> <span>" + symbol + formatMoney(d.total_Receivable_Transactions.toFixed(2)) + "</span>"
                }
            })
            // .html(d=>"<strong>Net:</strong> <div>$"+formatMoney(d.total_Receivable_Transactions.toFixed(2))+"</div>")   
        sideAnalytics.selectAll("#receivables_section").append("div").style("border-bottom", "none").html(function(d) {
                if (d.tax_Receivable_Rate < 0) {
                    return "<strong>ETR: </strong><span style='color:#2daf2d'> (" + d.tax_Receivable_Rate.toFixed(2).replace("-", "") + "%)</span>"
                } else {
                    return "<strong>ETR: </strong> <span>" + (d.tax_Receivable_Rate * 100).toFixed(2) + "%</span>"
                }
            })
            // .html(d=>"<strong>Tax Rate:</strong> "+d.tax_Receivable_Rate.toFixed(2) + "%")   


    })
}
$("#goodAxis").clone().appendTo("#receivables svg");
// handle upload button
function upload_button(el, callback) {
    var uploader = document.getElementById(el);
    var reader = new FileReader();

    reader.onload = function(e) {
        var contents = e.target.result;
        callback(contents);
    };

    uploader.addEventListener("change", handleFiles, false);

    function handleFiles() {
        // d3.select("body").text("loading...");
        var file = this.files[0];
        reader.readAsText(file);
    };
};