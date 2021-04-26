// Setting the margin object
margin = {
  top: 40,
  left: 50,
  right: 30,
  bottom: 40,
};

// Setting the min and max of the x variable
let xmin = d3.min(data, (d) => d[options.x]);
let xmax = d3.max(data, (d) => d[options.x]);

// Setting the min and max of the y variable
let ymin = d3.min(data, (d) => d[options.y]);
let ymax = d3.max(data, (d) => d[options.y]);

// Setting the scale of the x variable
let x = d3
  .scaleLinear()
  .domain([xmin - xmin * (1 / 100), xmax])
  .range([margin.left, width - margin.right])
  .nice();

// Setting the scale of the y variable
let y = d3
  .scaleLinear()
  .domain([ymin - ymin * (1 / 100), ymax])
  .range([height - margin.top, margin.bottom])
  .nice();

// Setting the x-axis
xS = d3.axisBottom(x).ticks(options.xticks);

// Setting the y-axis
yS = d3.axisLeft(y).ticks(options.yticks);

// Rendering the x-axis
svg
  .append("g")
  .attr("transform", "translate(0," + (height - margin.bottom) + ")")
  .call(xS);

// Rendering the y-axis
svg
  .append("g")
  .attr("transform", "translate(" + margin.left + ", 0)")
  .call(yS);


// Rendering the x-axis title
svg
  .append("text")
  .attr("transform", "translate(" + width / 2 + " ," + (height - 5) + ")")
  .attr("dx", "0em")
  .style("text-anchor", "middle")
  .style("font-family", options.font)
  .style("font-size", options.xtitleFontSize)
  .text(options.xtitle);

// Rendering the y-axis title
svg
  .append("text")
  .attr("transform", "translate(" + 0 + " ," + height / 2 + ") rotate(-90)")
  .attr("dy", "0.8em")
  .style("text-anchor", "middle")
  .style("font-size", options.ytitleFontSize)
  .style("font-family", options.font)
  .text(options.ytitle);

// Rendering the chart title
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .attr("dx", "0em")
  .style("font-size", options.titleFontSize)
  .style("font-family", options.font)
  .text(options.title);



// Rendering the scatter plot
svg
  .attr("id", options.id)
  .style("background-color", options.bgcol)
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(d[options.x]))
  .attr("cy", (d) => y(d[options.y]))
  .attr("r", function (d) {
    if (typeof options.size == "string") {
      let z = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d[options.size]))
        .range([2, 20])
        .nice();

      return z(d[options.size]);
    } else {
      return options.size;
    }
  })
  .attr("fill", options.col)
  .attr("opacity", options.opacity)
  .attr("stroke", options.stroke)
  .attr("stroke-width", options.strokeWidth);
