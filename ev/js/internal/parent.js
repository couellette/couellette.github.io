// WARNING: Don't edit this file. It is required for responsive iframe behaviour.
const pym = require("pym.js");

const bundleDir = document
  .querySelector("#CecEvVisualizationParent")
  .getAttribute("data-base-url");

new pym.Parent(
  "CecEvVisualizationParent",
  `${bundleDir}/html/CecEvVisualization.html`,
  {
    id: "CecEvVisualizationParent-frame"
  }
);

// Don't want to create a CSS network request for this simple change.
document.querySelector(`#CecEvVisualizationParent-frame`).style.display =
  "block";
