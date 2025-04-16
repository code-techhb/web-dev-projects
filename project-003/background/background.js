/**
 * This runs as a service worker in the background
 */

// -------------- code ----------------------
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("SortMarks extension installed");
  } else if (details.reason === "update") {
    console.log("SortMarks extension updated");
  }
});
