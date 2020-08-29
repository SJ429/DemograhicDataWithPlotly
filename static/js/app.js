//Fetch the JSON data and console log it
function getMetaData(id) {
    var sampleData = ("data/samples.json")
      console.log(sampleData)
  //Use d3 to select the panel with id for metadata
    d3.json(sampleData).then(function(data){
      var metadata_array = data.metadata
      console.log(metadata_array);
      console.log(id);
  // Filter the metadata and build the demo panel using id
      var metadataFiltered = metadata_array.filter(metadata => metadata.id.toString() === id)[0];
  //     Clear existing metadata
    d3.select("#sample-metadata").html("");
  // Append metadata 
        Object.entries(metadataFiltered).forEach(([key, value]) => {
          d3.select("#sample-metadata")
            .append("p").text(`${key}: ${value}`);
     });
});
 } 
 //Create a guage chart   
 function bonus(id) {
  var sampleData = ("data/samples.json")
      d3.json(sampleData).then(function(data){
      console.log(data)
          var gaugedata = data.metadata
              var gaugedataFiltered = gaugedata.filter(gauge => gauge.id.toString( ) === id)[0]; 
              console.log(gaugedataFiltered)
              var wfreq =gaugedataFiltered.wfreq
              
              var data3 = [
              {     
                  domain: { x: [0, 1], y: [0, 1] },
                  value: wfreq,
                  title: { text: "Weekly Washing Frequency Gauge" },
                  type: "indicator",
                  mode: "gauge+number+delta",
                  delta: { reference: 9},
                  gauge: {axis: { range: [null, 9] },
                          steps: [
                      { range: [0, 9], color: "lightgray" },
                      { range: [2, 4], color: "teal" }
                      ],
                      threshold: {
                      line: { color: "blue", width: 4 },
                      thickness: 0.75,
                      value: wfreq
                      } 
                  }
                  }     
              ];    
              var layout3 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
              
              Plotly.newPlot("gauge", data3, layout3);
      })
      }
 // Create plots
function createPlots(id) {
  var sampleData = ("data/samples.json")
      d3.json(sampleData).then(function(data) {
          var plotsData = data.samples;
          console.log(plotsData)
          // Filter the data to make plots
          var plotsdataFiltered = plotsData.filter(chart => chart.id.toString( ) === id)[0]; 
            console.log(plotsdataFiltered)

          var otu_ids = plotsdataFiltered.otu_ids;
          var sample_values = plotsdataFiltered.sample_values;
          var otu_labels = plotsdataFiltered.otu_labels;
         
        //Get the top ten data for each category with slice() and reverse ids and 
        // sample_values and labels.  
        //Getting the top 10 
          var otu_idstop = otu_ids.slice(0, 10).reverse();
          var sample_valuestop = sample_values.slice(0, 10).reverse();
          var otu_labelstop = otu_labels.slice(0, 10).reverse();
           
          //Create a bar chart 
          var trace = {
                type: "bar",
                x: sample_valuestop,
                y: otu_idstop.map(otu_ids => `OTU ${otu_ids}`),
                text: otu_labelstop,
                marker: { size: sample_valuestop,
                  color: "teal",
                },
                orientation: "h",
              }
            var data = [trace];
            var layout = { title: "Top 10 OTU",
                          yaxis:{
                        tickmode:"linear",
                  }
            };
              Plotly.newPlot("bar", data, layout);
              // Create a bubble chart 
            var trace1 = { x: otu_ids,
                y: sample_valuestop,
                mode: 'markers',
                text: otu_labelstop,
                marker: {
                  color:otu_ids,
                  size: sample_valuestop,
                  colorscale: "Earth"
                }
            };
            var data1 = [trace1];
            var layout1 = {
                title: "Top OTU ID",
                showlegend: false,
                height: 500,
                width: 1000
          };
            Plotly.newPlot("bubble", data1, layout1);
          // Create a pie chart
            var trace2 = {
                values: sample_valuestop,
                labels: otu_idstop,
                hovertext: otu_labelstop,
                type: "pie",
            };        
            var data2 = [trace2];
            var layout2 = { title: "Top OTU 10",
                 height: 800,
                 width: 500
                };
            Plotly.newPlot("pie", data2, layout2);
              });    
          };
 //function to initiate page
function init(){
   var sampleData = ("data/samples.json")
   d3.json(sampleData).then(function(data) {
      selOptions = d3.select("#selDataset");
       sampleNames = data.names
    // console.log(sampleNames)
          sampleNames.forEach(sampleNames=> {selOptions.append("option")
            .text(sampleNames)
            .property("value", sampleNames);
          })
    // Use the first sample from the list to build the initial plots on page
        const showPlots = sampleNames[0];
        createPlots(showPlots); 
        getMetaData(showPlots)
        bonus(showPlots)
      })   
} 
//Get the functions to display the data and the plots to the page
function optionChanged(id) {
  createPlots(id);
  getMetaData(id);
  bonus(id)
};

init();
