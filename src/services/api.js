export const fetchLatestReport = async () => {
  const url = 'https://satyam1421.app.n8n.cloud/webhook/latest-report';
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    const text = await response.text();
    console.log("Raw API Response:", text);
    
    if (!response.ok) {
      throw new Error(`API Error (${response.status}): ${text || response.statusText}`);
    }
    
    if (!text || text.trim() === '') {
      throw new Error("Received empty response from API");
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // Format C: Plain text report
      return text;
    }
    
    // Parse both possible responses:
    // a) { "output": "..." }
    // b) [ { "output": "..." } ]
    
    if (Array.isArray(data)) {
      if (data.length > 0 && data[0].output) {
        return data[0].output;
      }
    } else if (data && data.output) {
      return data.output;
    }
    
    throw new Error("Invalid response format from webhook");
  } catch (error) {
    console.error("fetchLatestReport encountered an error:", error);
    if (error.name === 'AbortError') {
      throw new Error("Request timed out after 120 seconds. The AI agent might be taking too long.");
    }
    throw error;
  }
};
