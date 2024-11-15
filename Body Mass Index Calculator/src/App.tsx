import './App.css'
import { Advices, Header, Hero, Limitations, Meaning } from './components'

function App() {

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Meaning />
        <Advices />
        <Limitations />
      </main>
    </>
  )
}

export default App
