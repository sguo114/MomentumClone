import $ from "jquery";
const QUOTE_API_URL =
  "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

export default async function GetQuote() {
  // Forismatic has cors issue with fetch. Use jquery instead.
  const quote = await $.getJSON(QUOTE_API_URL, (data, status) => {
    console.log(`Fetch was a ${status}`, data);
    return data;
  }).fail(() => {
    console.log("getJSON request failed!");
  });

  return quote;
}
