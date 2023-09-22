const validator = require("validator")

const data = validator.isMobilePhone("82241395522", "id-ID")
console.log(data)