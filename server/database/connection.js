const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        //oncloud //mongodb+srv://rafay:rafay123@cluster0.polk0xw.mongodb.net/users?retryWrites=true&w=majority
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB