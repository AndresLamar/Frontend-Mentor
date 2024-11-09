import './App.css'
import Header from './components/Header'
import Product from './components/Product'
import { QuantityProvider } from './context/QuantityContext'

function App() {

  return (
    <QuantityProvider>
      <Header/>
      <Product />
    </QuantityProvider>
  )
}

export default App
