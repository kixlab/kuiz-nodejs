var mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    pwd: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema);