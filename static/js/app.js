//Fetch the JSON data and console log it
function getMetaData(id) {
    var sampleData = d3.json("data/samples.json")
      console.log(sampleData)
    // See metadata
    d3.json(sampleData).then((data) => {
      var metadata_array = data.metadata;
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

function createPlots(id) {
    // Create plots
    d3.json(sampleData).then((data) => {
      var samples = data.samples;
      // console.log(samples)
      // filter the data samples to make plots
      var plotsdataFiltered = samples.filter(chart => chart.id.toString( ) === id)[0]; 
        //  console.log(plotsdataFiltered)
      var otu_ids = plotsdataFiltered.otu_ids;
      var sample_values = plotsdataFiltered.sample_values;
      var otu_labels = plotsdataFiltered.otu_labels;
    
    //Get the top ten data for each category with slice() and reverse ids and 
    // sample_values.  
      var otu_ids = otu_ids.slice(0, 10).reverse();
      var sample_values = sample_values.slice(0, 10).reverse();
      var otu_labels = otu_labels.slice(0, 10);
    })
  }

     //Create the Bar Chart 
        var trace = {
            type: "bar",
            x: sample_values,
            y: otu_ids.map(otu_ids => `OTU ${otu_ids}`),
            text: labels,
            marker: { size: sample_values,
              color: "blue",
            },
            orientation: "h",
          }
        var data = [trace];
        var layout = { title: "Top 10 OTU",
                      yaxis:{
                    tickmode:"linear",
              },
              margin: {
                  l: 100,
                  r: 100,
                  t: 100,
                  b: 30
              }
          };
        Plotly.newPlot("bar", data, layout);
  
     // Create the Bubble Chart 
       var trace1 = { x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              color:otu_ids,
              size: sample_values,
              colorscale: "Earth"
          }
      };
        var data1 = [trace1];
        var layout1 = {
            title: "Top OTU ID",
            showlegend: false,
            height: 600,
            width: 1500
          };
        Plotly.newPlot("bubble", data1, layout1);
    
    // Build a Pie Chart
        var trace2 = {
            values: sample_values,
            labels: otu_ids,
            hovertext: labels,
            type: "pie",
            marker: {
              colorscale: "Earth"
            
          }
  }
        var data2 = [trace2];
        var layout2 = { title: "Top OTU 10",
            showlegend: true,
            height: 400,
            width: 500
          };
      Plotly.newPlot("pie", data2, layout2);

function optionChanged(id) {
      displayPlots(id);
      displayMetaData(id);
}

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
    //Get the functions to display the data and the plots to the page
      displyPlots(data.names[0]);
      displayMetaData(data.names[0]);
});
}

init();

