const router = require('express').Router();
const { PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/', (req, res) => res.render('homepage'));
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Pages with data
router.get('/dashboard', isAuthenticated, PageController.getDashboard);
router.get('/journals', isAuthenticated, PageController.getJournals);
router.get('/journals/view/:id', isAuthenticated, PageController.viewJournalPages);

module.exports = router;
