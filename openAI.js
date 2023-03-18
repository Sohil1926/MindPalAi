require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function createCompletion() { 
    const completion = await openai.createCompletion({
        model: "text-davinci-003", // or any other chat model you want to use
        prompt: "Write a 10 word sentence on why Canada is such a good country.",
        max_tokens: 1000,
      });
    console.log(completion.data.choices[0].text);
}

createCompletion();