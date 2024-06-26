const Users = require("../models/Users")
const Contact = require("../models/Contact")

async function getUserByToken(token)
{
    return await Users.findOne({token});
}

async function getUserAndContactsByToken(token) {
    let user = await getUserByToken(token);
    if (!user)
      return null;
  
    return {
      user: user,
      contacts: await Contact.find({_id: {$in: user.contactIds}})
    };
}


async function getTags(req, res) {
    const fullUser = await getUserAndContactsByToken(req.cookies.token);
    if (!fullUser)
        return res.status(400).send(`Bad cookie`);

    let response = []
    fullUser.user.tags.forEach(tag => {
        let fullContacts = fullUser.contacts.filter(contact => contact.tags.includes(tag))
        let contactIds = [];
        fullContacts.forEach(contact => contactIds.push(contact._id))
        response.push({
            label: tag,
            contacts: contactIds
        })
    });

    res.status(200).json(response);
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