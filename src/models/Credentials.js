const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    website: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    accessList: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ]
});

module.exports = mongoose.model('Credential', credentialSchema);
