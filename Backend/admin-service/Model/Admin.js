const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});




adminSchema.methods.compare = async (password) => {
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('Admin', adminSchema);
