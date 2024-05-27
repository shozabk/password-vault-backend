const Credential = require('../models/Credentials');

exports.createCredential = async (req, res) => {
    const { website, username, password, accessList } = req.body;
    try {
        const checkExistingDomain = await Credential.find({ 'website': website })
        if (checkExistingDomain.length > 0) {
            const update = await Credential.updateOne({ 'website': website },
                { $addToSet: { accessList: { $each: accessList } } },
            )
            res.status(201).send({ update });
        } else {
            if (accessList.length === 0) {
                accessList.push(req.user._id);
            }
            const credential = new Credential({ website, username, password, accessList });
            await credential.save();
            res.status(201).send({ credential });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCredentials = async (req, res) => {
    try {
        let credentials;

        if (req.user.role === 'admin') {
            credentials = await Credential.find();
        } else {
            credentials = await Credential.find({ 'accessList': req.user._id });
        }
        res.send(credentials);
    } catch (error) {
        res.status(400).send(error);
    }
};
