import { errorTemplate, messageTemplate, okTemplate } from './templates'
import { resultContainer, messagesContainer } from './elements'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function handleMessageFormSubmit() {
  const messageForm = document.getElementById('messageForm')

  messageForm.addEventListener('submit', async e => {
    e.preventDefault()

    const form = e.target

    const textColor = form.querySelector('#textColor')
    const backgroundColor = form.querySelector('#backgroundColor')
    const content = form.querySelector('#content')

    const messageData = {
      textColor: textColor.value,
      backgroundColor: backgroundColor.value,
      content: content.value,
    }

    const response = await fetch(`${BACKEND_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })

    const { errors } = await response.json()
    if (!response.ok) {
      resultContainer.innerHTML = errorTemplate(errors)
      return
    }

    resultContainer.innerHTML = okTemplate()
    messagesContainer.innerHTML += messageTemplate(messageData)

    setTimeout(() => (resultContainer.innerHTML = ''), 1000)
  })
}

export default handleMessageFormSubmit
