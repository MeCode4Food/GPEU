import { useState } from "react"
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

  return (
    <div className="App bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Card List</h1>
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
  )
}

export default App
