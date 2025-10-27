/**
 * ProFormance Waitlist - Simple Google Apps Script (Form Data)
 * This script handles form submissions and adds them to a Google Spreadsheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Open your existing project
 * 3. Replace ALL the code with this version
 * 4. Save and redeploy
 */

function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Parameters:', e.parameter);
    
    // Get form data
    const email = e.parameter.email;
    const source = e.parameter.source || 'landing_page';
    const timestamp = new Date();
    
    console.log('Email:', email);
    console.log('Source:', source);
    
    // Get the spreadsheet
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    console.log('Spreadsheet opened:', spreadsheet.getName());
    console.log('Sheet name:', sheet.getName());
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([['Email', 'Timestamp', 'Source', 'Status']]);
      console.log('Added headers');
    }
    
    // Add the new submission
    const newRow = [email, timestamp, source, 'Active'];
    sheet.appendRow(newRow);
    
    console.log('Added row:', newRow);
    console.log('Total rows now:', sheet.getLastRow());
    
    // Return success response
    return ContentService
      .createTextOutput('Success! Email added to waitlist.')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
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
  const mockEvent = {
    parameter: {
      email: 'test@example.com',
      source: 'test',
      timestamp: new Date().toISOString()
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  return result;
}

/**
 * Check spreadsheet access
 */
function checkSpreadsheetAccess() {
  try {
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    console.log('Spreadsheet name:', spreadsheet.getName());
    console.log('Sheet name:', sheet.getName());
    console.log('Last row:', sheet.getLastRow());
    console.log('Access successful!');
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      sheetName: sheet.getName(),
      lastRow: sheet.getLastRow()
    };
  } catch (error) {
    console.error('Access error:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}
