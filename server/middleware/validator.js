const { validationResult, matchedData } = require('express-validator')

function validator() {
  return (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const mappedErrs = errors
        .array()
        .map(e => ({ field: e.path, message: e.msg }))
      return res.status(400).json({ errors: mappedErrs })
    }

    req.data = matchedData(req)

    next()
  }
}

module.exports = validator
