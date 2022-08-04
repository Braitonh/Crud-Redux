import React from 'react'
import ReactDOM from 'react-dom/client'

//Redux
import { store } from './app/store'
import { Provider } from 'react-redux'

import './index.css'
import { CrudApp } from './CrudApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CrudApp/>
    </Provider>
    
  </React.StrictMode>
)
