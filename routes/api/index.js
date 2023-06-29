const router = require('express').Router();
const { UserController } = require('../../controllers');
const JournalController = require('../../controllers/JournalController');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

//DN//
router.post('/journals', JournalController.createNewJournal);
//DN//


module.exports = router;
