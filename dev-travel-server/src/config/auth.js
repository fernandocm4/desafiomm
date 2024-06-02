require("dotenv/config");

export default {
    secret: process.env.APP_TOKEN,
    expiresIn: "7d"
}