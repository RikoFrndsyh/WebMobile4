registerSW();

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js");
    } catch (error) {
      showResult("Error while registering: " + error.message);
    }
  } else {
    showResult("Service workers API not available");
  }
};

function showResult(text) {
  document.querySelector("output").innerHTML = text;
}