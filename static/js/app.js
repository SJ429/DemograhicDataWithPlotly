
function SeeData(jsonData) {
    var data = `data/samples.json`;
   
// // // Fetch the JSON data and console log it
 d3.json(data).then(function(jsonData) {
      var metaJson = data.metaJson
        console.log(metaJson);

    var filteredmetaData = metaJson.filter(metadata => metadata == jsonData)[0];

    //     Clear existing metadata
    d3.select("#sample-metadata").html("");

    //  Use `Object.entries` to add dictionary of data and appendr 
    Object.entries(filteredmetaData).forEach(([key, value]) => {
      d3.select("#sample-metadata")
        //append a paragraph tag
        .append("p").text(`${key}: ${value}`);

    });
  })
}
  
function createPlots(id) {
// //   // Create plots
 d3.json("samples.json").then((data) => {
var samples = data.samples;
//    // filter the samples to build the plots
var filteredPlots=samples.filter(char=>char.id ==id)[0];
var otu_ids = filteredPlots.otu_ids[0]
var lables = filteredPlots.lables[0]
var values = filteredPlots.values[0]
//     //create plots


//Create the Bar Plot 
  var trace = {
  type: "bar",
  x: values
  y: otu_ids.map(otu_ids => `OTU ${otu_ids}`)
  
  orientation: "h"
  }
  }
}
// // function optionChanged(id) {
// //   createPlots(id);
// //   createMeta(id);
// // }
// // function init() {
// //   // create the dropdown menu
// //   d3.json("samples.json").then((data) => {
// //     console.log(data.names);
// //   });
// //   // Create metadata and build plots for first sample
// //   createMeta("940");
// //   // createPlots("940");
// // }
// // init();