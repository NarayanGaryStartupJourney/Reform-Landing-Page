/**
 * SIMPLE Google Apps Script for ProFormance Waitlist
 * This version uses the absolute simplest response format to avoid any Google Drive errors
 */

function doPost(e) {
  try {
    console.log('doPost called');
    console.log('Request:', JSON.stringify(e));
    
    // Get email from request
    let email, source;
    
    if (e.postData && e.postData.type === 'application/json') {
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      source = data.source || 'landing_page';
    } else {
      email = e.parameter.email || e.parameters.email;
      source = e.parameter.source || e.parameters.source || 'landing_page';
    }
    
    const timestamp = new Date();
    
    console.log('Email:', email);
    console.log('Source:', source);
    
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }
    
    // Get spreadsheet
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    console.log('Sheet:', sheet.getName());
    
    // Add headers if needed
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([['Email', 'Timestamp', 'Source', 'Status']]);
    }
    
    // Add the email
    sheet.appendRow([email, timestamp, source, 'Active']);
    
    console.log('Email added successfully');
    
    // Return simple text (no HTML, no JSON)
    return ContentService.createTextOutput('SUCCESS');
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput('ERROR: ' + error.toString());
  }
}

function doGet(e) {
  try {
    console.log('doGet called');
    
    // Check if this is a form submission
    if (e.parameter && e.parameter.email) {
      const email = e.parameter.email;
      const source = e.parameter.source || 'landing_page';
      const timestamp = new Date();
      
      console.log('GET Email:', email);
      console.log('GET Source:', source);
      
      if (!email || email.trim() === '') {
        throw new Error('Email is required');
      }
      
      // Get spreadsheet
      const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
      
      // Add headers if needed
      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, 4).setValues([['Email', 'Timestamp', 'Source', 'Status']]);
      }
      
      // Add the email
      sheet.appendRow([email, timestamp, source, 'Active']);
      
      console.log('GET Email added successfully');
      
      // Check if redirect requested
      if (e.parameter.redirect) {
        const redirectUrl = e.parameter.redirect + '?submitted=true&email=' + encodeURIComponent(email);
        return HtmlService.createHtmlOutput(
          '<script>window.location.href="' + redirectUrl + '";</script>'
        );
      }
      
      // Return simple text
      return ContentService.createTextOutput('SUCCESS');
      
    } else {
      // Regular GET (testing)
      return ContentService.createTextOutput('ProFormance Waitlist API is running!');
    }
    
  } catch (error) {
    console.error('GET Error:', error);
    return ContentService.createTextOutput('ERROR: ' + error.toString());
  }
}

/**
 * Test function
 */
function testAddEntry() {
  const mockEvent = {
    parameter: {
      email: 'test@example.com',
      source: 'test'
    }
  };
  
  const result = doGet(mockEvent);
  Logger.log(result.getContent());
}

