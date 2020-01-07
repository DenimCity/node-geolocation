const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log(`MonGO Db Connected ${conn.connection.host}`);
	} catch (error) {
		console.log('TCL: connectDB -> error', error);
		process.exit(1);
	}
};

module.exports = connectDB;
