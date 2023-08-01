const bcrypt = require("bcryptjs");

const hashPassGenerate = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt)
}

// Compare Login form password with Database stored hash password
const compareHashPass = async (pass, userHashPass) => {

  const passCheck = await bcrypt.compare(pass, userHashPass);
  return passCheck;
}


module.exports = { hashPassGenerate, compareHashPass }