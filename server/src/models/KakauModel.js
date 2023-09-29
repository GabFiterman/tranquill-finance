const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KakauSchema = new Schema(
	{
		type: { type: String, enum: ['course', 'classroom'], required: true },
		name: { type: String, required: true }
	}
)

module.exports = mongoose.model('Kakau', KakauSchema);