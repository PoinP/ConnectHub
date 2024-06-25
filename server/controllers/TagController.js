let tags = require("../data/tags.json");

function getTags(req, res) {
    res.status(200).json(tags);
}

function getTag(req, res) {
    const { label } = req.query;
    const tag = tags.find(tag => tag.label === label);

    if (!tag) {
        res.status(404).send(`The tag ${label} could not be found!`);
        return;
    }

    res.status(200).json(tag);
}

function createTag(req, res) {
    const { label } = req.body;

    const foundTag = tags.find(tag => tag.label === label);
    if (foundTag)
        return;

    const newTag = { label: label, contacts: [] };
    tags.push(newTag);
    res.status(200).json(newTag)
}

function deleteTag(req, res) {
    const { label } = req.body;

    const foundTagIndex = tags.findIndex(tag => tag.label === label);
    if (foundTagIndex === -1)
        return;

    tags = tags.splice(foundTagIndex, 1);
    res.status(200);
}

module.exports = { getTags, getTag, createTag, deleteTag };