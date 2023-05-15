import { Configuration, OpenAIApi } from "openai";
// import * as dotenv from "dotenv";
// dotenv.config();

export const getRecommendPlace = async (openApiKey: string, questionContent: string) => {
    const configuration = new Configuration({
        apiKey: openApiKey,
    });
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);
    const model = "gpt-3.5-turbo"
    const response = await openai.createChatCompletion({
        model: model,
        messages: [{ role: "user", content: questionContent }],
    });

    let answer = response.data.choices[0].message?.content;
    return answer;
}