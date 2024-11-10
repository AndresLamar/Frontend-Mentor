import './App.css'
import Header from './components/Header'
import Product from './components/Product'
import { ItemProvider } from './context/ItemContext'

function App() {

  return (
    <ItemProvider>
      <Header/>
      <Product />
    </ItemProvider>
  )
}

export default App
