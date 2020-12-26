const {Schema, model, Types} = require("mongoose"); 

// Scheme of the link model dispatched from front-end.
const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    // Makes a reference to a certain user.
    owner: [{type: Types.ObjectId, ref: "User"}]
});

// Export of link model functionality with the defined scheme.
module.exports = model("Link", schema);