const {Schema, model, Types} = require("mongoose"); 

// Scheme of the user model dispatched from front-end.
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: "Link"}]
});

// Export of User model functionality with the defined scheme.
module.exports = model("User", schema);