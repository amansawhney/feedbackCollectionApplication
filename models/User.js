const mongoose = request('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    googleID: String
});

module.exports = mongoose.model("users". userSchema);