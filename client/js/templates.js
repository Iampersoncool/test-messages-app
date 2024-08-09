export const messageTemplate = data => `
  <div data-id=${data.id} class="message" style="background-color: ${data.backgroundColor};">
    <p style="color: ${data.textColor}">${data.content}</p>
  </div>
`

//prettier-ignore
export const errorTemplate = data => 
  data.map(error => `
    <div class="error response">
      <p>${error.field}: ${error.message}</p>
    </div>
  `).join('');

//prettier-ignore
export const okTemplate = () => 
   `<div class="success response">
      <p>Success!</p>
    </div>`
