function fetchDataWithCallback(callback) {
  console.log("Fetching data...");

  const simulateError = true;

  setTimeout(() => {
    try {
      if (simulateError) {
        throw new Error("Fetch failed");
      }

      const data = "Data fetched";
      console.log("Fetch completed!");

      callback(data);
    } catch (error) {
      console.log("Error: Fetch failed");
    }
  }, 2000);
}

fetchDataWithCallback((data) => {
  console.log("Callback received:", data);
});
