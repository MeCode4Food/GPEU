import axios from "axios"
import PubSub from "./pubsub"

class ReceivedMessage {
  ackId: string
  message: PubsubMessage
  deliveryAttempt: number
  constructor(ackId: string, message?: PubsubMessage, deliveryAttempt?: number) {
    this.ackId = ackId
    this.message = message || new PubsubMessage("")
    this.deliveryAttempt = deliveryAttempt || 0
  }
}

class PubsubMessage {
  // base64 encoded
  data: string
  
  attributes: {
    [key: string]: string
  }
  messageId: string
  publishTime: string
  orderingKey: string
  constructor(
    data: string,
    attributes?: { [key: string]: string },
    messageId?: string,
    publishTime?: string,
    orderingKey?: string,
  ) {
    this.data = data
    this.attributes = attributes || {}
    this.messageId = messageId || ""
    this.publishTime = publishTime || ""
    this.orderingKey = orderingKey || ""
  }
}


export {
  ReceivedMessage
}

export default PubsubMessage
