// const isAuthenticated = require("../middleware/isAuthenticated");
const { Journal, User } = require('../models');

module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard', {
      welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
  },


//DN
getJournals: async (req, res) => {
  try {
    const dbJournalData = await Journal.findAll({
      include: [{ model: User, attributes: ['email'] }],
    });

    const journals = dbJournalData.map((journal) => 
    journal.get({ plain: true }));

    console.log(journals);
    
    res.render('journals', {
      journalPageMessage: 'User Created Journals To Be Rendered Here',
      isAuthenticated: req.session.isAuthenticated,
      journals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},


createNewJournal: (req, res) => {
  res.render('new-journal', {
    isAuthenticated: req.session.isAuthenticated,
  })
},

viewJournal: (req, res) => {
  res.render('journal-view', {
    isAuthenticated: req.session.isAuthenticated,




  })
}


//DN







};
