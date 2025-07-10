const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected");
    } catch (e) {
        console.log("db connection failed : ", e.message);
        process.exit(1);
    }
}

module.exports = connectDb;