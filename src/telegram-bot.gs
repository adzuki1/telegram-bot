/*
Some strings are in portuguese-BR cause it's my native language, and I do use this bot regularly with these strings
*/

// global variables used in functions
var token = "paste your token here";
var telegram_url = "https://api.telegram.org/bot" + token;
var web_app_url = "paste web app URL after deploy";

//
function setWebhook(){
  var url = telegram_url + "/setWebhook?url=" + web_app_url;
  var response = UrlFetchApp.fetch(url);
  // Logger.log(response.getContentText()); // verify log if needed
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
  var spreadsheet_id = "paste ID founded at spreadsheet URL"; 
  var sheet = SpreadsheetApp.openById(spreadsheet_id).getSheetByName("Sheet1");

  // return resources information
  if((text == "Renda") || (text == "renda")){
     var budget = sheet.getDataRange().getCell(1,2).getValue();
     return sendMessage(id, budget);
  }
  else if((text == "Despesas") || (text == "despesas")){
     var expenses = sheet.getDataRange().getCell(2,2).getValue();
     return sendMessage(id, expenses);
  }
  else if((text == "Economias") || (text == "economias")){
     var economy = sheet.getDataRange().getCell(3,2).getValue();
     return sendMessage(id, economy);
  }
  else{
    if(text.indexOf("-") !== -1){
      // get simple date
      var dateNow = new Date;
      var reformmated_date = dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear();
      /*
      item[0]: Descrição
      item[1]: Valor
      item[2]: Categoria
      */
      var item = text.split(" - ");

      sheet.appendRow([reformmated_date, item[0], item[1], item[2]]);
      return sendMessage(id, "Adicionado");
    }
    else{
      return sendMessage(id, "Por favor, informe uma despesa no formato: [Descrição] - [Valor] - [Categoria]");
    }
  }
}

