/**
 * ProFormance Waitlist - Updated Google Apps Script with CORS support
 * This script handles form submissions and adds them to a Google Spreadsheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Open your existing project
 * 3. Replace the code with this updated version
 * 4. Save and redeploy
 */

function doPost(e) {
  try {
    // Add CORS headers
    const response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const source = data.source || 'landing_page';
    const timestamp = new Date();
    
    console.log('Received data:', data);
    
    // Get the spreadsheet
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    console.log('Sheet name:', sheet.getName());
    console.log('Last row before:', sheet.getLastRow());
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([['Email', 'Timestamp', 'Source', 'Status']]);
      console.log('Added headers');
    }
    
    // Add the new submission
    const newRow = [email, timestamp, source, 'Active'];
    sheet.appendRow(newRow);
    
    console.log('Added row:', newRow);
    console.log('Last row after:', sheet.getLastRow());
    
    // Send success response
    const result = {
      success: true, 
      message: 'Email added to waitlist',
      email: email,
      timestamp: timestamp.toISOString()
    };
    
    return response.setContent(JSON.stringify(result));
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Send error response
    const errorResponse = ContentService.createTextOutput();
    errorResponse.setMimeType(ContentService.MimeType.JSON);
    
    const errorResult = {
      success: false, 
      message: 'Error processing submission: ' + error.toString(),
      error: error.toString()
    };
    
    return errorResponse.setContent(JSON.stringify(errorResult));
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  
  const result = {
    message: 'ProFormance Waitlist API is running!',
    timestamp: new Date().toISOString(),
    status: 'active'
  };
  
  return response.setContent(JSON.stringify(result));
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
