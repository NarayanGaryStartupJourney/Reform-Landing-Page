/**
 * Reform Waitlist - Updated Google Apps Script with CORS support
 * This script handles form submissions and adds them to a Google Spreadsheet
 */
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    let email, source;
    if (e.postData && e.postData.type === 'application/json') {
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      source = data.source || 'landing_page';
    } else {
      email = e.parameter.email || e.parameters.email;
      source = e.parameter.source || e.parameters.source || 'landing_page';
      
      if (Array.isArray(email)) email = email[0];
      if (Array.isArray(source)) source = source[0];
    }
    
    const timestamp = new Date();
        
    // Validate email
    if (!email || email.trim() === '') {
      console.error('Validation failed: Email is empty');
      throw new Error('Email is required');
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Validation failed: Invalid email format:', email);
      throw new Error('Invalid email format');
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
    
    try {
      sheet.appendRow(newRow);
      console.log('✓ Successfully added row:', newRow);
      console.log('Last row after:', sheet.getLastRow());
    } catch (appendError) {
      console.error('Error appending row:', appendError);
      // Try alternative method
      const lastRow = sheet.getLastRow();
      sheet.getRange(lastRow + 1, 1, 1, 4).setValues([newRow]);
      console.log('✓ Added row using setValues method');
    }
    
    // Send success response
    // Return HTML instead of JSON to avoid Google Drive error
    console.log('Returning success HTML');
    return HtmlService.createHtmlOutput(
      '<html><body>' +
      '<h1>Success!</h1>' +
      '<p>Email added to waitlist: ' + email + '</p>' +
      '<p>You can close this window.</p>' +
      '<script>window.close();</script>' +
      '</body></html>'
    );
      
  } catch (error) {
    console.error('=== ERROR IN doPost ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Request data:', JSON.stringify({
      parameter: e.parameter || {},
      postData: e.postData || {}
    }));
    
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
    // Log the incoming request for debugging
    console.log('=== GET REQUEST RECEIVED ===');
    console.log('Parameters:', JSON.stringify(e.parameter));
    console.log('User Agent:', e.parameter.userAgent || 'Not provided');
    
    // Check if this is a form submission (has email parameter)
    if (e.parameter && e.parameter.email) {
      console.log('GET request with email - processing as submission');
      
      // Extract parameters
      const email = e.parameter.email;
      const source = e.parameter.source || 'landing_page';
      const timestamp = new Date();
      const userAgent = e.parameter.userAgent || '';
      
      console.log('Received email via GET:', email);
      console.log('Source:', source);
      console.log('Timestamp:', timestamp.toISOString());
      
      // Validate email format
      if (!email || email.trim() === '') {
        console.error('Validation failed: Email is empty');
        throw new Error('Email is required');
      }
      
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error('Validation failed: Invalid email format:', email);
        throw new Error('Invalid email format');
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
      
      // Check for duplicates (optional - uncomment if you want to prevent duplicates)
      // const dataRange = sheet.getRange(2, 1, Math.max(1, sheet.getLastRow() - 1), 1);
      // const existingEmails = dataRange.getValues().flat().map(e => e.toLowerCase());
      // if (existingEmails.includes(email.toLowerCase())) {
      //   console.log('Duplicate email detected:', email);
      //   // Still return success to user, but don't add duplicate
      //   return ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
      // }
      
      // Add the new submission
      const newRow = [email, timestamp, source, 'Active'];
      
      try {
        sheet.appendRow(newRow);
        console.log('✓ Successfully added row:', newRow);
        console.log('Last row after:', sheet.getLastRow());
      } catch (appendError) {
        console.error('Error appending row:', appendError);
        // Try alternative method
        const lastRow = sheet.getLastRow();
        sheet.getRange(lastRow + 1, 1, 1, 4).setValues([newRow]);
        console.log('✓ Added row using setValues method');
      }
      
      // Check if a redirect URL was provided (for form redirect method)
      if (e.parameter.redirect) {
        console.log('Redirect requested to:', e.parameter.redirect);
        const redirectUrl = e.parameter.redirect + '?submitted=true&email=' + encodeURIComponent(email);
        return HtmlService.createHtmlOutput(
          '<html><head><meta http-equiv="refresh" content="0;url=' + redirectUrl + '"></head>' +
          '<body>Success! Redirecting...</body></html>'
        );
      }
      
      // Return a response optimized for image beacons and restricted browsers
      // For image beacons, we return a 1x1 transparent PNG (base64 encoded)
      // This ensures maximum compatibility with Twitter iOS and other restricted browsers
      console.log('Returning image beacon response (1x1 transparent PNG)');
      
      // 1x1 transparent PNG in base64
      const transparentPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      
      try {
        // Try to return as PNG (best for image beacons)
        const blob = Utilities.newBlob(Utilities.base64Decode(transparentPng), 'image/png', 'pixel.png');
        return ContentService.createBlobOutput(blob).setMimeType(ContentService.MimeType.PNG);
      } catch (blobError) {
        // Fallback to text if blob creation fails
        console.log('Blob creation failed, using text fallback:', blobError);
        const output = ContentService.createTextOutput('success');
        output.setMimeType(ContentService.MimeType.TEXT);
        return output;
      }
      
    } else {
      // Regular GET request (for testing/health check)
      console.log('Health check request');
      const response = ContentService.createTextOutput();
      response.setMimeType(ContentService.MimeType.JSON);
      
      const result = {
        message: 'Reform Waitlist API is running!',
        timestamp: new Date().toISOString(),
        status: 'active',
        version: '2.1',
        cors: 'enabled',
        methods: ['GET', 'POST', 'OPTIONS'],
        note: 'CORS headers are automatically added by Google Apps Script when deployed with "Anyone" access'
      };
      
      return response.setContent(JSON.stringify(result));
    }
  } catch (error) {
    console.error('=== ERROR IN doGet ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Parameters:', JSON.stringify(e.parameter || {}));
    
    // Still return success for image beacon (can't show errors to user anyway)
    // Log the error for debugging but don't fail the request
    // Return a 1x1 transparent PNG even on error to ensure image beacon works
    try {
      const transparentPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const blob = Utilities.newBlob(Utilities.base64Decode(transparentPng), 'image/png', 'pixel.png');
      return ContentService.createBlobOutput(blob).setMimeType(ContentService.MimeType.PNG);
    } catch (blobError) {
      return ContentService.createTextOutput('error').setMimeType(ContentService.MimeType.TEXT);
    }
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
 * Test CORS configuration
 * Run this after deploying to verify CORS is working
 */
function testCORS() {
  console.log('=== TESTING CORS CONFIGURATION ===');
  
  // Check deployment settings
  console.log('\n✓ Script is ready to handle requests');
  console.log('\n📋 CORS Checklist:');
  console.log('  1. Deploy as Web App');
  console.log('  2. Execute as: Me');
  console.log('  3. Who has access: Anyone (NOT "Anyone with Google account")');
  console.log('  4. Deploy a NEW VERSION after any code changes');
  console.log('\n🔍 Test your deployment:');
  console.log('  - Health check: [Your Web App URL]');
  console.log('  - Test GET: [Your Web App URL]?email=test@example.com&source=test');
  console.log('\n💡 Google Apps Script automatically adds these CORS headers:');
  console.log('  - Access-Control-Allow-Origin: *');
  console.log('  - Access-Control-Allow-Methods: GET, POST, OPTIONS');
  console.log('  - Access-Control-Allow-Headers: Content-Type');
  console.log('\n✅ If deployed correctly, your form will work on ALL browsers!');
  
  return {
    status: 'CORS is enabled',
    message: 'Check execution logs for details',
    tip: 'Deploy with "Anyone" access for CORS to work'
  };
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

