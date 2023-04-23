import { CreateTopicResponse, PubSub } from "@google-cloud/pubsub"


// const tryFn = <T extends (...args: any[]) => any>(fn: T) => {
//   return (...args: Parameters<T>): [ReturnType<T> | null, Error | null] => {
//     try {
//       const result = fn(...args)
//       return [result, null]
//     } catch (err) {
//       if (err instanceof Error) {
//         return [null, err]
//       }
//       console.log("unknown error", err)
//       return [null, new Error("invalid error instance of unknown error, check logs")]
//     }
//   }
// }


// const tryAsyncFn = <T extends (...args: Parameters<T> | any[]) => Promise<R>, R>
//   (fn: (...args: Parameters<T> | any[]) => Promise<R>) => async (...args: Parameters<T> | any[]): Promise<[R | null, Error | null]> => {
//     try {
//       const result = await fn(...args)
//       return [result, null]
//     } catch (err) {
//       if (err instanceof Error) {
//         return [null, err]
//       }
//       console.log("unknown error", err)
//       return [null, new Error("invalid error instance of unknown error, check logs")]
//     }
//   }

// const tryAsyncFn = (fn: (...args: any[]) => Promise<any>) => async (...args: any[]): Promise<[any | null, Error | null]> => {
//   try {
//     const result = await fn(...args)
//     return [result, null]
//   } catch (err) {
//     if (err instanceof Error) {
//       return [null, err]
//     }
//     console.log("unknown error", err)
//     return [null, new Error("invalid error instance of unknown error, check logs")]
//   }
// }

// set env 
process.env['PUBSUB_EMULATOR_HOST'] = 'localhost:8086'

// Create a new client
const pubsub = new PubSub({
  projectId: "project-test",
})

const topics = [
  {
    name: "topic1",
    subscriptions: [
      { name: "subscription1" },
      { name: "subscription2" },
    ]
  },
  {
    name: "topic2",
    subscriptions: [
      { name: "subscription3" },
      { name: "subscription4" },
    ]
  },
  {
    name: "topic3",
    subscriptions: [
      { name: "subscription5" },
      { name: "subscription6" },
    ]
  }
]

// const ct = tryAsyncFn<typeof pubsub.createTopic, CreateTopicResponse>(pubsub.createTopic)
// const ct = tryAsyncFn(pubsub.createTopic)
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
topics.forEach(async (topic) => {
  try {
    await pubsub.createTopic(topic.name)
  } catch (error) {
    console.log(error)
    return
  }
  console.log(`Topic ${topic.name} created.`)
  topic.subscriptions.forEach(async (subscription) => {
    try {
      await pubsub.topic(topic.name).createSubscription(subscription.name)
    } catch (error) {
      console.log(error)
      return
    }
    console.log(`Subscription ${subscription.name} created.`)
  })
})

// // Get a list of all the topics in your project
// const results = await pubsub.getTopics()
// const t = results[0]
// console.log("Topics:", t)
