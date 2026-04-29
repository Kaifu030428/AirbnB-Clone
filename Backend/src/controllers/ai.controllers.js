const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateTripPlan = async (req, res) => {
  try {
    const { destination, days, groupType } = req.body;

    if (!destination || !days || !groupType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Initialize Gemini AI
    // We check if the API key exists, otherwise we return a fallback response
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_api_key_here") {
      // Fallback Response if no API key is provided
      console.log("No Gemini API Key found. Returning simulated response.");
      
      const simulatedPlan = `
Here is your fantastic ${days}-day itinerary for ${destination} with your ${groupType}!

**Day 1: Arrival & Exploration**
* Morning: Arrive and check into your Airbnb. Grab breakfast at a highly rated local cafe.
* Afternoon: Visit the most famous landmark in ${destination} and take plenty of photos.
* Evening: Enjoy a welcome dinner at a popular restaurant. Experience the local nightlife!

**Day 2: Adventure & Culture**
* Morning: Go for a guided tour or a thrilling outdoor activity.
* Afternoon: Explore local markets and street food. Try the regional specialties!
* Evening: Relax and have a quiet evening or a bonfire if you're near nature.

*Note: This is a simulated response because the Gemini API Key is missing in the .env file. Add GEMINI_API_KEY to get real AI-generated itineraries!*
      `;
      return res.status(200).json({ success: true, itinerary: simulatedPlan });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an expert travel planner. Generate a fun, engaging, and highly detailed ${days}-day itinerary for a trip to ${destination} for a group of ${groupType}. Format the response in Markdown with clear headings for each day. Include suggestions for morning, afternoon, and evening activities. Keep the tone exciting and helpful. Don't make it too long, keep it scannable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, itinerary: text });

  } catch (error) {
    console.error("Error generating trip plan:", error);
    res.status(500).json({ success: false, message: "Failed to generate AI trip plan." });
  }
};

const generatePropertyDescription = async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!keywords) {
      return res.status(400).json({ success: false, message: "Keywords are required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_api_key_here") {
      const simulatedDesc = `Welcome to our stunning property featuring: ${keywords}. Experience the perfect blend of comfort and style in this beautiful space. Whether you're here to relax or explore, you'll find everything you need for an unforgettable stay. Book now and make incredible memories!`;
      return res.status(200).json({ success: true, description: simulatedDesc });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an expert real estate and Airbnb copywriter. A host has provided these keywords: "${keywords}". Write a highly engaging, warm, and professional property description (around 3 short paragraphs). Do NOT use markdown headings, just plain text with line breaks. Highlight the best features, make it sound premium, and welcome the guests.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, description: text.trim() });

  } catch (error) {
    console.error("Error generating description:", error);
    res.status(500).json({ success: false, message: "Failed to generate description." });
  }
};

const suggestPrice = async (req, res) => {
  try {
    const { title, location, description } = req.body;

    if (!title || !location) {
      return res.status(400).json({ success: false, message: "Title and location are required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_api_key_here") {
      return res.status(200).json({ success: true, suggestedPrice: 4500, reasoning: "Based on similar properties in this area." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an expert real estate valuer and luxury property pricer in India. 
    Analyze the following property details:
    Title: ${title}
    Location: ${location}
    Description: ${description || "N/A"}
    
    Suggest an optimal nightly rental price in INR (Indian Rupees) for this property. 
    Take into account the location, luxury level, and features mentioned.
    You MUST respond with a valid JSON object ONLY. Do not include any markdown formatting or backticks.
    Format exactly like this:
    {
      "suggestedPrice": 5500,
      "reasoning": "A 1-sentence short explanation of why this price."
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from Gemini
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const parsed = JSON.parse(text);
      res.status(200).json({ success: true, ...parsed });
    } catch (e) {
      // Fallback if parsing fails
      res.status(200).json({ success: true, suggestedPrice: 5000, reasoning: "Estimated base price for this region." });
    }

  } catch (error) {
    console.error("Error generating price:", error);
    res.status(500).json({ success: false, message: "Failed to generate price." });
  }
};

const chatWithConcierge = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_api_key_here") {
      return res.status(200).json({ 
        success: true, 
        reply: "I am your LUXE AI Concierge. However, my API key is missing so I cannot respond dynamically right now. Please add GEMINI_API_KEY to your .env file." 
      });
    }

    // Fetch up to 10 recent properties from the database to give context to Gemini
    const Property = require("../models/property.models");
    const properties = await Property.find().sort({ createdAt: -1 }).limit(10);
    
    let propertyContext = "Currently, our platform has no properties available.";
    if (properties.length > 0) {
      const propDetails = properties.map(p => 
        `- Title: ${p.title}\n  Location: ${p.location}\n  Price: ₹${p.price}/night\n  ID: ${p._id}`
      ).join("\n\n");
      
      propertyContext = `Here are the currently available properties on the LUXE platform:\n${propDetails}\n\nIf the user asks for a recommendation, you MUST pick from this list and provide a Markdown link for them to book it. Format the link EXACTLY like this: [Book {Title}](/property/{ID})`;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build the chat history for context
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `You are the LUXE AI Concierge. You are a highly professional, polite, and luxury-focused travel assistant for the LUXE platform. Help users find properties, plan trips, and answer travel questions. Keep responses short, engaging, and in a premium tone.\n\n${propertyContext}\n\nCRITICAL INSTRUCTION: You MUST always respond strictly in English. Never use Hindi script or Hinglish in your replies. Use Markdown links for properties as instructed.` }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am the LUXE AI Concierge. I will always respond strictly in professional English to assist our esteemed guests and recommend our available properties." }],
        },
        ...(history || []).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }))
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, reply: text });

  } catch (error) {
    console.error("Error in AI Concierge:", error);
    res.status(500).json({ success: false, message: "Concierge is currently unavailable." });
  }
};

const processVoiceSearch = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ success: false, message: "Voice transcript is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return res.status(200).json({ success: true, filters: { location: "Goa" } });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI search parser for a luxury property booking platform. 
    The user spoke the following query: "${transcript}"
    
    Extract the search parameters from the user's speech.
    Possible categories are: "Beachfront", "Amazing pools", "Cabins", "Farms".
    
    Return ONLY a valid JSON object with 'location' and 'category'. If any is not found, leave it as an empty string. 
    Do not use any markdown blocks.
    
    Example: { "location": "goa", "category": "Beachfront" }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const filters = JSON.parse(text);

    res.status(200).json({ success: true, filters });

  } catch (error) {
    console.error("Error processing voice search:", error);
    res.status(500).json({ success: false, message: "Failed to process voice search." });
  }
};

module.exports = { generateTripPlan, generatePropertyDescription, suggestPrice, chatWithConcierge, processVoiceSearch };
