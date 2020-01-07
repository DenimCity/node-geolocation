const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
	storeId: {
		type: String,
		required: [ true, 'Please add a store ID' ],
		unique: true,
		trim: true,
		maxlength: [ 10, 'Store ID must be less than 10 chars' ]
	},
	address: {
		type: String,
		required: [ true, 'Please add an address' ]
	},
	city: String,
	state: String,
	zip: String,
	street: String,
	location: {
		type: {
			type: String,
			enum: [ 'Point' ]
		},
		coordinates: {
			type: [ Number ],
			index: '2dsphere'
		},
		formattedAddress: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Mongoose Middleware

StoreSchema.pre('save', async function(next) {
	const loc = await geocoder.geocode(this.address);

	const { latitude, longitude, city, stateCode, zipcode, streetName, formattedAddress } = loc[0];

	this.location = {
		type: 'Point',
		coordinates: [ longitude, latitude ],
		formattedAddress
	};
	this.city = city;
	this.state = stateCode;
	this.zip = zipcode;
	this.street = streetName;

	// Do not save address
	this.address = undefined;
	next();
});

module.exports = mongoose.model('Store', StoreSchema);
