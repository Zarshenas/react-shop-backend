const bycrypt = require("bcrypt");

const saltRounds = 12;

const hashPassword = (password) => {
    const salt = bycrypt.genSaltSync(saltRounds);
    return bycrypt.hashSync(password , salt);
}

const compareHashed = (plain , hashed) => {
    return bycrypt.compareSync(plain , hashed)
}
module.exports = {
    hashPassword,
    compareHashed
}