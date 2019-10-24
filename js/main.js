
//collect items to size map based on window size
var margin = {top: 10, left: 10, bottom: 10, right: 10}
  , width = parseInt(d3.select('#map').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .3
  , height = width * mapRatio;


//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){

  //map frame dimensions
    var width = 1800,
        height = 800;
    //use queue to parallelize asynchronous data loading
    //create new svg container for the map
    var map = d3.select("body")
      .append("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height);

//pull in and focus my data

        var projection = d3.geoAlbers()
        .center([-.75, 33.6])
        .rotate([99.18, -2, 0])
        .parallels([29.5, 45.5])
        .scale(10000)
        .translate([width / 2, height / 2]);


    var path = d3.geoPath()
       .projection(projection);

    /*d3.queue()
        .defer(d3.csv, "VoteOK/data/registration.csv") //load attributes from csv
        .defer(d3.json, "VoteOK/data/okcounty.topojson") //load background spatial data
        .await(callback);*/
    d3.csv('VoteOK/data/registration.csv').then(function(csvData) {
      d3.json('VoteOK/data/okcounty.topojson').then(function(oklahoma) {
        callback(null, csvData, oklahoma);
      });
    });

    /*function callback(error, csvData, oklahoma){

      console.log(error);
      console.log(csvData);
      console.log(oklahoma);

};*/

//Example 1.4 line 10
function callback(error, csvData, oklahoma){
    //translate europe TopoJSON
    var okcounty = topojson.feature(oklahoma, oklahoma.objects.okcounty1).features;

    //add Europe countries to map
    var okcounty = map.selectAll(".regions")
        .data(okcounty)
        .enter()
        .append('path')

        .attr("class", "county")
        .attr("d", path);

    //examine the results
    console.log(okcounty);
};
};
