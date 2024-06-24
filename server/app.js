const express = require('express');
const uniqid = require('uniqid'); 
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())

const contactsRaw = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/1200?u=118836",
    isFavorite: true,
    name: {
      first: "Ivan",
      last: "Ivanov",
    },
    details: {
      phone: [
        {
          type: "phone",
          detail: "Home",
          content: "+359892532378",
        },
        {
          type: "phone",
          detail: "Work",
          content: "+359896218726",
        },
      ],
      mail: [
        {
          type: "mail",
          detail: "Personal",
          content: "vankata_kk@abv.bg",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "vankata_we12@gmail.com",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "XXivanchoXX@abv.bg",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "vanio_99@gmail.com",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "ivan.i@protonmail.com",
        },
        {
          type: "mail",
          detail: "Work",
          content: "ivan.ivanov@sofia-uni.bg",
        },
      ],
    },
    info: {
      date: [
        {
          type: "cake",
          detail: "Birthday",
          content: "2002-03-12",
        },
      ],
      relationship: [
        {
          type: "workspaces",
          detail: "Relationship",
          content: "Brother",
        },
      ],
      nickname: [
        {
          type: "person",
          detail: "Nickname",
          content: "The One",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/1200?u=118866",
    isFavorite: false,
    name: {
      first: "Kristina",
      last: "Koleva",
    },
    details: {
      phone: [
        {
          type: "phone",
          detail: "Home",
          content: "+359892531425",
        },
      ],
    },
    info: {
      date: [
        {
          type: "event",
          detail: "Anniversary",
          content: "2019-06-20",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/1200?u=114836",
    isFavorite: true,
    name: {
      first: "Georgi",
      last: "Ivanov",
    },
    details: {
      phone: [
        {
          type: "phone",
          detail: "Home",
          content: "+359892531425",
        },
      ],
    },
    info: {},
    tags: ["Close Friends", "Classmate"],
  },
];

let contacts = sortContacts(contactsRaw);

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

function sortContacts(contacts) {
  return contacts.sort((a, b) => 
    `${a.name.first} ${a.name.second}`.localeCompare(
    `${b.name.first} ${b.name.second}`));
}

app.get('/contact', (res, req) => {
  const {id} = req;
  const foundContact = contacts.find(contact => contact.id === id);

  if (!foundContact) {
    res.status(404).send(`A user with an id of ${id} can not be found!`);
    return;
  }

  res.status(200).send(JSON.stringify(foundContact));
})

app.post('/contact', (req, res) => {
    const {_, avatar, name, details, info, tags} = req.body;

    if (!name || !details || !info || !tags) {
        res.status(400).send(`One of the following is missing "avatar, name, details, info, tags"...`);
        return;
    }

    if (!details.phone || details.phone.length == 0) {
        res.status(400).send(`No phone number(s) provided"...`);
        return;
    }

    const generatedId = uniqid();
    const newContact = {id: generatedId, ...req.body}

    contacts.push(newContact); // TODO: DB
    contacts = sortContacts(contacts);
    res.status(200).send(JSON.stringify(newContact));
})

app.put('/contact', (req, res) => {
    const {id, avatar, name, details, info, tags} = req.body

    if (!id|| !name || !details || !info || !tags) {
        res.status(400).send(`One of the following is missing "id, avatar, name, details, info, tags"...`);
        return;
    }

    if (!details.phone || details.phone.length == 0) {
        res.status(400).send(`No phone number(s) provided"...`);
        return;
    }

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            contacts[i] = req.body;
            res.status(200).send(`Updated contact (${name.first} ${name.last})`)
            return;
        }
    }
    res.status(400).send(`No contact with id ${id} was found...`)
})

app.delete('/contact', (req, res) => {
    const {id} = req.body;
    
    if (id === null) {
        res.status(400).send(`id is required...`);
        return;
    }

    contacts = contacts.filter(value => value.id != id);
    res.status(200).send(`Contact with id ${id} was deleted successfully`);
})

app.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
})

app.get("/favorite-contacts", (req, res) => {
    res.status(200).json(contacts.filter(contact => contact.isFavorite));
})

app.listen(port, () => {
    console.log(`Phone Book app listening on port ${port}`);
})