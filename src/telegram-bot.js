// global variables used in functions
var token = "paste your token here";
var telegram_url = "https://api.telegram.org/bot" + token;
var web_app_url = "paste web app URL after deploy";

//
function setWebhook(){
  var url = telegram_url + "/setWebhook?url=" + web_app_url;
  var response = UrlFetchApp.fetch(url);
  // Logger.log(response.getContentText()); // if needed to verify log
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

  var spreadsheet_id = "id founded at URL"; 
  var sheet = SpreadsheetApp.openById(spreadsheet_id).getSheetByName("Sheet1");
  var dateNow = new Date;

  sheet.appendRow([text, "outro texto", 1234]); //
}

// storing simple date format: dd/mm/yyyy
function dateNow(){
  var dateNow = new Date;
   var reformmated_date = dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear();
  Logger.log(dateNow);
  Logger.log(reformmated_date);
}
