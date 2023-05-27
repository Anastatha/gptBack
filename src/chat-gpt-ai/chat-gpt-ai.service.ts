import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateChatCompletionRequest, ChatCompletionRequestMessage } from "openai";

const DEFAULT_MAX_TOKENS = 2048

@Injectable()
export class ChatGptAiService {

  private readonly openAiApi:OpenAIApi

  constructor(){
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
  });

  this.openAiApi = new OpenAIApi(configuration);
  }

  async getAnswe(history: ChatCompletionRequestMessage[]) {
      const params: CreateChatCompletionRequest = {
        model: "gpt-3.5-turbo",
        messages: history,
        max_tokens: DEFAULT_MAX_TOKENS
      }

      const completion = await this.openAiApi.createChatCompletion(params);
      return completion.data.choices[0].message.content
    }
}
