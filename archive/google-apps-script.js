/**
 * Google Apps Script for ProFormance Waitlist
 * This script handles form submissions and adds them to a Google Spreadsheet
 */

function doPost(e) {
  try {
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = new Date();
    const source = data.source || 'landing_page';
    
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.openById('1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8'); // Replace with your spreadsheet ID
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([['Email', 'Timestamp', 'Source', 'Status']]);
    }
    
    // Add the new submission
    const newRow = [email, timestamp, source, 'Active'];
    sheet.appendRow(newRow);
    
    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Email added to waitlist'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Send error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: 'Error processing submission'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('ProFormance Waitlist API is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function to add a sample entry
 */
function testAddEntry() {
  const testData = {
    email: 'test@example.com',
    source: 'test',
    timestamp: new Date()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}
