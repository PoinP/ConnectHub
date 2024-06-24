const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())

contacts = [];

function formatNumber(number) {
    let plusFlag = false;
    let numberFlag = false;
    let formattedNumber = "";

    let validSymbols = " -0123456789";

    for (let i = 0; i < number.length; i++) {
        if (number.charAt(i) == '+') {
            if (plusFlag || numberFlag)
                return "";
            formattedNumber += "+";
            plusFlag = true;
        }
        else if (validSymbols.includes(number.charAt(i))) {
            if (+number.charAt(i)) {
                numberFlag = true;
                formattedNumber += number.charAt(i);
            }
        }
        else {
            return "";
        }
    }
    return formattedNumber;
}

app.post('/save-contact', (req, res) => {
    const {_, avatar, name, details, info, tags} = req.body;

    if (!avatar || !name || !details || !info || !tags) {
        res.status(400).send(`One of the following is missing "avatar, name, details, info, tags"...`);
        return;
    }
    if (!details.phone || details.phone.length == 0) {
        res.status(400).send(`No phone number(s) provided"...`);
        return;
    }

    details.phone.forEach((number) => {
        const formattedNumber = formatNumber(number.content);
        if (!formattedNumber) {
            res.status(400).send(`Number (${number.content}) is in wrong format...`);
            return;
        }
        number.content = formattedNumber;
    })

    contacts.push({id: (contacts.length + 1), avatar, name, details, info, tags}); // TODO: DB
    res.status(200).send(`Contact ${name.first} ${name.last} added successfully`);
})

app.put('/edit-contact', (req, res) => {
    const {id, avatar, name, details, info, tags} = req.body

    if (!id|| !avatar || !name || !details || !info || !tags) {
        res.status(400).send(`One of the following is missing "id, avatar, name, details, info, tags"...`);
        return;
    }

    if (!details.phone || details.phone.length == 0) {
        res.status(400).send(`No phone number(s) provided"...`);
        return;
    }

    details.phone.forEach((number) => {
        const formattedNumber = formatNumber(number.content);
        if (!formattedNumber) {
            res.status(400).send(`Number (${number.content}) is in wrong format...`);
            return;
        }
        number.content = formattedNumber;
    })

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            contacts[i] = {id, avatar, name, details, info, tags}
            res.status(200).send(`Updated contact (${name.first} ${name.last})`)
            return;
        }
    }
    res.status(400).send(`No contact with id ${id} was found...`)
})

app.delete('/delete-contact', (req, res) => {
    const {id} = req.body;
    
    if (id === null) {
        res.status(400).send(`id is required...`);
        return;
    }

    oldLength = contacts.length;
    contacts = contacts.filter(value => value.id != id);
    if (contacts.length == oldLength) {
        res.status(400).send(`No contact with id ${id} was found`)
        return;
    }

    res.status(200).send(`Contact with id ${id} was deleted successfully`);
})

app.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
})

app.listen(port, () => {
    console.log(`Phone Book app listening on port ${port}`);
})