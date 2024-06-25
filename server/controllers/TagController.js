let tags = require("../data/tags.json");

function getTag(req, res) {
    const { tagLabel } = req.query;
    const tag = tags.find(tag => tag.label === "tagLabel");

    if (!tag) {
        res.status(404).send(`The tag ${tagLabel} could not be found!`);
        return;
    }

    res.status(200).json(tag);
}

function createTag(req, res) {
    const { tagLabel } = req.body;

    const foundTag = tags.find(tag => tag.label === tagLabel);
    if (foundTag)
        return;

    const newTag = { label: tagLabel, contacts: [] };
    tags.push(newTag);
    res.status(200).json(newTag)
}

function deleteTag(req, res) {
    const { tagLabel } = req.body;

    const foundTagIndex = tags.findIndex(tag => tag.label === tagLabel);
    if (foundTagIndex === -1)
        return;

    tags = tags.splice(foundTagIndex, 1);
    res.status(200);
}

module.exports = { getTag, createTag, deleteTag };