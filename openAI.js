require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function createCompletion(input) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003', // or any other chat model you want to use
    prompt: input,
    max_tokens: 1000,
  });
  console.log(completion.data.choices[0].text);
}

export { createCompletion };
