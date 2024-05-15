import mongoose from "mongoose"
import appConfig from "./app.config.js"

const connectToDatabase = async () => {
    try {
        mongoose.connect(appConfig.dbUrl)
        mongoose.connection.once('connected', () => console.info('Database connection established'));
    } catch (error) {
        console.error(error)
    }
}

export default connectToDatabase;