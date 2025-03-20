// Selecting DOM elements
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const newQuoteButton = document.querySelector(".new-quote");
const copyButton = document.querySelector(".copy");
const tweetButton = document.querySelector(".tweet");
const exportQuoteButton = document.querySelector(".export");

// Store the current quote object globally
let currentQuote = null;

// Event listeners for button clicks
newQuoteButton.addEventListener("click", () => {
  getQuote();
  displayQuote();
});
copyButton.addEventListener("click", copyQuote);
tweetButton.addEventListener("click", tweetQuote);

// Function to display the quote and author in the DOM
function displayQuote() {
  if (currentQuote) {
    quote.textContent = `"${currentQuote.content}"`;
    author.textContent = `- ${currentQuote.author}`;
  }
}

// Async function to fetch a random quote from the API
async function getQuote() {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data.data);
    currentQuote = data.data;
  } catch (error) {
    console.error(error);
  }
}

// Function to share the quote on Twitter
function tweetQuote() {
  if (currentQuote) {
    const quoteText = currentQuote.content;
    // Create Twitter share URL with encoded quote text
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quoteText
    )}`;
    // Open Twitter in a new window
    window.open(tweetUrl, "_blank");
  } else {
    return;
  }
}

// Function to copy the quote to clipboard
function copyQuote() {
  const quoteText = quote.textContent;
  navigator.clipboard.writeText(quoteText);
  alert("Quote copied to clipboard!");
}

// Function to export the quote as a text file
function exportQuote() {
  if (currentQuote) {
    // Format the quote and author for the text file
    const quoteText = currentQuote.content;
    const authorText = currentQuote.author;
    const quoteData = `Quote: ${quoteText}\nAuthor: ${authorText}`;

    // Create a blob and generate download link
    const blob = new Blob([quoteData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quote.txt";
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  } else {
    return;
  }
}

// Initialize the app when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  getQuote();
  displayQuote();
});
