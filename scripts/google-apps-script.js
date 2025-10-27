/**
 * Reform Waitlist - Updated Google Apps Script with CORS support
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
    // Return HTML instead of JSON to avoid Google Drive error
    return HtmlService.createHtmlOutput(
      '<html><body>' +
      '<h1>Success!</h1>' +
      '<p>Email added to waitlist: ' + email + '</p>' +
      '<p>You can close this window.</p>' +
      '<script>window.close();</script>' +
      '</body></html>'
    );
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Send error response as HTML
    return HtmlService.createHtmlOutput(
      '<html><body>' +
      '<h1>Error</h1>' +
      '<p>There was an error processing your submission.</p>' +
      '<p>Error: ' + error.toString() + '</p>' +
      '<p>Please try again or contact support.</p>' +
      '</body></html>'
    );
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
      
      // Check if a redirect URL was provided (for form redirect method)
      if (e.parameter.redirect) {
        console.log('Redirect requested to:', e.parameter.redirect);
        const redirectUrl = e.parameter.redirect + '?submitted=true&email=' + encodeURIComponent(email);
        return HtmlService.createHtmlOutput(
          '<html><head><meta http-equiv="refresh" content="0;url=' + redirectUrl + '"></head>' +
          '<body>Success! Redirecting...</body></html>'
        );
      }
      
      // Return a simple success response (for image beacon / AJAX)
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

/**
 * Clean up the waitlist by removing duplicates and invalid entries
 * Run this function from the Google Apps Script editor
 */
function cleanupWaitlist() {
  try {
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    console.log('Starting cleanup...');
    console.log('Initial rows:', sheet.getLastRow());
    
    // Get all data
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      console.log('No data to clean up (only headers or empty sheet)');
      return {
        success: true,
        message: 'No data to clean up',
        removedCount: 0
      };
    }
    
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 4); // Skip header row
    const data = dataRange.getValues();
    
    console.log('Total entries:', data.length);
    
    // Track unique emails and rows to keep
    const uniqueEmails = new Map();
    const validRows = [];
    let duplicateCount = 0;
    let invalidCount = 0;
    let testCount = 0;
    
    // Process each row
    data.forEach((row, index) => {
      const email = row[0] ? row[0].toString().trim().toLowerCase() : '';
      const timestamp = row[1];
      const source = row[2];
      const status = row[3];
      
      // Skip invalid entries (empty email)
      if (!email || email === '') {
        console.log('Removing invalid entry (empty email) at row', index + 2);
        invalidCount++;
        return;
      }
      
      // Skip test entries
      if (email.includes('test@') || email === 'test@example.com' || email.includes('example.com')) {
        console.log('Removing test entry:', email);
        testCount++;
        return;
      }
      
      // Check for duplicates - keep the first occurrence (oldest entry)
      if (uniqueEmails.has(email)) {
        console.log('Removing duplicate:', email, 'at row', index + 2);
        duplicateCount++;
        return;
      }
      
      // This is a valid, unique entry
      uniqueEmails.set(email, true);
      validRows.push([email, timestamp, source, status]);
    });
    
    console.log('Valid entries:', validRows.length);
    console.log('Removed - Duplicates:', duplicateCount, 'Invalid:', invalidCount, 'Test:', testCount);
    
    // Clear all data (except headers)
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 4).clear();
    }
    
    // Write back the cleaned data
    if (validRows.length > 0) {
      sheet.getRange(2, 1, validRows.length, 4).setValues(validRows);
    }
    
    console.log('Cleanup complete!');
    console.log('Final rows:', sheet.getLastRow());
    
    const totalRemoved = duplicateCount + invalidCount + testCount;
    
    return {
      success: true,
      message: 'Waitlist cleaned successfully!',
      totalEntries: data.length,
      validEntries: validRows.length,
      removedTotal: totalRemoved,
      removedDuplicates: duplicateCount,
      removedInvalid: invalidCount,
      removedTest: testCount
    };
    
  } catch (error) {
    console.error('Cleanup error:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Preview what would be removed without actually removing anything
 * Run this first to see what will be cleaned up
 */
function previewCleanup() {
  try {
    const SPREADSHEET_ID = '1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Waitlist') || spreadsheet.getActiveSheet();
    
    console.log('=== PREVIEW CLEANUP (no changes will be made) ===');
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      console.log('No data to preview');
      return { success: true, message: 'No data to clean up' };
    }
    
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 4);
    const data = dataRange.getValues();
    
    const uniqueEmails = new Map();
    const duplicates = [];
    const invalid = [];
    const testEntries = [];
    
    data.forEach((row, index) => {
      const email = row[0] ? row[0].toString().trim().toLowerCase() : '';
      const rowNum = index + 2;
      
      // Check invalid
      if (!email || email === '') {
        invalid.push(`Row ${rowNum}: (empty email)`);
        return;
      }
      
      // Check test entries
      if (email.includes('test@') || email === 'test@example.com' || email.includes('example.com')) {
        testEntries.push(`Row ${rowNum}: ${email}`);
        return;
      }
      
      // Check duplicates
      if (uniqueEmails.has(email)) {
        duplicates.push(`Row ${rowNum}: ${email} (duplicate of row ${uniqueEmails.get(email)})`);
        return;
      }
      
      uniqueEmails.set(email, rowNum);
    });
    
    console.log('\n--- Duplicates to be removed:', duplicates.length, '---');
    duplicates.forEach(d => console.log(d));
    
    console.log('\n--- Invalid entries to be removed:', invalid.length, '---');
    invalid.forEach(i => console.log(i));
    
    console.log('\n--- Test entries to be removed:', testEntries.length, '---');
    testEntries.forEach(t => console.log(t));
    
    console.log('\n=== SUMMARY ===');
    console.log('Total entries:', data.length);
    console.log('Valid unique entries:', uniqueEmails.size);
    console.log('To be removed:', duplicates.length + invalid.length + testEntries.length);
    
    return {
      success: true,
      totalEntries: data.length,
      validEntries: uniqueEmails.size,
      toBeRemoved: duplicates.length + invalid.length + testEntries.length,
      duplicates: duplicates,
      invalid: invalid,
      testEntries: testEntries
    };
    
  } catch (error) {
    console.error('Preview error:', error);
    return { success: false, error: error.toString() };
  }
}
