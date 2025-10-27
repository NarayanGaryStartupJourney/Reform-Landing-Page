// Netlify Serverless Function
// This proxies form submissions to Google Apps Script
// Twitter iOS allows submissions to same-origin, so this works!

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_NwzIbLuY2kUNa-nN2DV7crUwJt4my-mBZEQtvjUlJBYADCta7dttvUByKP9Q3nLh/exec';
    
    // Get email from request
    let email, source;
    
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      email = body.email;
      source = body.source || 'landing_page';
    } else if (event.httpMethod === 'GET') {
      email = event.queryStringParameters?.email;
      source = event.queryStringParameters?.source || 'landing_page';
    }
    
    console.log('Proxying submission:', { email, source, method: event.httpMethod });
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Email is required' 
        })
      };
    }
    
    // Forward to Google Apps Script
    const params = new URLSearchParams({
      email: email,
      source: source,
      timestamp: new Date().toISOString()
    });
    
    const googleUrl = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
    
    console.log('Forwarding to:', googleUrl);
    
    // Make request to Google Script
    const response = await fetch(googleUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Reform-Proxy/1.0'
      }
    });
    
    const result = await response.text();
    console.log('Google Script response:', result);
    
    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email added to waitlist',
        email: email
      })
    };
    
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

