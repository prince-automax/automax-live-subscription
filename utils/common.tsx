export function SecondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60); //60== here 60 means seconds in a minute
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hrs, " : " hrs, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " mins, " : " mins, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " secs" : " secs") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
