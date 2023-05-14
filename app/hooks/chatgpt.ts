import { Configuration, OpenAIApi } from "openai";
// import * as dotenv from "dotenv";
// dotenv.config();

export const getRecommendPlace = async (openApiKey: string) => {
    const configuration = new Configuration({
        apiKey: openApiKey,
    });
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);
    const model = "gpt-3.5-turbo"
    const content = "Final Fantasy XIV の都市「ウルダハ」について教えてください";
    const response = await openai.createChatCompletion({
        model: model,
        messages: [{ role: "user", content: content }],
    });
    console.log("run")

    console.log(response);

    const answer = response.data.choices[0].message?.content;
    console.log(answer);
}