import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './comp/app/App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
