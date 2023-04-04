import './App.scss'
import { Header } from './components/header/Header'
import { Notes } from './components/notes/Notes'

export default function App() {

  return (
    <div className="App">
      <>
        <Header/>
        <Notes />
      </>
    </div>
  )
}