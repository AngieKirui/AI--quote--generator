// script.js
async function generateQuote() {
  const userInput = document.getElementById("userInput").value;

  if (!userInput) {
    alert("Please enter a topic or instruction.");
    return;
  }

  const response = await fetch("https://your-backend-url/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userInput }),
  });

  const data = await response.json();
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${data.quote}"`;
}
