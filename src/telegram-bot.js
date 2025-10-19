// global variables used in functions
var token = "8240070489:AAGFhdCeNaaPZXvuej23uuQsxGJk1VWDi00";
var telegram_url = "https://api.telegram.org/bot" + token;
var web_app_url = "https://script.google.com/macros/s/AKfycbw0ZLJHlV0S3mCxyxxLMx--_PmHGohoH0z1D6KU5joe_HmYdU9FE9_yipPS55HV6A8o/exec";

//
function setWebhook(){
  var url = telegram_url + "/setWebhook?url=" + web_app_url;
  var response = UrlFetchApp.fetch(url);
  // Logger.log(response.getContentText()); // para verificar a resposta no log
}

//
function sendMessage(id, text){
  var url = telegram_url + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
}

//
function doPost(e){
  var contents = JSON.parse(e.postData.contents);
  var id = contents.message.from.id;
  var text = contents.message.text;
  sendMessage(id, "Confirmed, received.");

  var spreadsheet_id = "1plnBYQ9kShQGhfkVPKtHeMar0k1ThtvTahYIVLvx49E"; 
  var sheet = SpreadsheetApp.openById(spreadsheet_id).getSheetByName("Sheet1");
  var dateNow = new Date;

  sheet.appendRow([text, "outro texto", 1234]);
}

function dateNow(){
  var dateNow = new Date;
  Logger.log(dateNow);
}
