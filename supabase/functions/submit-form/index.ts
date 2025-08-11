import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// This is the URL of your Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8K2vr1V7vronNtAX1M9eo2Rhfjy1-23Z8iUTvsJIvA8nNq7aHp6KELNTC4B9NKh6o3w/exec";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the form data from the request body
    const formData = await req.json()

    // Forward the data to the Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    // Check if the Google Script request was successful
    if (!response.ok) {
      throw new Error(`Google Script request failed with status ${response.status}`)
    }

    // Get the response from the Google Script
    const scriptResult = await response.json()

    // Return the Google Script's response to the client
    return new Response(JSON.stringify(scriptResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    // Return an error response if anything goes wrong
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})