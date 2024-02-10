// Read in samples.json
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

  // initialize the dashboard
  function init() {
    //dropdown menu 
    let dropdownMenu = d3.select("#selDataset");

    data.names.forEach(function(sample) {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });

    // Initialize dashboard for charts
    buildCharts(data.names[0]);
    buildMetadata(data.names[0]);
  }

  //build charts
  function buildCharts(sample) {
    // Filter data for the selected sample
    let selectedSample = data.samples.filter(function(d) {
      return d.id === sample;
    })[0];

    // Bar chart
    let barData = [{
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    let barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Bubble chart
    let bubbleData = [{
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: "markers",
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids,
        colorscale: "Earth"
      }
    }];

    let bubbleLayout = {
      title: "OTU Bubble Chart",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  }

  //build metadata display
  function buildMetadata(sample) {
    // Filter metadata for the selected sample
    let selectedMetadata = data.metadata.filter(function(d) {
      return d.id == sample;
    })[0];

    // Select the demographic info panel
    let demographicInfo = d3.select("#sample-metadata");

    // Clear existing metadata
    demographicInfo.html("");

    // Display 
    Object.entries(selectedMetadata).forEach(function([key, value]) {
      demographicInfo.append("p").text(`${key}: ${value}`);
    });
  }

  // Create the function for drop down option
  function optionChanged(newSample) {
    // Update charts and metadata when a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }

  // Initialize the dashboard
  init();
});



