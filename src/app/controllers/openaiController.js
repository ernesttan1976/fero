const axios = require('axios')
const Course = require("../models/Course");
// const User = require('../models/User');
const { Configuration, OpenAIApi } = require("openai");
const axiosRetry = require('axios-retry');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//special axios with exponential backoff
const axiosInstance = axios.create({
  // Set a maximum of 5 retries
  retry: { retries: 3 },

  // Set the delay between retries to be an exponential function
  retryDelay: (retryCount) => {
    const delay = Math.pow(2, retryCount) * 100;
    return delay;
  }
});


// Apply the retry configuration to the axios instance
axiosRetry(axiosInstance, { retries: 3 });


const getMessages = async (req, res) => {
  try {
    const course_id = req.params.id;
    const foundCourse = await Course.findById(course_id).populate('discussions_id');
    console.log(foundCourse.discussions_id)
    res.status(200).json(foundCourse.discussions_id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Create a new message
const postMessage = async (req, res) => {
  try {
    console.log(req.body, req.params.id)
    const {text, name, avatar} = req.body;
    const foundCourse = await Course.findById(req.params.id).populate('discussions_id');
    foundCourse.discussions_id.push({
      text, name, avatar
    });
    foundCourse.save();
    res.status(200).json({message: "ok"})
    //res.status(200).json(foundCourse.discussions_id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

// Send message to OpenAI's GPT-3 API
const postMessageToBot = async (req, res) => {
  try {
    const course_id = req.params.id;
    const { text, context, numTokens } = req.body;
    let prompt;
    if (context === "AI Powered Chat"){
      prompt = `${text}`;
    } else {
     prompt = `As a expert in ${context}, ${text}`;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };

    const tokenLength = Math.floor(prompt.length / 2);
    
    const data = {
      prompt: prompt,
      max_tokens: tokenLength*2,
      n: 1,
      // stop: ['\n'],
      temperature: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      model: 'text-davinci-003'
    };
    
    const response = await axiosInstance.post('https://api.openai.com/v1/completions', data, { headers });
    console.log("response=>",response)
    let completion;
    if (response.data.choices && response.data.choices.length > 0) {
        completion = response.data.choices[0].text;
        console.log("completion=>", completion)
    } else {
        completion ="There was no reply from OpenAI";
        console.log("There was no reply from OpenAI");
    }

    const message = {
      text: JSON.stringify(completion),
      name: "@super",
      avatar: "/favicon-32x32.png"
    };
    
    const foundCourse = await Course.findById(course_id).populate('discussions_id');
    foundCourse.discussions_id.push(message);
    await foundCourse.save();
    
    res.status(200).json({ success: true, message: message });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error generating response from bot' });
  }
};

const postMessageToBotVer2 = async (req, res) => {
  try {
    const course_id = req.params.id;
    const { text, context, numTokens } = req.body;
    let prompt;
    if (context === "AI Powered Chat"){
      prompt = `${text}`;
    } else {
     prompt = `As a expert in ${context}, ${text}`;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };

    const tokenLength = Math.floor(prompt.length / 2);
    
    const data = {
      messages: [{"role": "user", "content": prompt}],
      model: "gpt-3.5-turbo",
      max_tokens: numTokens,
      temperature: 0.2,
      top_p: 0.5,
    };
    
    const response = await openai.createChatCompletion(data);
    console.log("response=>",response)
    let completion;
    if (response.data.choices && response.data.choices.length > 0) {
        completion = response.data.choices[0].message.content;
        console.log("response.data.choices[0].message.content", response.data.choices[0].message.content)
        console.log("response.data.choices[0].message.content", {...response.data.choices[0].message})
    } else {
        completion ="There was no reply from OpenAI";
        console.log("There was no reply from OpenAI");
    }

    const message = {
      text: completion,
      name: "@super",
      avatar: "/favicon-32x32.png"
    };
    
    const foundCourse = await Course.findById(course_id).populate('discussions_id');
    foundCourse.discussions_id.push(message);
    await foundCourse.save();
    
    res.status(200).json({ success: true, message: message.text });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error generating response from bot' });
  }
};

function formatText(text) {
  const codeMarker = '```';

  if (text.includes(codeMarker)) {
    let formattedText = '';
    const sections = text.split(codeMarker);

    for (let i = 0; i < sections.length; i++) {
      if (i % 2 === 1) {
        formattedText += `<pre>${sections[i]}</pre>`;
      } else {
        formattedText += sections[i].replace(/\n/g, '<br>');
      }
    }

    return formattedText;
  } else {
    return text.replace(/\n/g, '<br>');
  }
}



module.exports = {
  postMessage,
  getMessages,
  postMessageToBot,
  postMessageToBotVer2
};


