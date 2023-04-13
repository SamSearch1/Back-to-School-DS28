console.log("Hello Back to School!");
let viz;
//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard options
//3. Create a variable to store the URL - if doesn't load, might need to specify height and width

const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "900px",
  width: "1400px",
};
const URL =
  "https://public.tableau.com/views/EmbeddingDashboard_16813783081950/EmbeddingDashboard?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";
const exportpdfbutton = document.getElementById("exportPDF");
function initViz() {
  viz = new tableau.Viz(containerDiv, URL, options);
}
const exportpptbutton = document.getElementById("exportPPT");
initViz();
document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
exportpptbutton.addEventListener("click", exportPPTfunction);
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[0];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("Viz filtered 😎"));
}
