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