/**
 * ProFormance Waitlist - Debug Google Apps Script
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
    console.log('=== POST REQUEST RECEIVED ===');
    console.log('Full event object:', e);
    console.log('Parameters:', e.parameter);
    console.log('Post data type:', e.postData ? e.postData.type : 'No postData');
    console.log('Post data contents:', e.postData ? e.postData.contents : 'No postData');
    
    // Get form data from parameters
    const email = e.parameter.email;
    const source = e.parameter.source || 'landing_page';
    const timestamp = new Date();
    
    console.log('Extracted email:', email);
    console.log('Extracted source:', source);
    console.log('Generated timestamp:', timestamp);
    
    if (!email) {
      console.error('No email provided!');
      return ContentService
        .createTextOutput('Error: No email provided')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Get the spreadsheet
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    console.log('Opening spreadsheet with ID:', SPREADSHEET_ID);
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet opened successfully:', spreadsheet.getName());
    
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    console.log('Using sheet:', sheet.getName());
    console.log('Current last row:', sheet.getLastRow());
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      console.log('Adding headers to empty sheet');
      sheet.getRange(1, 1, 1, 4).setValues([['Email', 'Timestamp', 'Source', 'Status']]);
    }
    
    // Add the new submission
    const newRow = [email, timestamp, source, 'Active'];
    console.log('Adding new row:', newRow);
    
    sheet.appendRow(newRow);
    
    console.log('Row added successfully!');
    console.log('New last row:', sheet.getLastRow());
    
    // Return success response
    const response = `Success! Email ${email} added to waitlist at ${timestamp}`;
    console.log('Returning response:', response);
    
    return ContentService
      .createTextOutput(response)
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('=== ERROR IN doPost ===');
    console.error('Error message:', error.toString());
    console.error('Error stack:', error.stack);
    
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  console.log('=== GET REQUEST RECEIVED ===');
  console.log('Parameters:', e.parameter);
  
  return ContentService
    .createTextOutput('ProFormance Waitlist API is running! Timestamp: ' + new Date().toISOString())
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function to add a sample entry
 */
function testAddEntry() {
  console.log('=== TESTING ADD ENTRY ===');
  
  const mockEvent = {
    parameter: {
      email: 'test@example.com',
      source: 'test',
      timestamp: new Date().toISOString()
    }
  };
  
  console.log('Mock event:', mockEvent);
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  return result;
}

/**
 * Check spreadsheet access
 */
function checkSpreadsheetAccess() {
  console.log('=== CHECKING SPREADSHEET ACCESS ===');
  
  try {
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    console.log('Opening spreadsheet with ID:', SPREADSHEET_ID);
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet name:', spreadsheet.getName());
    console.log('Spreadsheet URL:', spreadsheet.getUrl());
    
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    console.log('Sheet name:', sheet.getName());
    console.log('Last row:', sheet.getLastRow());
    console.log('Last column:', sheet.getLastColumn());
    
    // Get current data
    if (sheet.getLastRow() > 0) {
      const data = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
      console.log('Current data:', data);
    }
    
    console.log('Access successful!');
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      spreadsheetUrl: spreadsheet.getUrl(),
      sheetName: sheet.getName(),
      lastRow: sheet.getLastRow(),
      lastColumn: sheet.getLastColumn()
    };
  } catch (error) {
    console.error('Access error:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}
