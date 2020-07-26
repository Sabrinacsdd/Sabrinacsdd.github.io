var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%Y-%m");

var dateSet = ['2011-06', '2012-06', '2013-06', '2015-06', '2020-06']
var index = -1;
var next = () => {
    if (index < dateSet.length - 1) {
        index = index + 1;
    }
    return index;
}
var timeIndex1;
var timeIndex2;
var dataSet;
var active = {
    "Android": true,
    "iOS": true,
    "Series 40": true,
    "SymbianOS": true,
    "BlackBerry": true,
    "Windows": true
}
var getData = y => dataSet.filter(d => d.date == y)[0].values.filter(d => active[d.OS] === true);

//tooltip for mouse over
var tooltip = d3.select("body").append("div").attr("class", "toolTip");

//set variables for the chart
var margin = { top: 20, right: 20, bottom: 60, left: 100 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#my_data")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var chart = svg
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// var anno = svg
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

//x axis
var xAxis = chart.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
//y axis
var yAxis = chart.append("g")
    .attr("class", "axis axis--y")



//load csv data
d3.csv("data.csv", data => {
    dataSet = data.map(d => {
        return {
            date: d.Date,
            values: [
                { OS: "Android", value: +d.Android },
                { OS: "iOS", value: +d.iOS },
                { OS: "Series 40", value: +d['Series 40'] },
                { OS: "SymbianOS", value: +d.SymbianOS },
                { OS: "BlackBerry", value: +d['BlackBerry OS'] },
                { OS: "Windows", value: +d.Windows }
            ]
        }
    });
});


