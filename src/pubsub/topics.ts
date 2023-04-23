import axios from "axios"
import PubSub from "./pubsub"
import { convertStringToBase64 } from "../strconv"

class Topic {
  shortName: string
  name: string
  constructor(name: string) {
    this.name = name
    this.shortName = getShortName(name)
  }
}

export function getShortName(name: string): string {
  return name.split("/").pop() || ""
}

export async function createTopic(client: PubSub, shortName: string): Promise<Topic> {
  const res = await axios.put(`${client.baseUrl()}/topics/${shortName}`)
  if (res.data.error) {
    throw new Error(res.data.error.message)
  }
  if (res.data.name === undefined) {
    throw new Error("Topic name not returned")
  }
  return new Topic(res.data.name)
}

export async function deleteTopic(client: PubSub, shortName: string): Promise<void> {
  const res = await axios.delete(`${client.baseUrl()}/topics/${shortName}`)
  if (res.data.error) {
    throw new Error(res.data.error.message)
  }
  if (res.status !== 200) {
    throw new Error(`Unexpected status code ${res.status}`)
  }
}

export async function getTopics(client: PubSub): Promise<Topic[]> {
  const res = await axios.get(`${client.baseUrl()}/topics`)
  if (res.data.topics === undefined) {
    return []
  }
  return res.data.topics.map((topic: any) => new Topic(topic?.name))
}

export async function publishMessage(client: PubSub, topicShort: string, messages: string[]): Promise<void> {
  await axios.post(`${client.baseUrl()}/topics/${topicShort}:publish`, {
    messages: messages.map((message) => {
      return {
        data: convertStringToBase64(message),
      }
    }),
  })
}

export default Topic
