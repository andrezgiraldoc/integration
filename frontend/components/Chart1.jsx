import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import ClipLoader from "react-spinners/ClipLoader";
import '../static/css/globals.css';

const Chart1 = () => {
  const chartRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sales-data/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const width = 580;
    const height = 580;
    const color = d3
      .scaleLinear()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

    const pack = (data) =>
      d3
        .pack()
        .size([width, height])
        .padding(3)(d3.hierarchy(data).sum((d) => d.value));

    const root = pack(data);

    const svg = d3
      .select(chartRef.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .style("background", color(0))
      .style("cursor", "pointer");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", (d) => (d.children ? color(d.depth) : "white"))
      .attr("pointer-events", (d) => (!d.children ? "none" : null))
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    const label = svg
      .append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))
      .text((d) => d.data.name);

    let focus = root;
    let view;

    const zoomTo = (v) => {
      const k = width / v[2];
      view = v;

      label.attr("transform", (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", (d) => d.r * k);
    };

    const zoom = (event, d) => {
      const focus0 = focus;
      focus = d;

      const transition = svg
        .transition()
        .duration(750)
        .tween("zoom", (d) => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t) => zoomTo(i(t));
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transition)
        .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    };

    svg.on("click", (event) => zoom(event, root));
    zoomTo([root.x, root.y, root.r * 2]);

  }, [data]);

if (!data) {
    return (
      <div className="chart-container">
        <ClipLoader size={50} color={"#36d7b7"} loading={true} />
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2 className="chart-title">Top-Selling Products by Category</h2>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default Chart1;
