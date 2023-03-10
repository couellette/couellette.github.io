// Configuration. Don't delete this.
import "./internal/configure";
import pym from "pym.js";

// `polling` tells pym to update the height of the iframe, according to the size
// of its content, at a regular interval. You can adjust this value, or totally
// remove it, depending on how your content is resizing.
// See http://blog.apps.npr.org/pym.js/api/pym.js/1.3.2/module-pym.Child.html.
const pymChild = new pym.Child({
    polling: 500
}); // eslint-disable-line no-unused-vars

// Your code goes here
import jquery from "./internal/jquery";
import font_awesome from "./internal/font-awesome";

import * as d3 from "d3";
import {
    event as currentEvent
} from "d3";
jquery(function() {
    const number = d3.format(".2s")
    const wholenumber = d3.format(".0f");
    var running = false;
    var timer;
    const color4 = "rgb(255, 178, 0)";
    const color3 = "rgb(255, 128, 0)";
    const color1 = "rgb(0, 93, 162)";
    const color2 = "rgb(0, 153, 196)";
    const color5 = "#FFFFFF";
    const color6 = "#AFAFAF";
    const color7 = "#666666";
    const color = d3.scaleOrdinal().range([color1, color2, color3, color4]);

    const z = d3.scaleOrdinal().range([color1, color2, color3, color4]);

    var year = jquery("#TRL_slider").val();

    var update8 = function() {
        d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", sales => {
            var formatValue = d3.format(".0s");
            var select = document.getElementById("TRL_locations");
            var newLocation = select.value;

            sales = sales.filter(function row(d, i) {
                if (i < 33) return d;
            });

            var sales = sales.map(sales => ({
                Year: sales.Year.replace("_sales", ""),
                Gasoline: parseInt(sales[newLocation + "_Gasoline"]),
                Diesel: parseInt(sales[newLocation + "_Diesel"]),
                BEV: parseInt(sales[newLocation + "_BEV"]),
                Hybrid: parseInt(sales[newLocation + "_Hybrid"])
            }));

            var newsale = sales.map(sales => ({
                Year: sales.Year,
                Gasoline2: sales.Gasoline / 3000000,
                Diesel2: sales.Diesel / 3000000,
                BEV2: sales.BEV / 3000000,
                Hybrid2: sales.Hybrid / 3000000
            }));

            var car2_sales = d3.select("#TRL_sale");
            var car2_esales = d3.select("#TRL_esale");

            var year = jquery("#TRL_slider").val();

            var cars2 = car2_sales
                .selectAll("#TRL_sale")
                .data(newsale.filter(d => d.Year == year))
                .enter();

            var ecars2 = car2_esales
                .selectAll("#TRL_esale")
                .data(newsale.filter(d => d.Year == year))
                .enter();

            jquery("#TRL_sale svg").remove();
            jquery("#TRL_esale svg").remove();

            var gasoline2 = cars2
                .selectAll("bar")
                .data(newsale.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Gasoline2))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color1)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var diesel2 = cars2
                .selectAll("bar")
                .data(newsale.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Diesel2))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color2)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var bev2 = ecars2
                .selectAll("bar")
                .data(newsale.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.BEV2))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color3)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var hybrid2 = ecars2
                .selectAll("bar")
                .data(newsale.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Hybrid2))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color4)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );
        });
    };

    var update9 = function() {
        d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
            var formatValue = d3.format(".0s");
            var select = document.getElementById("TRL_locations");
            var newLocation = select.value;

            fleet = fleet.filter(function row(d, i) {
                if (i > 32) return d;
            });

            var fleet = fleet.map(fleet => ({
                Year: fleet.Year.replace("_fleet", ""),
                Gasoline: parseInt(fleet[newLocation + "_Gasoline"]),
                Diesel: parseInt(fleet[newLocation + "_Diesel"]),
                BEV: parseInt(fleet[newLocation + "_BEV"]),
                Hybrid: parseInt(fleet[newLocation + "_Hybrid"])
            }));

            var newfleet = fleet.map(fleet => ({
                Year: fleet.Year,
                Gasoline: fleet.Gasoline / 3000000,
                Diesel: fleet.Diesel / 3000000,
                BEV: fleet.BEV / 3000000,
                Hybrid: fleet.Hybrid / 3000000
            }));

            var car_sales = d3.select("#TRL_cars");
            var ecar_sales = d3.select("#TRL_ecars");

            var year = jquery("#TRL_slider").val();

            var cars = car_sales
                .selectAll("#TRL_cars")
                .data(newfleet.filter(d => d.Year == year))
                .enter();

            var ecars = ecar_sales
                .selectAll("#TRL_ecars")
                .data(newfleet.filter(d => d.Year == year))
                .enter();

            jquery("#TRL_cars svg").remove();
            jquery("#TRL_ecars svg").remove();

            var gasoline = cars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Gasoline))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color1)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var diesel = cars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Diesel))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color2)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var bev = ecars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.BEV))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color3)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var hybrid = ecars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Hybrid))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color4)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );
        });
    };

    var update5 = function() {
        jquery("#TRL_fleet .TRL_serie").remove();
        d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
            var formatValue = d3.format(".0s");
            var select = document.getElementById("TRL_locations");
            var newLocation = select.value;

            fleet = fleet.filter(function row(d, i) {
                if (i > 32) return d;
            });

            var fleet = fleet.map(fleet => ({
                Year: fleet.Year.replace("_fleet", ""),
                Gasoline: parseInt(fleet[newLocation + "_Gasoline"]),
                Diesel: parseInt(fleet[newLocation + "_Diesel"]),
                BEV: parseInt(fleet[newLocation + "_BEV"]),
                Hybrid: parseInt(fleet[newLocation + "_Hybrid"])
                    // image: "https://d30y9cdsu7xlg0.cloudfront.net/png/996-200.png"
            }));

            var newfleet = fleet.map(fleet => ({
                Year: fleet.Year,
                Gasoline: fleet.Gasoline / 3000000,
                Diesel: fleet.Diesel / 3000000,
                BEV: fleet.BEV / 3000000,
                Hybrid: fleet.Hybrid / 3000000
            }));
            jquery("#TRL_fleet svg").remove();
            var svg3 = d3
                .select("#TRL_fleet")
                .append("svg")
                .attr("height", "150")
                .attr("width", "1030"),
                margin = {
                    top: 20,
                    right: 70,
                    bottom: 30,
                    left: 40
                },
                width = +svg3.attr("width") - margin.left - margin.right,
                height = +svg3.attr("height") - margin.top - margin.bottom,
                g = svg3
                .append("g")
                .attr(
                    "transform",
                    "translate(" + margin.left + "," + margin.top + ")"
                );

            var car_sales = d3.select("#TRL_cars");
            var ecar_sales = d3.select("#TRL_ecars");

            var year = jquery("#TRL_slider").val();

            var cars = car_sales
                .selectAll("#TRL_cars")
                .data(newfleet.filter(d => d.Year == year))
                .enter();

            var ecars = ecar_sales
                .selectAll("#TRL_ecars")
                .data(newfleet.filter(d => d.Year == year))
                .enter();

            var x = d3
                .scaleBand()
                .rangeRound([0, width])
                .padding(0.3)
                .align(0.3);

            var y = d3.scaleLinear().rangeRound([height, 0]);

            var stack = d3.stack();

            x.domain(fleet.map(d => d.Year));
            y.domain([0, 2000000000]).nice();
            z.domain(["Gasoline", "Diesel", "BEV", "Hybrid"]);

            g
                .selectAll(".TRL_serie")
                .data(stack.keys(["Gasoline", "Diesel", "BEV", "Hybrid"])(fleet))
                .enter()
                .append("g")
                .attr("class", "TRL_serie")
                .attr("fill", d => z(d.key))
                .selectAll("rect")
                .data(d => d)
                .enter()
                .append("rect")
                .attr("class", d => d.data.Year)
                .attr("x", d => x(d.data.Year))
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .attr("width", x.bandwidth() + 6)
                .on("click", function() {
                    jquery("rect").attr("id", "TRL_fade");
                    jquery("." + jquery(this).attr("class")).attr("id", "TRL_show");
                    jquery("#TRL_slider").val(jquery(this).attr("class"));
                    jquery("#TRL_slider").trigger("change");
                    // d3.select("body").append("hr")
                });

            g
                .append("g")
                .attr("class", "TRL_axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(
                    d3.axisBottom(x).tickFormat(function(d, i) {
                        return ticks[i];
                    })
                );

            d3.selectAll("#fleet g text").attr("x", 1);

            d3.selectAll("g.tick line").style("stroke", "none");
            g
                .append("g")
                .attr("class", "TRL_axis axis--y")
                .call(
                    d3
                    .axisLeft(y)
                    .ticks(5, "s")
                    .tickFormat(d => formatValue(d).replace("G", "B"))
                )
                .append("text")
                .attr("x", 15)
                .attr("y", -5)
                .attr("dy", "0.35em")
                .attr("text-anchor", "start")
                .attr("fill", "#000")
                .text("Distribution of vehicles on the road")
                .attr("id", "TRL_title-fleet");

            jquery("#TRL_cars svg").remove();
            jquery("#TRL_ecars svg").remove();

            var gasoline = cars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Gasoline))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color1)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var diesel = cars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Diesel))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color2)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var bev = ecars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.BEV))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color3)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );

            var hybrid = ecars
                .selectAll("bar")
                .data(newfleet.filter(d => d.Year == year))
                .enter()
                .selectAll("div")
                .data(d => d3.range(d.Hybrid))
                .enter()
                .append("svg")
                .classed("svg-inline--fa fa-car fa-w-16", true)
                .style("color", color4)
                .attr("aria-hidden", "true")
                .attr("data-prefix", "fas")
                .attr("data-icon", "car")
                .attr("role", "img")
                .style("font-size", "15px")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", "0 0 512 512")
                .append("path")
                .attr("fill", "currentColor")
                .attr(
                    "d",
                    "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
                );
        });
    };

    var update10 = function() {
        jquery("#TRL_c02 .browser").remove();

        d3.csv("../data/multi-area-2018.csv", function(error, data) {
            var margin = {
                    top: 20,
                    right: 90,
                    bottom: 30,
                    left: 40
                },
                width = 1030 - margin.left - margin.right,
                height = 160 - margin.top - margin.bottom;
            var formatValue = d3.format(".0s");

            var parseDate = d3.timeParse("%Y");

            var formatSi = d3.format(".3s");

            var formatNumber = d3.format(".1f");
            var select = document.getElementById("TRL_locations");
            var newLocation = select.value;

            if (newLocation != "Global") {
                var keys = [newLocation + "_C02"];
            } else {
                var keys = [
                    "Africa_C02",
                    "Asia/_Oceania_exc._China_C02",
                    "Central_and_South_America_C02",
                    "China_C02",
                    "Europe_C02",
                    "Middle_East_C02",
                    "North_America_C02",
                    "Russia_Turkey_other_Europe_C02"
                ];
                //run function2
            }

            // jquery("#TRL_c02 svg").remove()
            // console.log(fleet)

            var year = jquery("#TRL_slider").val();

            data.forEach(function(d) {
                d.date = parseDate(d.date);
            });

            var x = d3.scaleTime().range([0, width]);

            var y = d3.scaleLinear().range([height, 0]);

            const Africa = "#242424";
            const Asia = "#323232";
            const South_America = "#414141";
            const China = "#4f4f4f";
            const Europe = "#5e5e5e";
            const Middle_East = "#6c6c6c";
            const North_America = "#7b7b7b";
            const Russia = "#8a8a8a";

            const Newcolor = d3
                .scaleOrdinal()
                .range([
                    Africa,
                    Asia,
                    South_America,
                    China,
                    Europe,
                    Middle_East,
                    North_America,
                    Russia
                ]);

            var xAxis = d3.axisBottom().scale(x);

            var yAxis = d3.axisLeft().scale(y);
            // .tickFormat(formatBillion);

            var area = d3
                .area()
                .x(function(d) {
                    return x(d.data.date);
                })
                .y0(function(d) {
                    return y(d[0]);
                })
                .y1(function(d) {
                    return y(d[1]);
                });

            var stack = d3.stack();

            var svg2 = d3.select("#TRL_c02");
            // .attr('width', width + margin.left + margin.right)
            // .attr('height', height + margin.top + margin.bottom)
            // .append('g')
            // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            var g = svg2.select("g");
            var maxDateVal = d3.max(data, function(d) {
                var vals = d3.keys(d).map(function(key) {
                    return key !== "date" ? d[key] : 0;
                });
                return d3.sum(vals);
            });
            // console.log(maxDateVal)
            // Set domains for axes
            x.domain(
                d3.extent(data, function(d) {
                    return d.date;
                })
            );
            var ticks = [
                2018,
                "'19",
                "’20",
                "'21",
                "'22",
                "'23",
                "'24",
                "'25",
                "'26",
                "'27",
                "'28",
                "'29",
                "'30",
                "'31",
                "'32",
                "'33",
                "'34",
                "'35",
                "'36",
                "'37",
                "'38",
                "'39",
                2040
            ];

            y.domain([0, 3400000000]);

            stack.keys(keys);

            stack.order(d3.stackOrderNone);
            stack.offset(d3.stackOffsetNone);

            // console.log(stack(data));

            var browser2 = g
                .selectAll(".browser")
                .data(stack(data))
                .enter()
                .append("g")
                .attr("class", function(d) {
                    return "browser " + d.key;
                })
                .attr("fill-opacity", 0.8);

            browser2
                .append("path")
                .attr("class", "TRL_area")
                .attr("d", area)
                .attr("dx", 100)
                .style("fill", function(d) {
                    return Newcolor(d.key);
                });
        });
    };

    var update11 = function() {
        jquery("#TRL_twh .browser").remove();
        d3.csv("../data/multi-area-2018.csv", function(error, twhdata) {
            var margin = {
                    top: 20,
                    right: 90,
                    bottom: 30,
                    left: 40
                },
                width = 1030 - margin.left - margin.right,
                height = 160 - margin.top - margin.bottom;
            formatValue = d3.format(".0s");
            var select = document.getElementById("TRL_locations");
            var newLocation = select.value;
            var formatValue = d3.format(".0s");

            var parseDate = d3.timeParse("%Y");

            var formatSi = d3.format(".3s");

            var formatNumber = d3.format(".1f");
            // console.log(fleet)
            if (newLocation != "Global") {
                var keys = [newLocation + "_TWh"];
            } else {
                var keys = [
                    "Africa_TWh",
                    "Asia/_Oceania_exc._China_TWh",
                    "Central_and_South_America_TWh",
                    "China_TWh",
                    "Europe_TWh",
                    "Middle_East_TWh",
                    "North_America_TWh",
                    "Russia_Turkey_other_Europe_TWh"
                ];
                //run function2
            }

            var year = jquery("#TRL_slider").val();

            twhdata.forEach(function(d) {
                d.date = parseDate(d.date);
            });

            var x = d3.scaleTime().range([0, width]);

            var y = d3.scaleLinear().range([height, 0]);

            const Africa2 = "#0099C4";
            const Asia2 = "#0090bf";
            const South_America2 = "#0087ba";
            const China2 = "#007fb5";
            const Europe2 = "#0076b0";
            const Middle_East2 = "#006eab";
            const North_America2 = "#0065a6";
            const Russia2 = "#005da2";

            const colorScale = d3
                .scaleOrdinal()
                .range([
                    Africa2,
                    Asia2,
                    South_America2,
                    China2,
                    Europe2,
                    Middle_East2,
                    North_America2,
                    Russia2
                ]);

            var xAxis = d3.axisBottom().scale(x);

            var yAxis = d3.axisLeft().scale(y);
            // .tickFormat(formatBillion);

            var area = d3
                .area()
                .x(function(d) {
                    return x(d.data.date);
                })
                .y0(function(d) {
                    return y(d[0]);
                })
                .y1(function(d) {
                    return y(d[1]);
                });

            var stack = d3.stack();

            var svg = d3.select("#TRL_twh");
            var g = svg.select("g");

            var maxDateVal = d3.max(twhdata, function(d) {
                var vals = d3.keys(d).map(function(key) {
                    return key !== "date" ? d[key] : 0;
                });
                return d3.sum(vals);
            });

            // console.log(maxDateVal)
            // Set domains for axes
            x.domain(
                d3.extent(twhdata, function(d) {
                    return d.date;
                })
            );
            var ticks = [
                2018,
                "'19",
                "’20",
                "'21",
                "'22",
                "'23",
                "'24",
                "'25",
                "'26",
                "'27",
                "'28",
                "'29",
                "'30",
                "'31",
                "'32",
                "'33",
                "'34",
                "'35",
                "'36",
                "'37",
                "'38",
                "'39",
                "'40",
                "'41",
                "'42",
                "'43",
                "'44",
                "'45",
                "'46",
                "'47",
                "'48",
                "'49",
                2050
            ];

            y.domain([0, 3000]);

            stack.keys(keys);

            stack.order(d3.stackOrderNone);
            stack.offset(d3.stackOffsetNone);

            // console.log(stack(twhdata));

            var browser = g
                .selectAll(".browser")
                .data(stack(twhdata))
                .enter()
                .append("g")
                .attr("class", function(d) {
                    return "browser " + d.key;
                })
                .attr("fill-opacity", 0.8);

            browser
                .append("path")
                .attr("class", "TRL_area")
                .attr("d", area)
                .attr("dx", 100)
                .style("fill", function(d) {
                    return colorScale(d.key);
                });
        });
    };

    var margin = {
            top: 50,
            right: 30,
            bottom: 100,
            left: 50
        },
        width = 960 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    var t = d3.scaleLinear().range([20, width - 5]);

    var zAxis = d3
        .axisBottom(t)
        .ticks(20)
        .tickFormat(d3.format("d"));

    var svgtime = d3
        .select("#TRL_timeline")
        .append("svg")
        .attr("class", "TRL_chart")
        // .attr("viewBox", "0 0 ")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", 45 )");

    t.domain(["2018", "2050"]);
    // var ticks = [2018, "'19", "’20", "'21", "'22", "'23", "'24", "'25", "'26", "'27", "'28", "'29", "'30", "'31", "'32", "'33", "'34", "'35", "'36", "'37", "'38", "'39", "'40", "'41", "'42", "'43", "'44", "'45", "'46", "'47", "'48", "'49", 2050];
    // var ticks = [2018, "", "", "", "", "", "", 2025, "", "", "", "", 2030, "", "", "", "", 2035, "", "", "", "", 2040, "", "", "", "", 2045, "", "", "", "", 2050];
    var ticks = [
        2018,
        "'",
        "'",
        "'",
        "'",
        "'",
        "'",
        2025,
        "'",
        "'",
        "'",
        "'",
        2030,
        "'",
        "'",
        "'",
        "'",
        2035,
        "'",
        "'",
        "'",
        "'",
        2040,
        "'",
        "'",
        "'",
        "'",
        2045,
        "'",
        "'",
        "'",
        "'",
        2050
    ];

    svgtime
        .append("g")
        .attr("class", "TRL_z axis")
        .attr("transform", "translate(0," + 200 + ")")
        .call(
            d3
            .axisBottom(t)
            .ticks(30)
            .tickFormat(function(d, i) {
                return ticks[i];
            })
        );

    jquery(".TRL_annotation1").on("mouseover", function() {
        jquery(".TRL_an1, .an1-line")
            .css("opacity", 1)
            .css("z-index", "100000000000000");
    });
    jquery(".TRL_annotation1").on("mouseout", function() {
        jquery(".TRL_an1, .an1-line")
            .css("opacity", "0")
            .css("z-index", 0);
    });

    jquery(".TRL_annotation2").on("mouseover", function() {
        jquery(".TRL_an2, .an2-line")
            .css("opacity", 1)
            .css("z-index", "100000000000000");
    });
    jquery(".TRL_annotation2").on("mouseout", function() {
        jquery(".TRL_an2, .an2-line")
            .css("opacity", "0")
            .css("z-index", 0);
    });

    jquery(".TRL_annotation3").on("mouseover", function() {
        jquery(".TRL_an3, .an3-line")
            .css("opacity", 1)
            .css("z-index", "100000000000000");
    });
    jquery(".TRL_annotation3").on("mouseout", function() {
        jquery(".TRL_an3, .an3-line")
            .css("opacity", "0")
            .css("z-index", 0);
    });

    jquery(".TRL_annotation4").on("mouseover", function() {
        jquery(".TRL_an4, .an4-line")
            .css("opacity", 1)
            .css("z-index", "100000000000000");
    });
    jquery(".TRL_annotation4").on("mouseout", function() {
        jquery(".TRL_an4, .an4-line")
            .css("opacity", "0")
            .css("z-index", 0);
    });



    jquery("button").on("click", function() {

        jquery("button").removeClass("TRL_pause")
        var sliderValue = jquery("#TRL_slider").val();


        if (jquery("#TRL_slider").val() == 2050) {
            jquery("#TRL_slider").val("2018").trigger('change')
            jquery("#TRL_invis-slider").val("2018").trigger('change')
            var sliderValue = jquery("#TRL_slider").val();
            d3.select(".TRL_tooltip-container")
                .style("left", parseInt(jquery("." + sliderValue).attr("x")) + 50 + "px");
        }
        console.log(jquery("#TRL_slider").val())
        if (jquery("#TRL_slider").val() > 2018) {
            if (jquery("button").html() == "►") {

                sliderValue = (parseInt(jquery("#TRL_slider").val()) + 1)
                jquery("#TRL_range").html(sliderValue);
            } else {
                sliderValue = jquery("#TRL_slider").val();
            }
        }





        jquery("#TRL_slider").val(sliderValue);
        jquery("#TRL_invis-slider").val(sliderValue);
        var select = document.getElementById("TRL_locations");
        var newLocation = select.value;

        d3
            .select(".TRL_tooltip-container")
            .style("display", "inline")
            .style("left", parseInt(jquery("." + sliderValue).attr("x")) + 50 + "px");
        // .select(".TRL_tool-tip-line")

        d3.csv("../data/multi-area-2018.csv", data => {
            var year = jquery("#TRL_slider").val();
            var formatValue = d3.format(".0s");

            d3
                .select(".TRL_tooltip-container")
                .select(".TRL_C02-tip")
                .html(
                    (d, i) =>
                    newLocation.replace(/_/g, " ") +
                    " C0<sub>2</sub> Emissions: <b>" +
                    number(data[year - 2018][newLocation + "_C02"]).replace("G", "B") +
                    "</b>"
                );

            d3
                .select(".TRL_TWh-tip")
                .html(
                    (d, i) =>
                    newLocation.replace(/_/g, " ") +
                    " Electricity (TWh) Required: <b>" +
                    number(data[year - 2018][newLocation + "_TWh"]).replace("k","K") +
                    "</b>"
                );
        });

        d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
            var year = jquery("#TRL_slider").val();
            d3
                .select(".TRL_tooltip-container")
                .select(".TRL_fleet-tip")
                .html(
                    (d, i) =>

                    newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color3 + "'>Electric:</span> <b>" +
                    number(fleet[year - 1985][newLocation + "_BEV"]).replace("G", "B") +
                    "</b><br />" + newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color4 + "'>Hybrid:</span> <b>" +
                    number(fleet[year - 1985][newLocation + "_Hybrid"]).replace("G", "B") +
                    "</b><br />" +
                    newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color2 + "'>Diesel:</span> <b>" +
                    number(fleet[year - 1985][newLocation + "_Diesel"]).replace("G", "B") +
                    "</b><br />" +
                    newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color1 + "'>Gasoline:</span> <b class='TRL_final_number'>" +
                    number(fleet[year - 1985][newLocation + "_Gasoline"]).replace("G", "B")
                );
        });

        const duration = 2000,
            maxstep = 2050,
            minstep = 2018;
        // d3.select("#TRL_invis-slider").transition()
        //     .duration(500)
        //     .tween("value", function() {
        //         var i = d3.interpolate(minstep, maxstep);
        //         return function(t) {
        //             this.value = i(t);
        //         };
        //     });
        if (running == true) {
            jquery("button").html("►");
            running = false;
            clearInterval(timer);
        } else if (running == false) {
            jquery("button")
                .html("॥")
                .attr("class", "TRL_pause");
            var sliderValue = jquery("#TRL_slider").val();
            timer = setInterval(function() {
                if (sliderValue < maxstep) {
                    sliderValue++;
                    jquery("#TRL_slider").val(sliderValue);
                    jquery("#TRL_invis-slider").val(sliderValue);
                    jquery("#TRL_range").html(sliderValue);
                    jquery("#TRL_range2").html(sliderValue);
                    jquery("#TRL_range3").html(sliderValue);
                    jquery("#TRL_range4").html(sliderValue);
                }

                var year = jquery("#TRL_range").text();
                if (parseInt(year) > 2041) {
                    jquery(".TRL_tooltip-container").css("transform", "rotateY(180deg)");
                    jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
                        "transform",
                        "rotateY(180deg)"
                    );
                    jquery(".TRL_tool-tip-line").css("left", "-4px");
                } else {
                    jquery(".TRL_tooltip-container").css("transform", "rotateY(0deg)");
                    jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
                        "transform",
                        "rotateY(0deg)"
                    );
                    jquery(".TRL_tool-tip-line").css("left", "");
                }
                update8();
                update9();

                var select = document.getElementById("TRL_locations");
                var newLocation = select.value;

                d3
                    .select(".TRL_tooltip-container")
                    .style("display", "inline")
                    .style(
                        "left",
                        parseInt(jquery("." + sliderValue).attr("x")) + 50 + "px"
                    );

                d3.csv("../data/multi-area-2018.csv", data => {
                    var year = jquery("#TRL_slider").val();

                    d3
                        .select(".TRL_tooltip-container")
                        .select(".TRL_C02-tip")
                        .html(
                            (d, i) =>
                            newLocation.replace(/_/g, " ") +
                            " C0<sub>2</sub> Emissions: <b>" +
                            number(data[year - 2018][newLocation + "_C02"]).replace("G", "B") +
                            "</b>"
                        );

                    d3
                        .select(".TRL_TWh-tip")
                        .html(
                            (d, i) =>
                            newLocation.replace(/_/g, " ") +
                            " Electricity (TWh) Required: <b>" +
                            number(data[year - 2018][newLocation + "_TWh"]).replace("k","K") +
                            "</b>"
                        );
                });

                d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
                    var year = jquery("#TRL_slider").val();
                    d3
                        .select(".TRL_tooltip-container")
                        .select(".TRL_fleet-tip")
                        .html(
                            (d, i) =>

                            newLocation.replace(/_/g, " ") +
                            " <span style='color:" + color3 + "'>Electric:</span> <b>" +
                            number(fleet[year - 1985][newLocation + "_BEV"]).replace("G", "B") +
                            "</b><br />" + newLocation.replace(/_/g, " ") +
                            " <span style='color:" + color4 + "'>Hybrid:</span> <b>" +
                            number(fleet[year - 1985][newLocation + "_Hybrid"]).replace("G", "B") +
                            "</b><br />" +
                            newLocation.replace(/_/g, " ") +
                            " <span style='color:" + color2 + "'>Diesel:</span> <b>" +
                            number(fleet[year - 1985][newLocation + "_Diesel"]).replace("G", "B") +
                            "</b><br />" +
                            newLocation.replace(/_/g, " ") +
                            " <span style='color:" + color1 + "'>Gasoline:</span> <b class='TRL_final_number'>" +
                            number(fleet[year - 1985][newLocation + "_Gasoline"]).replace("G", "B")
                        );
                });


                if (jquery("#TRL_slider").val() > 2049) {
                    jquery("#TRL_play").html("►")
                    jquery("#TRL_play").removeClass("TRL_pause")
                }


            }, duration);
            running = true;
        }

    });

    // jquery("#TRL_locations").on("change", function() {
    //   // updateDonut()
    //   var year = jquery("#TRL_range").text();
    //   if (parseInt(year) > 2041) {
    //     jquery(".TRL_tooltip-container").css("transform", "rotateY(180deg)");
    //     jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
    //       "transform",
    //       "rotateY(180deg)"
    //     );
    //     jquery(".TRL_tool-tip-line").css("left", "-4px");
    //   } else {
    //     jquery(".TRL_tooltip-container").css("transform", "rotateY(0deg)");
    //     jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
    //       "transform",
    //       "rotateY(0deg)"
    //     );
    //     jquery(".TRL_tool-tip-line").css("left", "");
    //   }

    //   update5();
    //   // update6()
    //   update10();
    //   update11();
    //   update8();
    //   update9();

    //   function explode() {
    //     var sliderValue = jquery("#TRL_slider").val();
    //     var select = document.getElementById("TRL_locations");
    //     var newLocation = select.value;
    //     var year = jquery("#TRL_range").text();
    //     if (parseInt(year) > 2041) {
    //       jquery(".TRL_tooltip-container").css("transform", "rotateY(180deg)");
    //       jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
    //         "transform",
    //         "rotateY(180deg)"
    //       );
    //       jquery(".TRL_tool-tip-line").css("left", "-4px");
    //     } else {
    //       jquery(".TRL_tooltip-container").css("transform", "rotateY(0deg)");
    //       jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
    //         "transform",
    //         "rotateY(0deg)"
    //       );
    //       jquery(".TRL_tool-tip-line").css("left", "");
    //     }

    //     d3
    //       .select(".TRL_tooltip-container")
    //       .style("display", "inline")
    //       .style(
    //         "left",
    //         parseInt(jquery("." + sliderValue).attr("x")) + 50 + "px"
    //       );
    //     // .select(".TRL_tool-tip-line")

    //     d3.csv("../data/multi-area-2018.csv", data => {
    //       var year = jquery("#TRL_slider").val();

    //       d3
    //         .select(".TRL_tooltip-container")
    //         .select(".TRL_C02-tip")
    //         .html(
    //           (d, i) =>
    //             newLocation.replace(/_/g, " ") +
    //             " C0<sub>2</sub> Emissions: <b>" +
    //             number(data[year - 2018][newLocation + "_C02"]).replace("G", "B") +
    //             "</b>"
    //         );

    //       d3
    //         .select(".TRL_TWh-tip")
    //         .html(
    //           (d, i) =>
    //             newLocation.replace(/_/g, " ") +
    //             " Electricity (TWh) Required: <b>" +
    //             number(data[year - 2018][newLocation + "_TWh"]).replace("k","K") +
    //             "</b>"
    //         );
    //     });

    //     d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
    //       var year = jquery("#TRL_slider").val();
    //       d3
    //         .select(".TRL_tooltip-container")
    //         .select(".TRL_fleet-tip")
    //         .html(
    //           (d, i) =>
    //            
    //             newLocation.replace(/_/g, " ") +

    //             " <span style='color:"+ color4 +"'>Hybrid:</span> <b>" +
    //             number(fleet[year - 2018][newLocation + "_Hybrid"]) +
    //             "</b><br />" +
    //             newLocation.replace(/_/g, " ") +
    //             " <span style='color:"+ color3 +"'>Electric:</span> <b>" +
    //             number(fleet[year - 2018][newLocation + "_BEV"]) +
    //             "</b><br />" +
    //             newLocation.replace(/_/g, " ") +
    //             " <span style='color:"+ color2 +"'>Diesel:</span> <b>" +
    //             number(fleet[year - 2018][newLocation + "_Diesel"]) +
    //             "</b><br />" +
    //             newLocation.replace(/_/g, " ") +
    //             " <span style='color:"+ color1 +"'>Gasoline:</span> <b class='TRL_final_number'>" +
    //             number(fleet[year - 2018][newLocation + "_Gasoline"])
    //         );
    //     });
    //   }
    //   setTimeout(explode, 1);
    // });
    jquery("#TRL_slider").on("change", function() {
        running = false

        jquery("button").removeClass("TRL_pause")
            // updateDonut()
        update8();
        update9();

        jquery("#TRL_range").html(jquery("#TRL_slider").val());
        jquery("#TRL_range2").html(jquery("#TRL_slider").val());
        clearInterval(timer);
        jquery("button").html("►");
        var sliderValue = jquery("#TRL_slider").val();
        jquery("rect").attr("id", "");
        jquery("#TRL_range3").html(sliderValue);
        jquery("#TRL_range4").html(sliderValue);
        jquery("." + sliderValue).attr("id", "");
        jquery("#TRL_invis-slider").val(sliderValue);
        // console.log(jquery(".TRL_" + sliderValue).attr("x"))
        var select = document.getElementById("TRL_locations");
        var newLocation = select.value;

        var year = jquery("#TRL_range").text();
        if (parseInt(year) > 2041) {
            jquery(".TRL_tooltip-container").css("transform", "rotateY(180deg)");
            jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
                "transform",
                "rotateY(180deg)"
            );
            jquery(".TRL_tool-tip-line").css("left", "-4px");
        } else {
            jquery(".TRL_tooltip-container").css("transform", "rotateY(0deg)");
            jquery(".TRL_C02-tip,.TRL_TWh-tip,.TRL_fleet-tip").css(
                "transform",
                "rotateY(0deg)"
            );
            jquery(".TRL_tool-tip-line").css("left", "");
        }

        d3
            .select(".TRL_tooltip-container")
            .style("display", "inline")
            .style("left", parseInt(jquery("." + sliderValue).attr("x")) + 50 + "px");

        d3.csv("../data/multi-area-2018.csv", data => {
            var year = jquery("#TRL_slider").val();
            var formatValue = d3.format(".0s");

            d3
                .select(".TRL_tooltip-container")
                .select(".TRL_C02-tip")
                .html(
                    (d, i) =>
                    newLocation.replace(/_/g, " ") +
                    " C0<sub>2</sub> Emissions: <b>" +
                    number(data[year - 2018][newLocation + "_C02"]).replace("G", "B") +
                    "</b>"
                );

            d3
                .select(".TRL_TWh-tip")
                .html(
                    (d, i) =>
                    newLocation.replace(/_/g, " ") +
                    " Electricity (TWh) Required: <b>" +
                    number(data[year - 2018][newLocation + "_TWh"]).replace("k","K") +
                    "</b>"
                );
        });

        d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
            var year = jquery("#TRL_slider").val();
            d3
                .select(".TRL_tooltip-container")
                .select(".TRL_fleet-tip")
                .html(
                    (d, i) =>

                    newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color3 + "'>Electric:</span> <b>" +
                    number(fleet[year - 1985][newLocation + "_BEV"]).replace("G", "B") +
                    "</b><br />" + newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color4 + "'>Hybrid:</span> <b>" +
                    number(fleet[year - 1985][newLocation + "_Hybrid"]).replace("G", "B") +
                    "</b><br />" +
                    newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color2 + "'>Diesel:</span> <b>" +
                    number(fleet[year - 1985][newLocation + "_Diesel"]).replace("G", "B") +
                    "</b><br />" +
                    newLocation.replace(/_/g, " ") +
                    " <span style='color:" + color1 + "'>Gasoline:</span> <b class='TRL_final_number'>" +
                    number(fleet[year - 1985][newLocation + "_Gasoline"]).replace("G", "B")
                );
        });
    });
});
jquery(function() {
    const color4 = "rgb(255, 178, 0)";
    const color3 = "rgb(255, 128, 0)";
    const color1 = "rgb(0, 93, 162)";
    const color2 = "rgb(0, 153, 196)";
    const color5 = "#FFFFFF";
    const color6 = "#AFAFAF";
    const color7 = "#666666";
    const color = d3.scaleOrdinal().range([color1, color2, color3, color4]);

    const z = d3.scaleOrdinal().range([color1, color2, color3, color4]);

    d3.select("#TRL_invis-slider").style("background", color6);
    d3.select("#TRL_play").style("background", color6);
    d3.select(".TRL_disclaimer").style("color", color6);
    d3.select(".TRL_asterisk").style("color", color6);
    d3.select(".TRL_asterisk2").style("color", color6);
    d3.select("#TRL_selected").style("background", color7);
    d3.select(".TRL_gasoline").style("color", color1);
    d3.select(".TRL_mini-gasoline").style("color", color1);
    d3.select(".TRL_diesel").style("color", color2);
    d3.select(".TRL_mini-diesel").style("color", color2);
    d3.select(".TRL_hybrid").style("color", color4);
    d3.select(".TRL_mini-hybrid").style("color", color4);
    d3.select(".TRL_bev").style("color", color3);
    d3.select(".TRL_mini-bev").style("color", color3);

    jquery(".TRL_location-change").click(function() {
        jquery(this)
            .css("background", color7)
            .css("color", color5);
        jquery("#TRL_locations")
            .val(jquery(this).data("val"))
            .trigger("change");
        jquery(this)
            .parent()
            .siblings()
            .children()
            .each(function() {
                var identifier = jquery(this).data("val");
                jquery(this)
                    .css("background", "")
                    .css("color", "")
                    .attr("id", identifier);
            });
    });

    d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", sales => {
        var formatValue = d3.format(",d");
        var select = document.getElementById("TRL_locations");
        var newLocation = select.value;

        // console.log(sales)

        sales = sales.filter(function row(d, i) {
            if (i < 33) return d;
        });

        var sales = sales.map(sales => ({
            Year: sales.Year.replace("_sales", ""),
            Gasoline: parseInt(sales[newLocation + "_Gasoline"]),
            Diesel: parseInt(sales[newLocation + "_Diesel"]),
            BEV: parseInt(sales[newLocation + "_BEV"]),
            Hybrid: parseInt(sales[newLocation + "_Hybrid"])
        }));

        var newsale = sales.map(sales => ({
            Year: sales.Year,
            Gasoline2: sales.Gasoline / 3000000,
            Diesel2: sales.Diesel / 3000000,
            BEV2: sales.BEV / 3000000,
            Hybrid2: sales.Hybrid / 3000000
        }));

        var car2_sales = d3.select("#TRL_sale");
        var car2_esales = d3.select("#TRL_esale");

        var year = 2018;
        var cars2 = car2_sales
            .selectAll("#sale")
            .data(newsale.filter(d => d.Year == year))
            .enter();

        var ecars2 = car2_esales
            .selectAll("#esale")
            .data(newsale.filter(d => d.Year == year))
            .enter();

        var gasoline2 = cars2
            .selectAll("bar")
            .data(d => d3.range(d.Gasoline2))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color1)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );

        var diesel2 = cars2
            .selectAll("bar")
            .append("div")
            .data(d => d3.range(d.Diesel2))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color2)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );

        var bev2 = ecars2
            .selectAll("bar")
            .data(d => d3.range(d.BEV2))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color3)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );

        var hybrid2 = ecars2
            .selectAll("bar")
            .data(d => d3.range(d.Hybrid2))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color4)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );
    });

    d3.csv("../data/All_sales_fleet_2018_2050_alt.csv", fleet => {
        var formatValue = d3.format(".0s");
        var select = document.getElementById("TRL_locations");
        var newLocation = select.value;

        fleet = fleet.filter(function row(d, i) {
            if (i > 32) return d;
        });

        var fleet = fleet.map(fleet => ({
            Year: fleet.Year.replace("_fleet", ""),
            Gasoline: parseInt(fleet[newLocation + "_Gasoline"]),
            Diesel: parseInt(fleet[newLocation + "_Diesel"]),
            BEV: parseInt(fleet[newLocation + "_BEV"]),
            Hybrid: parseInt(fleet[newLocation + "_Hybrid"])
        }));

        var newfleet = fleet.map(fleet => ({
            Year: fleet.Year,
            Gasoline: fleet.Gasoline / 3000000,
            Diesel: fleet.Diesel / 3000000,
            BEV: fleet.BEV / 3000000,
            Hybrid: fleet.Hybrid / 3000000
        }));

        var svg3 = d3
            .select("#TRL_pc")
            .append("div")
            .attr("id", "TRL_fleet")
            .append("svg")
            .attr("height", "150")
            .attr("width", "1030"),
            margin = {
                top: 20,
                right: 70,
                bottom: 30,
                left: 40
            },
            width = +svg3.attr("width") - margin.left - margin.right,
            height = +svg3.attr("height") - margin.top - margin.bottom,
            g = svg3
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3
            .scaleBand()
            .rangeRound([0, width])
            .padding(0.3)
            .align(0.3);

        var y = d3.scaleLinear().rangeRound([height, 0]);

        var stack = d3.stack();

        x.domain(fleet.map(d => d.Year));
        var ticks = [
            2018,
            "'19",
            "’20",
            "'21",
            "'22",
            "'23",
            "'24",
            "'25",
            "'26",
            "'27",
            "'28",
            "'29",
            "'30",
            "'31",
            "'32",
            "'33",
            "'34",
            "'35",
            "'36",
            "'37",
            "'38",
            "'39",
            "'40",
            "'41",
            "'42",
            "'43",
            "'44",
            "'45",
            "'46",
            "'47",
            "'48",
            "'49",
            2050
        ];
        y
            .domain([0, d3.max(fleet, d => d.Gasoline + d.Diesel + d.BEV + d.Hybrid)])
            .nice();
        z.domain(["Gasoline", "Diesel", "BEV", "Hybrid"]);

        g
            .selectAll(".TRL_serie")
            .data(stack.keys(["Gasoline", "Diesel", "Hybrid", "BEV"])(fleet))
            .enter()
            .append("g")
            .attr("class", "TRL_serie")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter()
            .append("rect")
            .attr("class", d => d.data.Year)
            .attr("x", d => x(d.data.Year))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth() + 6)
            .on("click", function() {
                jquery("rect").attr("id", "TRL_fade");
                jquery("." + jquery(this).attr("class")).attr("id", "TRL_show");
                jquery("#TRL_slider").val(jquery(this).attr("class"));
                jquery("#TRL_slider").trigger("change");
            });

        d3.select("#TRL_slider").on("click", function() {
            // jquery(".tool-tip-line").remove()
            var sliderValue = jquery("#TRL_slider").val();
            d3
                .select(".TRL_tooltip-container")
                .style(
                    "left",
                    parseInt(jquery("." + sliderValue).attr("x")) + 50 + "px"
                );
        });

        g
            .append("g")
            .attr("class", "TRL_axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(
                d3.axisBottom(x).tickFormat(function(d, i) {
                    return ticks[i];
                })
            );

        d3.selectAll("#fleet g text").attr("x", 1);

        d3.selectAll("g.tick line").style("stroke", "none");
        g
            .append("g")
            .attr("class", "TRL_axis axis--y")
            .call(
                d3
                .axisLeft(y)
                .ticks(5, "s")
                .tickFormat(d => formatValue(d).replace("G", "B"))
            )
            .append("text")
            .attr("x", 15)
            .attr("y", -12)
            .attr("dy", "0.35em")
            .attr("text-anchor", "start")
            .attr("fill", "#000")
            .text("Distribution of passenger cars in use")
            .attr("id", "TRL_title-fleet");

        var car_sales = d3.select("#TRL_cars");

        var year = 2018;

        var cars = car_sales
            .selectAll("#TRL_cars")
            .data(newfleet.filter(d => d.Year == year))
            .enter();

        var ecar_sales = d3.select("#TRL_ecars");

        var ecars = ecar_sales
            .selectAll("#TRL_ecars")
            .data(newfleet.filter(d => d.Year == year))
            .enter();

        var gasoline = cars
            .selectAll("bar")
            .data(d => d3.range(d.Gasoline))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color1)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );

        var diesel = cars
            .selectAll("bar")
            .append("div")
            .data(d => d3.range(d.Diesel))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color2)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );

        var bev = ecars
            .selectAll("bar")
            .data(d => d3.range(d.BEV))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color3)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            );

        var hybrid = ecars
            .selectAll("bar")
            .data(d => d3.range(d.Hybrid))
            .enter()
            .append("svg")
            .classed("svg-inline--fa fa-car fa-w-16", true)
            .style("color", color4)
            .attr("aria-hidden", "true")
            .attr("data-prefix", "fas")
            .attr("data-icon", "car")
            .attr("role", "img")
            .style("font-size", "15px")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", "0 0 512 512")
            .append("path")
            .attr("fill", "currentColor")
            .attr(
                "d",
                "M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"
            )

        .text(d => d);
    });
});
jquery(function() {
    var tsvData = null;

    var margin = {
            top: 20,
            right: 90,
            bottom: 30,
            left: 40
        },
        width = 1030 - margin.left - margin.right,
        height = 160 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%Y");

    var formatSi = d3.format(".3s");

    var formatNumber = d3.format(".1f");

    var x = d3.scaleTime().range([0, width]);

    var y = d3.scaleLinear().range([height, 0]);

    // const categoricalB = [{
    //     "name": "schemeAccent",
    //     "n": 8
    // }, {
    //     "name": "schemeDark2",
    //     "n": 8
    // }, {
    //     "name": "schemePastel2",
    //     "n": 8
    // }, {
    //     "name": "schemeSet2",
    //     "n": 8
    // }, {
    //     "name": "schemeSet1",
    //     "n": 9
    // }, {
    //     "name": "schemePastel1",
    //     "n": 9
    // }, {
    //     "name": "schemeCategory10",
    //     "n": 10
    // }, {
    //     "name": "schemeSet3",
    //     "n": 12
    // }, {
    //     "name": "schemePaired",
    //     "n": 12
    // }, {
    //     "name": "schemeCategory20",
    //     "n": 20
    // }, {
    //     "name": "schemeCategory20b",
    //     "n": 20
    // }, {
    //     "name": "schemeCategory20c",
    //     "n": 20
    // }];

    // var colorScale = d3.scaleOrdinal(d3[categoricalB[10].name])

    const Africa2 = "#FF5900";
    const Asia2 = "#ff5e00";
    const South_America2 = "#ff6400";
    const China2 = "#ff6900";
    const Europe2 = "#ff6f00";
    const Middle_East2 = "#ff7400";
    const North_America2 = "#ff7a00";
    const Russia2 = "#ff8000";

    const colorScale = d3
        .scaleOrdinal()
        .range([
            Africa2,
            Asia2,
            South_America2,
            China2,
            Europe2,
            Middle_East2,
            North_America2,
            Russia2
        ]);

    var xAxis = d3.axisBottom().scale(x);

    var yAxis = d3.axisLeft().scale(y);
    // .tickFormat(formatBillion);

    var area = d3
        .area()
        .x(function(d) {
            return x(d.data.date);
        })
        .y0(function(d) {
            return y(d[0]);
        })
        .y1(function(d) {
            return y(d[1]);
        });

    var stack = d3.stack();

    var svg = d3
        .select("#TRL_twh")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../data/multi-area-2018.csv", function(error, twhdata) {
        colorScale.domain(
            d3.keys(twhdata[0]).filter(function(key) {
                return key !== "date";
            })
        );
        // var keys = [data.columns.filter(function(key) { console.log(key);return key !== 'date'; })]
        var keys = [
            "Africa_TWh",
            "Asia/_Oceania_exc._China_TWh",
            "Central_and_South_America_TWh",
            "China_TWh",
            "Europe_TWh",
            "Middle_East_TWh",
            "North_America_TWh",
            "Russia_Turkey_other_Europe_TWh"
        ];
        twhdata.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        tsvData = (function() {
            return twhdata;
        })();


        var maxDateVal = d3.max(twhdata, function(d) {
            var vals = d3.keys(d).map(function(key) {
                return key !== "date" ? d[key] : 0;
            });
            return d3.sum(vals);
        });
        // console.log(maxDateVal)
        // Set domains for axes
        x.domain(
            d3.extent(twhdata, function(d) {
                return d.date;
            })
        );
        y.domain([0, 3000]);

        stack.keys(keys);
        stack.order(d3.stackOrderNone);
        stack.offset(d3.stackOffsetNone);

        // console.log(twhdata);

        var browser = svg
            .selectAll(".browser")
            .data(stack(twhdata))
            .enter()
            .append("g")
            .attr("class", function(d) {
                return "browser " + d.key;
            })
            .attr("fill-opacity", 0.8);

        browser
            .append("path")
            .attr("class", "TRL_area")
            .attr("d", area)
            .style("fill", function(d) {
                return colorScale(d.key);
            });

        // browser.append('text')
        //     .datum(function(d) { return d; })
        //     .attr('transform', function(d) { return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')'; })
        //     .attr('x', -6)
        //     .attr('dy', '.35em')
        //     .style("text-anchor", "start")
        //     .text(function(d) { return d.key; })
        //     .attr('fill-opacity', 1);

        svg
            .append("g")
            .attr("class", "TRL_x axis")
            .attr("transform", "translate(0," + height + ")");
        // .call(xAxis);

        svg
            .append("g")
            .attr("class", "TRL_y axis")
            .call(
                d3
                .axisLeft(y)
                .ticks(4)
                .tickFormat(d3.format(".0s"))
            );

        svg
            .append("text")
            .attr("x", 380)
            .attr("y", -7)
            .attr("id", "TRL_title-description")
            .text("(terawatt hours)");

        svg
            .append("text")
            .attr("x", 15)
            .attr("y", -7)
            .attr("id", "TRL_title-fleet")
            .text("Total electricity required to power passenger cars");
    });
});
jquery(function() {
    var tsvData = null;
    var margin = {
            top: 20,
            right: 90,
            bottom: 30,
            left: 40
        },
        width = 1030 - margin.left - margin.right,
        height = 160 - margin.top - margin.bottom;

    var parseDate = d3.timeParse("%Y");

    var formatSi = d3.format(".3s");

    var formatNumber = d3.format(".1f");

    var x = d3.scaleTime().range([0, width]);

    var y = d3.scaleLinear().range([height, 0]);

    const Africa = "#242424";
    const Asia = "#323232";
    const South_America = "#414141";
    const China = "#4f4f4f";
    const Europe = "#5e5e5e";
    const Middle_East = "#6c6c6c";
    const North_America = "#7b7b7b";
    const Russia = "#8a8a8a";

    const Newcolor = d3
        .scaleOrdinal()
        .range([
            Africa,
            Asia,
            South_America,
            China,
            Europe,
            Middle_East,
            North_America,
            Russia
        ]);

    var xAxis = d3.axisBottom().scale(x);

    var yAxis = d3.axisLeft().scale(y);
    // .tickFormat(formatBillion);

    var area = d3
        .area()
        .x(function(d) {
            return x(d.data.date);
        })
        .y0(function(d) {
            return y(d[0]);
        })
        .y1(function(d) {
            return y(d[1]);
        });

    var stack = d3.stack();

    var svg2 = d3
        .select("#TRL_c02")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../data/multi-area-2018.csv", function(error, data) {
        var formatValue = d3.format(".0s");
        // console.log(data);
        Newcolor.domain(
            d3.keys(data[0]).filter(function(key) {
                return key !== "date";
            })
        );
        // var keys = [data.columns.filter(function(key) { console.log(key);return key !== 'date'; })]
        var keys = [
            "Africa_C02",
            "Asia/_Oceania_exc._China_C02",
            "Central_and_South_America_C02",
            "China_C02",
            "Europe_C02",
            "Middle_East_C02",
            "North_America_C02",
            "Russia_Turkey_other_Europe_C02"
        ];
        data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        tsvData = (function() {
            return data;
        })();

        var maxDateVal = d3.max(data, function(d) {
            var vals = d3.keys(d).map(function(key) {
                return key !== "date" ? d[key] : 0;
            });
            return d3.sum(vals);
        });
        // console.log(maxDateVal)
        // Set domains for axes
        x.domain(
            d3.extent(data, function(d) {
                return d.date;
            })
        );
        var ticks = [
            2018,
            "'19",
            "’20",
            "'21",
            "'22",
            "'23",
            "'24",
            "'25",
            "'26",
            "'27",
            "'28",
            "'29",
            "'30",
            "'31",
            "'32",
            "'33",
            "'34",
            "'35",
            "'36",
            "'37",
            "'38",
            "'39",
            "'40",
            "'41",
            "'42",
            "'43",
            "'44",
            "'45",
            "'46",
            "'47",
            "'48",
            "'49",
            2050
        ];

        y.domain([0, 3400000000]);

        stack.keys(keys);

        stack.order(d3.stackOrderNone);
        stack.offset(d3.stackOffsetNone);

        // console.log(stack(data));

        var browser2 = svg2
            .selectAll(".browser")
            .data(stack(data))
            .enter()
            .append("g")
            .attr("class", function(d) {
                return "browser " + d.key;
            })
            .attr("fill-opacity", 0.8);

        browser2
            .append("path")
            .attr("class", "TRL_area")
            .attr("d", area)
            .attr("dx", 100)
            .style("fill", function(d) {
                return Newcolor(d.key);
            });

        // browser2.append('text')
        //     .datum(function(d) { return d; })
        //     .attr('transform', function(d) { return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')'; })
        //     .attr('x', -6)
        //     .attr('dy', '.35em')
        //     .style("text-anchor", "start")
        //     .text(function(d) { return d.key; })
        //     .attr('fill-opacity', 1);

        svg2
            .append("g")
            .attr("class", "TRL_x axis")
            .attr("transform", "translate(0," + height + ")");
        // .call(d3.axisBottom(x).ticks(22).tickFormat(function(d, i) {
        //         return ticks[i]
        //     }));

        svg2
            .append("g")
            .attr("class", "TRL_y axis")
            .call(
                d3
                .axisLeft(y)
                .ticks(4)
                .tickFormat(d => formatValue(d).replace("G", "B"))
                // .tickFormat(d => formatValue(d))
            );
        svg2
            .append("text")
            .attr("x", 15)
            .attr("y", -8)
            .attr("id", "TRL_title-fleet")
            .text("Global C0₂ tailpipe emissions from passenger cars ");

        svg2
            .append("text")
            .attr("x", 390)
            .attr("y", -8)
            .attr("id", "TRL_title-description")
            .text("(metric tons)");
    });
});