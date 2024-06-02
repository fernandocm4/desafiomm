import bcrypt from "bcryptjs";


export const createPasswordHash = async (password) =>
     bcrypt.hash(password, 8);

export const checkPassword = (passwordhash, password) =>
    bcrypt.compare(password, passwordhash);