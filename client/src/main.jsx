import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//global Style Sheet
import './styles/index.css'

//React Router Dom 
import { BrowserRouter } from "react-router-dom";

//context api
import { RestaurantsContextProvider } from './context/RestaurantsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RestaurantsContextProvider>
        <App />
      </RestaurantsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
