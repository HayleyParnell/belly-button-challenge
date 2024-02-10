// Read in samples.json
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

  // initialize the dashboard
  function init() {
    //dropdown menu 
    var dropdownMenu = d3.select("#selDataset");

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
    var selectedSample = data.samples.filter(function(d) {
      return d.id === sample;
    })[0];

    // Bar chart
    var barData = [{
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    var barLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Bubble chart


  // Initialize the dashboard
  init();
});


