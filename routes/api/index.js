const router = require('express').Router();
const { UserController, PageController, JournalPagesController } = require('../../controllers');
const JournalController = require('../../controllers/JournalController');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

router.post('/journals/', isAuthenticated, JournalController.createNewJournal);
router.delete('/journals/view/:id', isAuthenticated, JournalController.deleteJournal);
router.put('/journals/view/:id', isAuthenticated, JournalController.editJournal);//
router.post('/new-page/:id', isAuthenticated, JournalPagesController.createNewJournalPage);//
router.delete('/delete-journal-page/:id', isAuthenticated, JournalPagesController.deleteJournalPage)//
router.put('/edit-journal-page/:id', isAuthenticated, JournalPagesController.editJournalPage)//


module.exports = router;
