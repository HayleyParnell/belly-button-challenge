// Read in samples.json 
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

  //initialize the dashboard
  function init() {
    //dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    data.names.forEach(function(sample) {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });

    // Initialize the dashboard with the first sample
    buildCharts(data.names[0]);
    buildMetadata(data.names[0]);
  }

