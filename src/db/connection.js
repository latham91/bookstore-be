import mongoose from "mongoose";
import chalk from "chalk";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.bold.bgYellowBright(`MongoDB connected to database: ${conn.connection.name}`));
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default dbConnect;
