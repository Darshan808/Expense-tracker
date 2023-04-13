import mongoose from "mongoose";

async function connect(){
    const username = process.env.MONGO_DB_USERNAME;
    const password = process.env.MONGO_DB_PASSWORD;
    const url = process.env.MONGO_DB_URL;
    await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`)
}

export default connect;