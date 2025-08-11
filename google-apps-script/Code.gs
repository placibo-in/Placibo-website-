function doPost(e) {
  try {
    // IMPORTANT: Make sure this sheet name matches your sheet tab exactly.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Web leads");
    
    // Parse the incoming data from the website form
    var data = JSON.parse(e.postData.contents);
    
    var name = data.name;
    var email = data.email;
    var phone = data.phone;
    var timestamp = new Date();
    
    // Add the data as a new row in the sheet
    sheet.appendRow([name, email, phone, timestamp]);
    
    // Return a success response
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return an error response if something goes wrong
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}