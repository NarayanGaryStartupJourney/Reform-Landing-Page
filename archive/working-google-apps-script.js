/**
 * ProFormance Waitlist - Google Apps Script
 * This script handles form submissions and adds them to a Google Spreadsheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create new project
 * 3. Replace the default code with this code
 * 4. Replace 'YOUR_SPREADSHEET_ID' with your actual spreadsheet ID
 * 5. Save and deploy as Web App (Anyone access)
 * 6. Copy the Web App URL to your script.js file
 */

function doPost(e) {
  try {
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const source = data.source || 'landing_page';
    const timestamp = new Date();
    
    // Get the spreadsheet - REPLACE THIS ID WITH YOUR ACTUAL SPREADSHEET ID
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8'; // Replace with your spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
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
    console.error('Error:', error);
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
