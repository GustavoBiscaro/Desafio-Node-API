const mongoose = require('mongoose');

async function main() {


    // Acesso
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PASS

    try {
        mongoose.set("strictQuery", true);

        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.36imnle.mongodb.net/`);
        console.log("Conectado ao banco");

    } catch (err) {
        console.error(err);
    }
}

module.exports = main