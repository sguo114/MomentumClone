import $ from "jquery";
const QUOTE_API_URL =
  "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

// api fetch to forismatic for new quote
export default async function GetQuote() {
  if (
    localStorage.getItem("quote") &&
    localStorage.getItem("quote") !== "undefined"
  ) {
    return localStorage.getItem("quote");
  }
  // Forismatic has cors issue with fetch. Use jquery instead.
  const quote = await $.getJSON(QUOTE_API_URL, (data, status) => {
    console.log(`Fetch was a ${status}`);
    localStorage.setItem("quote", JSON.stringify(data));
    return data;
  }).fail(() => {
    console.log("getJSON request failed!");
  });

  return quote;
}
