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

  var spreadsheet_id = "id founded at spreadsheet URL"; 
  var sheet = SpreadsheetApp.openById(spreadsheet_id).getSheetByName("Sheet1");

  // get simple date in format dd/mm/yyyy
  var dateNow = new Date;
  var reformmated_date = dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear();

  sheet.appendRow([reformmated_date, text]);
}

