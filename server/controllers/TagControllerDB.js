const Users = require("../models/Users")

async function getUserByToken(token)
{
    return await Users.findOne({token});
}

async function getTags(req, res) {
    const user = await getUserByToken(req.cookies.token);
    res.status(200).json(user.tags);
}

// == Obsolete ==
// function getTag(req, res) {
//     const { label } = req.query;
//     const tag = tags.find(tag => tag.label === label);

//     if (!tag) {
//         res.status(404).send(`The tag ${label} could not be found!`);
//         return;
//     }

//     res.status(200).json(tag);
// }

async function createTag(req, res) {
    const { label } = req.body;
    const user = await getUserByToken(req.cookies.token);

    const tagsSet = new Set(user.tags);
    tagsSet.add(label);
    user.tags = Array.from(tagsSet);
    await user.save();
    
    res.status(200).json(user.tags)
}

async function deleteTag(req, res) {
    const { label } = req.body;
    const user = await getUserByToken(req.cookies.token);

    user.tags = user.tags.filter(tag => tag != label)
    await user.save();
    
    res.status(200).json(user.tags)
}

//module.exports = { getTags, getTag, createTag, deleteTag };
module.exports = { getTags, createTag, deleteTag };