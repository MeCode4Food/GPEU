import { useEffect, useState } from "react"
import CardList from "./components/cardlist"
import { useNavigate } from "react-router-dom"

function App() {
  const cc = [
    {
      id: "1",
      value: import.meta.env.VITE_DEFAULT_PROJECT,
      title: import.meta.env.VITE_DEFAULT_PROJECT
    },
  ]
  const navigate = useNavigate()
  const [cards, setCards] = useState(cc)
  const [newProjectTitle, setNewProjectTitle] = useState("")

  useEffect(() => {
    const projects = localStorage.getItem("projects")
    if (projects) {
      setCards(JSON.parse(projects))
    }
  }, [])

  const addProjectOnClick = () => {
    if (newProjectTitle !== "") {
      const id = Math.random().toString(36).slice(4)
      const projects = [...cards, { id, title: newProjectTitle, value: newProjectTitle }]
      setCards(projects)
      localStorage.setItem("projects", JSON.stringify(projects))
    }
  }

  return (
    <div className="App container mx-auto min-h-[100vh]">
      <div className="flex flex-col">
        <div className="row flex items-start mt-8 ml-12">
          <div className="max-w-2xl text-3xl font-bold">Projects List</div>
        </div>
        <div className="row flex items-start mt-12 ml-12">
          <input type="text" className="w-1/7" placeholder="Project Title" value={newProjectTitle} onChange={(e) => {setNewProjectTitle(e.target.value)}}/>
          <div className="w-1/7"><button className=" bg-blue-500 hover:bg-blue-600 mr-2 text-white font-bold rounded py-2 px-4 ml-4" onClick={addProjectOnClick}>Add Project</button></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <CardList
            cards={cards}
            onClick={(value) => {
              navigate(`/project/${value}`)
            }}
            onRemove={(id) => {
              setCards(cards.filter((card) => card.id !== id))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
