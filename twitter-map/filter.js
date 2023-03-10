var delayMillis = 2000;
setTimeout(function() {
$(function() {
       d3.select("#dayFilter").on("change", function() { // when one changes
           $('.ui-slider-handle').val($(this).val());
           d3.selectAll('#bar-f').on('change')();
           d3.selectAll('#dayFilter').on('change')();
       })
   })}, delayMillis);