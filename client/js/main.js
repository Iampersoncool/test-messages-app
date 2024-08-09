import '../css/style.css'

import handleMessageFormSubmit from './messageForm'
import { messageTemplate } from './templates'

import { messagesContainer } from './elements'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

;(async () => {
  const response = await fetch(`${BACKEND_URL}/messages`)
  const { messages } = await response.json()

  messages.forEach(message => {
    messagesContainer.innerHTML += messageTemplate(message)
  })
})()

handleMessageFormSubmit()
