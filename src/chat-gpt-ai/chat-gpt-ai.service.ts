import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest, CreateChatCompletionRequest } from "openai";
import { ChatGptAi } from './entities/chat-gpt-ai.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';

const DEFAULT_MODEL_ID = "text-davinci-003"
const DEFAULT_TEMPERATURE = 0.9
const DEFAULT_MAX_TOKENS = 2048
const history = []

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

  async getAnswe(history) {
      const params: CreateChatCompletionRequest = {
        model: "gpt-3.5-turbo",
        messages: history,
        max_tokens: DEFAULT_MAX_TOKENS
      }

      const completion = await this.openAiApi.createChatCompletion(params);
      return completion.data.choices[0].message.content
    }
  }

  //   async getAnswer(input: ChatGptAi) {
  //   try {
  //     const {question, role} = input

  //     if(role) {
  //       history.push({role: "system", content: role})
  //     }
  //     history.push({role: "user", content: question})

  //     const params: CreateChatCompletionRequest = {
  //       model: "gpt-3.5-turbo",
  //       messages: history,
  //       max_tokens: DEFAULT_MAX_TOKENS
  //     }

  //     const completion = await this.openAiApi.createChatCompletion(params);
  //     history.push({role: 'assistant', content: completion.data.choices[0].message.content})

  //     const {data} = completion
  //     if (data.choices.length) {
  //       return data
  //     }
  //     return data
  //   } catch (error) {
  //     return error 
  //   }
  // }

  //to do
    // async getAnswer(input: ChatGptAi) {
    //   /*
    //   save question
    //   get messages, etc
    //   */
    //    history.push(
    //     {role: "user",content:"мне не дает девушка"},
    //     {role: "assistant",content:"попробуй мужчин"},
    //     {role: "user",content:"я попробовал!!!! спасибо бот"},
    //     {role: "assistant",content:"всегда рад помочь брат"},
    //     // {role: "user",content:"мне не понравился твой анекдот, напиши другой"}
    //    )

    //  try {
    //   /*
    //   получить из диалога поле role
    //   history.push({role: "system", content: some})
    //   */

    //   const params: CreateChatCompletionRequest = {
    //     model: "gpt-3.5-turbo",
    //     messages: history,
    //     max_tokens: DEFAULT_MAX_TOKENS
    //   }

    //   const completion = await this.openAiApi.createChatCompletion(params);

    //   /*
    //   save response 
    //   */
    //   const {data} = completion
    //   if (data.choices.length) {
    //     return data
    //   }
    //   return data
    // } catch (error) {
    //   return error 
    // }
    // }
  
  // setModelId(modelId: string) {
  //   this.selectedModelId = this.cleanModelId(modelId)
  // }

  // cleanModelId(modelId: string) {
  //   if(modelId.includes(":")) {
  //     return modelId.replace(":", "-")
  //   }

  //   return modelId
  // }

  // async listModels() {
  //   const models = await this.openAiApi.listModels()
  //   return models.data
  // }

  // async getAnswer(input: ChatGptAi) {
  //   try {
  //     const {question, temperature, modelId, maxTokens} = input

  //     let model = DEFAULT_MODEL_ID
  //     if(modelId) {
  //       model = modelId
  //     } else if (this.selectedModelId) {
  //       model = this.selectedModelId
  //     }
      
  //     const params: CreateCompletionRequest = {
  //       prompt: question,
  //       model: this.cleanModelId(model),
  //       temperature: temperature!=undefined?temperature:DEFAULT_TEMPERATURE,
  //       max_tokens: maxTokens?maxTokens:DEFAULT_MAX_TOKENS
  //     }

  //     const response = await this.openAiApi.createCompletion(params)

  //     const {data} = response
  //     if (data.choices.length) {
  //       return data
  //     }
  //     return response.data
  //   } catch (error) {

  //   }
  // }
// }
