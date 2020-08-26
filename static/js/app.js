//Fetch the JSON data and console log it
var sampleData = d3.json("data/samples.json")

function createMeta(id) {
    // Create metadata
    d3.json(sampleData).then((data) => {
      var metadata_array = data.metadata;
      console.log(metadata_array);
      console.log(id);
      // Filter the metadata and build the demo panel using id
      var metadataFiltered = metadata_array.filter(metadata => metadata.id == id)[0];
    //     Clear existing metadata
    d3.select("#sample-metadata").html("");
    // Append metadata 
        Object.entries(metadataFiltered).forEach(([key, value]) => {
      d3.select("#sample-metadata")
         .append("p").text(`${key}: ${value}`);
    });
  })
}
function createPlots(id) {
    // Create plots
    d3.json(sampleData).then((data) => {
      var samples = data.samples;
      console.log(samples)
      // filter the samples to make plots
      var plotsdataFiltered = samples.filter(chart => chart.id == id)[0]; 
        //  console.log(plotsdataFiltered)
      var otuIds = plotsdataFiltered.otuIds;
      var sampleValues = plotsdataFiltered.sampleValues;
      var otuLabels = plotsdataFiltered.otuLabels;
 
    //Get the top ten data for each category with slice()
    // top10 for sample_values,and otu_ids, and labels 
      var otuIds = otu_ids.slice(0, 10);
      var sampleValues = sample_values.slice(0, 10);
      var otuLabels = otu_labels.slice(0, 10);

    //Create the Bar Chart 
      var trace = {
      type: "bar",
      x: sampleValuesTop10.reverse(),
      y: otuIdsTop10.map(otu_ids => `OTU ${otu_ids}`).reverse(),
      text: otuLabelsTop10.reverse(),
      marker: {color: "blue",
      },
        orientation: 'h'
    };
      Plotly.newPlot("bar", trace, layout);

     // Create the Bubble Chart 
       var trace1 = {
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        text: otuLabels,
        marker: {
          color:otuIds,
          size: sampleValues,
          colorscale: "Earth"
        }
      };
    var trace1 = [{trace}];
    var layout1 = {
      title: "OTU ID",
      showlegend: false,
      height: 600,
      width: 1500
    };
        Plotly.newPlot("bubble", trace1, layout1);
    
    // Build a Pie Chart
      var trace2 = [{
      values: sampleValues.slice(0, 10),
      labels: otuIds.slice(0, 10),
      hovertext: otuLabels.slice(0, 10),
      type: "pie",
      marker: {
        colorscale: "Earth"
      }
    }];
    var layout2 = {
      showlegend: true,
      height: 400,
      width: 500
    };
     Plotly.newPlot("pie", trace2, layout2);

function init(){
  sampleData.then(function(data) {
    sampleNames = data.names
    // console.log(sampleNames)
    selOptions = d3.select("#selDataset");
    sampleNames.forEach(sampleid => {
      selOptions.append("option")
      .text(sampleid)
      .property("value", sampleid);
    })
})

} 

init();

