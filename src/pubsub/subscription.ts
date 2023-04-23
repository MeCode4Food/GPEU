import axios from "../axios"
import PubsubMessage, { ReceivedMessage } from "./message"
import PubSub from "./pubsub"
import { getShortName } from "./topics"

class Subscription {
  shortName: string
  name: string
  topicFull: string
  pushConfig: any
  ackDeadlineSeconds: number
  messageRetentionDuration: string
  constructor(name: string, topicFull: string, pushConfig?: any, ackDeadlineSeconds?: number, messageRetentionDuration?: string) {
    this.shortName = name.split("/").pop() || "";;
    this.name = name
    this.topicFull = topicFull
    this.pushConfig = pushConfig || {}
    this.ackDeadlineSeconds = ackDeadlineSeconds || 0
    this.messageRetentionDuration = messageRetentionDuration || ""
  }
}

// createSubscription creates a new subscription for a topic.
// topicName is the full name of the topic, e.g. projects/my-project/topics/my-topic
export async function createSubscription(client: PubSub, topicFull: string, subscriptionName: string): Promise<Subscription> {
  const res = await axios.put(`${client.baseUrl()}/subscriptions/${subscriptionName}`, {
    topic: topicFull,
  })
  if (res.data.error) {
    throw new Error(res.data.error.message)
  }
  if (res.data.name === undefined) {
    throw new Error("Subscription name not returned")
  }
  return new Subscription(res.data.name, res.data.topic, res.data.pushConfig, res.data.ackDeadlineSeconds, res.data.messageRetentionDuration)
}

export async function getTopicSubscriptions(client: PubSub, topicShort: string): Promise<Subscription[]> {
  const shortName = getShortName(topicShort)
  const res = await axios.get(`${client.baseUrl()}/topics/${shortName}/subscriptions`)
  if (res.data.subscriptions === undefined) {
    return []
  }
  const subscriptions = res.data.subscriptions.map((subscription: string) => new Subscription(subscription, topicShort))
  return subscriptions
}

export async function pullMessages(client: PubSub, subShort: string): Promise<ReceivedMessage[]> {
  const res = await axios.post(`${client.baseUrl()}/subscriptions/${subShort}:pull`, {
    returnImmediately: true,
    maxMessages: 10,
  })
  if (res.data.receivedMessages === undefined) {
    return []
  }
  const messages = res.data.receivedMessages.map(
    (message: any) => {
      return new ReceivedMessage(
        message.ackId,
        new PubsubMessage(
          message.message.data,
          message.message.attributes,
          message.message.messageId,
          message.message.publishTime,
          message.message.orderingKey),
        message.deliveryAttempt)
    })
  return messages
}

export async function ackMessages(client: PubSub, subShort: string, ackIds: string[]): Promise<void> {
  await axios.post(`${client.baseUrl()}/subscriptions/${subShort}:acknowledge`, {
    ackIds: ackIds,
  })
}
export async function deleteSubscription(client: PubSub, subShort: string): Promise<void> {
  const res = await axios.delete(`${client.baseUrl()}/subscriptions/${subShort}`)
  if (res.data.error) {
    throw new Error(res.data.error.message)
  }
  if (res.status !== 200) {
    throw new Error(`Unexpected status code ${res.status}`)
  }
}

export default Subscription
