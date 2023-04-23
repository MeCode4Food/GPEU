import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { newClient } from '../pubsub/pubsub'
import Topic, { createTopic, deleteTopic, getTopics, publishMessage } from '../pubsub/topics'
import Subscription, { ackMessages, createSubscription, deleteSubscription, getTopicSubscriptions, pullMessages } from '../pubsub/subscription'
import { isEqual } from 'lodash'
import { ReceivedMessage } from '../pubsub/message'
import { convertBase64ToString } from '../strconv'

interface ProjectProps {
  projectId: string
}

const Project: React.FC<ProjectProps> = ({ projectId }) => {
  const [sProject, _] = useState<string>(projectId)
  const [sTopic, setSTopic] = useState<Topic | null>(null)
  const [sSub, setSSub] = useState<Subscription | null>(null)
  const [lTopics, setLTopics] = useState<Topic[]>([])
  const [lSubscriptions, setLSubscriptions] = useState<Subscription[]>([])
  const [iTopic, setITopic] = useState<string>('')
  const [iSubscription, setISubscription] = useState<string>('')
  const [pubMessage, setPubMessage] = useState<string>('test')
  const [pulledMessages, setPulledMessages] = useState<ReceivedMessage[]>([])

  const loadTopics = async () => {
    try {
      const client = newClient(sProject)
      const topics = await getTopics(client)
      if (isEqual(topics, lTopics)) return
      setLTopics(topics)
      reCheckSelectedTopic(topics)
    } catch (error) {
      alert(error)
    }
  }

  const ackMessageOnClick = async (message: ReceivedMessage) => {
    try {
      const client = newClient(sProject)
      await ackMessages(client, sSub?.shortName || '', [message.ackId])
      const messages = pulledMessages.filter(m => m.ackId !== message.ackId)
      setPulledMessages(messages)
    } catch (error) {
      alert(error)
    }
  }

  const addTopicOnClick = async () => {
    try {
      const client = newClient(sProject)
      const topic = await createTopic(client, iTopic)
      setLTopics([...lTopics, topic])
      reCheckSelectedTopic([...lTopics, topic])
    } catch (error) {
      setLTopics([])
      alert(error)
    }
    setITopic('')
  }

  const addSubscriptionOnClick = async () => {
    try {
      const client = newClient(sProject)
      const topic = await createSubscription(client, sTopic?.name || '', iSubscription)
      setLSubscriptions([...lSubscriptions, topic])
      reCheckSelectedSub([...lSubscriptions, topic])
    } catch (error) {
      setLSubscriptions([])
      alert(error)
    }
    setISubscription('')
  }

  const deleteSubOnClick = async (sub: Subscription) => {
    try {
      const client = newClient(sProject)
      await deleteSubscription(client, sub.shortName)
      const subscriptions = lSubscriptions.filter(s => s.name !== sub.name)
      setLSubscriptions(subscriptions)
      reCheckSelectedSub(subscriptions)
    } catch (error) {
      alert(error)
    }
  }

  const deleteTopicOnClick = async (topic: Topic) => {
    try {
      const client = newClient(sProject)
      await deleteTopic(client, topic.shortName)
      const topics = lTopics.filter(t => t.name !== topic.name)
      setLTopics(topics)
      reCheckSelectedTopic(topics)
    } catch (error) {
      alert(error)
    }
  }

  const goBackOnClick = () => {
    window.history.back()
  }

  const loadSubscriptions = async (topicShort: string) => {
    try {
      const client = newClient(sProject)
      const subscriptions = await getTopicSubscriptions(client, topicShort)
      if (isEqual(subscriptions, lSubscriptions)) return
      setLSubscriptions(subscriptions)
      reCheckSelectedSub(subscriptions)
    } catch (error) {
      setLSubscriptions([])
      alert(error)
    }
  }

  const publishMessageOnClick = async () => {
    try {
      const client = newClient(sProject)
      const messages = [pubMessage]
      await publishMessage(client, sTopic?.shortName || '', messages)
      setPubMessage('')
    } catch (error) {
      alert(error)
    }    
  }

  const pullMessagesOnClick = async () => {
    try {
      const client = newClient(sProject)
      const messages = await pullMessages(client, sSub?.shortName || '')
      setPulledMessages(messages) 
    } catch (error) {
      alert(error)
    }    
  }

  const reCheckSelectedSub = (subscriptions: Subscription[]) => {
    const subNotInList = sSub && subscriptions.findIndex(s => s.name === sSub.name) === -1
    const noSubSelected = sSub === null
    const subsNotEmpty = subscriptions.length > 0
    const subsEmpty = subscriptions.length === 0
    if ((subNotInList || noSubSelected) && subsNotEmpty) {
      setSSub(subscriptions[0])
    }
    if (subNotInList && subsEmpty) {
      setSSub(null)
    }
  }

  const reCheckSelectedTopic = (topics: Topic[]) => {
    const noTopicSelected = sTopic === null
    const topicsNotEmpty = topics.length > 0
    const topicsEmpty = topics.length === 0
    if (noTopicSelected && topicsNotEmpty) {
      setSTopic(topics[0])
    }
    if (topicsEmpty) {
      setSTopic(null)
    }
  }

  useEffect(() => {
    loadTopics()
      .then(() => {
        if (sTopic) {
          // debugger
          loadSubscriptions(sTopic.name)
        }
      })
  }, [sProject, sTopic, sSub, lTopics])

  return (
    <div className="project container mx-auto min-h-[100vh]">
      <div className="flex flex-col">
        <div className="row flex items-start m-8">
          <div className="w-1/7"><button className=" bg-blue-500 hover:bg-blue-600 mr-2 text-white font-bold rounded py-2 px-4" onClick={goBackOnClick}>Go Back</button></div>
          <div className="flex-1 mx-4 max-w-2xl text-3xl font-bold mb-4">Project: {projectId}</div>
        </div>
        <div className="row flex items-start">
          <div className="w-1/6 m-3 p-3 bg-gray-100 min-h-[35vh]">
            <div className="row flex justify-between items-start">
              <h2 className="text-lg font-bold mb-4">Topics</h2>
            </div>
            <div className="row flex justify-between items-center">
              <input type="text" className="form-input w-[80%]" onChange={e => setITopic(e.target.value)} />
              <button className=" bg-blue-500 hover:bg-blue-600 ml-2 text-white font-bold rounded py-2 px-2" onClick={addTopicOnClick}>Add</button>
            </div>
            {
              lTopics.map((topic) => <div key={topic.shortName}>
                <div className={
                  (sTopic?.shortName === topic.shortName ? 'bg-green-200' : 'bg-white') +
                  " flex flex-row justify-between items-center hover:bg-green-300  mr-1 mt-3"
                }
                >
                  <div className="text-m font-bold flex-1 ml-4 py-2" onClick={() => setSTopic(topic)}>{topic.shortName}</div>
                  <div className="bg-red-500 hover:bg-red-600 text-white font-bold rounded ml-1 py-2 px-2" onClick={() => deleteTopicOnClick(topic)}>Delete</div>
                </div>
                <div className="border border-gray-300 mt-3"></div>
              </div>)
            }
          </div>
          <div className="w-1/6 m-3 p-3 bg-gray-100 min-h-[35vh]">
            <div className="row flex justify-between items-start">
              <h2 className="text-lg font-bold mb-4">Subscriptions</h2>
            </div>
            <div className="row flex justify-between items-center">
              <input type="text" className="form-input w-[80%]" onChange={e => setISubscription(e.target.value)} />
              <button className=" bg-blue-500 hover:bg-blue-600 ml-2 text-white font-bold rounded py-2 px-2" onClick={addSubscriptionOnClick}>Add</button>
            </div>
            {
              lSubscriptions.map((sub) => <div key={sub.shortName}>
                <div className={
                  (sSub?.shortName === sub.shortName ? 'bg-green-200' : 'bg-white') +
                  " flex flex-row justify-between items-center hover:bg-green-300  mr-1 mt-3"
                }
                  onClick={() => setSSub(sub)}
                >
                  <div className="text-m font-bold ml-4">{sub.shortName}</div>
                  <div className="bg-red-500 hover:bg-red-600 text-white font-bold rounded ml-1 py-2 px-2" onClick={() => deleteSubOnClick(sub)}>Delete</div>
                </div>
                <div className="border border-gray-300 mt-3"></div>
              </div>)
            }
          </div>
          <div className="w-7/12 flex flex-col">
            <div className="row m-3 p-3 bg-gray-100 min-h-[35vh] flex flex-col">
              <h2 className="text-lg font-bold mb-4">{`Publish Message ${sTopic === null ? '' : `to ${sTopic.shortName}`}`}</h2>
              <textarea cols={30} rows={5} className="form-textarea w-[100%]" value={pubMessage} onChange={e => setPubMessage(e.target.value)}></textarea>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded mt-auto py-1 px-2 ml-auto" onClick={publishMessageOnClick}>Publish</button>
            </div>
            <div className="row m-3 p-3 bg-gray-100 min-h-[40vh] flex flex-col">
              <div className="row flex flex-row mb-4">
                <h2 className="text-lg font-bold">{`Receive Message ${sSub === null ? '' : `from ${sSub.shortName}`}`}</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded ml-auto py-1 px-2" onClick={pullMessagesOnClick}>Pull</button>
              </div>
              <table className="table-auto border-separate border-slate-500">
                <thead className="pb-2">
                  <tr>
                    <th className="w-2/6">Published Time</th>
                    <th className="w-4/6">Message</th>
                    <th className="w-1/6">Ack</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pulledMessages.map((pm) => (
                      <tr key={pm.ackId} className="bg-white">
                        <td className="mx-auto">{pm.message.publishTime}</td>
                        <td ><div className="ml-3">{convertBase64ToString(pm.message.data)}</div></td>
                        <td className="mx-auto">
                          <div className="flex flex-row justify-center">
                            <button 
                              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded py-1 px-2" 
                              onClick={() => ackMessageOnClick(pm)}>
                                Ack
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectWrapper: React.FC = () => {
  const { project } = useParams()
  return <Project projectId={project ? project : ''} />
}

export default Project
export { ProjectWrapper }
