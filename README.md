Belly Button Biodiversity Dashboard Analysis
An interactive dashboard was used to explore the Belly Button Biodiversity dataset which cataloged the microbes that colonize human navels was built. 

### About the Data
http://robdunnlab.com/wp-content/uploads/microbes-sem.jpg
The JSON sample dataset from http://robdunnlab.com/projects/belly-button-biodiversity reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

JavaScript, Plotly.js, Python, HTML, CSS, Bootstrap, and Flask were languages and technologies used to build the Belly Button Biodiversity dashboard. After the data was analyzed, three graphs were built using Plotly and JavaScript. The pie chart shows the top ten samples for a particular sample id. The bubble chart shows all the samples and OTU ID data points. Metadata for the sample is also displayed, along with a gauge chart for weekly washing frequency. The graphs resize when the page size is modified.

## Step 1: Plotly

1. Use the D3 library to read in `samples. json`.
2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        * Use `sample_values` as the values for the bar chart.
        * Use `otu_ids` as the labels for the bar chart.
3. Create a bubble chart that displays each sample.
        * Use `otu_ids` for the x values.
        * Use `sample_values` for the y values.
        * Use `sample_values` for the marker size.
        * Use `otu_ids` for the marker colors.
        * Use `otu_labels` for the text values.
4. Display the sample metadata, i.e., an individual's demographic information.
5. Display each key-value pair from the metadata JSON object somewhere on the page.
