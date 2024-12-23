import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Stopwatch } from './start_stop_watch.jsx'
import CountDownTimer from './countdown_timer.jsx'
import NavMenu from './menu_nav.jsx'
import HomeJumbotron from './home_jumbotron.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavMenu/>
  </StrictMode>,
)
