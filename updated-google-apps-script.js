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
    
    // Parse the form data - handle both JSON and form-encoded data
    let email, source;
    
    // Check if data is sent as JSON (fetch) or form data (form submission)
    if (e.postData && e.postData.type === 'application/json') {
      // JSON data from fetch
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      source = data.source || 'landing_page';
    } else {
      // Form data from traditional form submission
      email = e.parameter.email || e.parameters.email;
      source = e.parameter.source || e.parameters.source || 'landing_page';
    }
    
    const timestamp = new Date();
    
    console.log('Received email:', email);
    console.log('Source:', source);
    
    // Validate email
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }
    
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
  try {
    // Check if this is a form submission (has email parameter)
    if (e.parameter && e.parameter.email) {
      console.log('GET request with email - processing as submission');
      
      // Extract parameters
      const email = e.parameter.email;
      const source = e.parameter.source || 'landing_page';
      const timestamp = new Date();
      
      console.log('Received email via GET:', email);
      console.log('Source:', source);
      
      // Validate email
      if (!email || email.trim() === '') {
        throw new Error('Email is required');
      }
      
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
      
      // Return a 1x1 transparent GIF (for image beacon)
      // This is critical for Twitter and other in-app browsers
      const output = ContentService.createTextOutput('');
      output.setMimeType(ContentService.MimeType.TEXT);
      
      // Add permissive headers for in-app browsers
      output.setContent('success');
      
      return output;
      
    } else {
      // Regular GET request (for testing)
      const response = ContentService.createTextOutput();
      response.setMimeType(ContentService.MimeType.JSON);
      
      const result = {
        message: 'Reform Waitlist API is running!',
        timestamp: new Date().toISOString(),
        status: 'active'
      };
      
      return response.setContent(JSON.stringify(result));
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    
    // Return 1x1 pixel even on error (for image beacon fallback)
    return ContentService.createTextOutput().setContent('').setMimeType(ContentService.MimeType.TEXT);
  }
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
