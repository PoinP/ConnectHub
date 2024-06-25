const express = require('express');
const contactController = require('../controllers/Contacts'); // Ensure the path to your controller is correct
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());


router.get('/phonebookDB/contacts', async (req, res) => {
    try {
        const users = await contactController.getContacts();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/phonebookDB/contacts/:email', async (req, res) => {
    try {
        const user = await contactController.getContactByEmail(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/phonebookDB/contacts/:email/friends', async (req, res) => {
    try {
        const userFriends = await contactController.getContactFriends(req.params.email);
        res.status(200).json(userFriends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/phonebookDB/contacts', async (req, res) => {
    try {
        const user = await contactController.createContact(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/phonebookDB/contacts/:email', async (req, res) => {
    try {
        const user = await contactController.updateContact(req.params.email, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/phonebookDB/contacts/:email/friends/:friendEmail', async (req, res) => {
    try {
        const updatedFriends = await contactController.addRemoveContact(req.params.email, req.params.friendEmail);
        res.status(200).json(updatedFriends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/phonebookDB/contacts/:email', async (req, res) => {
    try {
        await contactController.deleteContact(req.params.email);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/phonebookDB/contacts/:email/friends/:friendEmail', async (req, res) => {
    try {
        const updatedFriends = await contactController.addRemoveContact(req.params.email, req.params.friendEmail);
        res.status(200).json(updatedFriends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/phonebookDB/search', async (req, res) => {
    try {
        const criteria = req.query;
        const users = await contactController.searchContacts(criteria);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/phonebookDB/contacts/:email/mark-favourite', async (req, res) => {
    try {
        const user = await contactController.markAsFavourite(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
