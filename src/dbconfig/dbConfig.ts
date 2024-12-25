import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!) // '!' for indicating that it has come
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log(`mongodb connected`);            
        })

        connection.on('error', (err)=>{
            console.log(`ERR: Mongodb connection error : ${err}`);
            process.exit();
        })
    } catch (error) {
        console.log(`Something went wrong ${error}`);        
    }
}