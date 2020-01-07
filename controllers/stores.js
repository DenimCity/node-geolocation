const Store = require('../models/Store');
exports.getStores = async (req, res, next) => {
	try {
		const stores = await Store.find({});
		return res.status(200).json({
			success: true,
			count: stores.length,
			data: stores
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: error.message });
	}
};

exports.addStore = async (req, res, next) => {
	try {
		console.log(req.body);
		const store = await Store.create(req.body);
		return res.status(200).json({
			success: true,
			data: store
		});
	} catch (error) {
		console.log(error.message);
		if (error.code === 11000) {
			return res.status(400).json({
				error: 'This Store already exists'
			});
		}
		return res.status(500).json({ error: error.message });
	}
};
