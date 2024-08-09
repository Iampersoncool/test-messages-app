const { body } = require('express-validator')

const createMessageValidator = () => {
  return [
    body('content', 'content has to be between 1-100 characters')
      .trim()
      .isLength({ min: 1, max: 100 })
      .escape(),
    body('textColor', 'text color has to be a valid hex color').isHexColor(),
    body(
      'backgroundColor',
      'background color has to be a valid hex color'
    ).isHexColor(),
  ]
}

module.exports = createMessageValidator
