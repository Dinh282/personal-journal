// const isAuthenticated = require("../middleware/isAuthenticated");
const { Journal, User, Page } = require('../models');

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
        where: { userId: req.session.currentUser.id },
        include: [{ model: User, attributes: ['email'], foreignKey: 'userId' }],
      });

      const journals = dbJournalData.map(journal =>
        journal.get({ plain: true })
      );

      console.log('here', journals);

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

  renderCreateNewJournal: (req, res) => {
    res.render('new-journal', {
      isAuthenticated: req.session.isAuthenticated,
    });
  },

  viewJournalPages: async (req, res) => {
    // res.render('journal-view', {
    //   isAuthenticated: req.session.isAuthenticated,
    // })
    const journalId = req.params.id; // Extract the journal ID from the URL parameters

    try {
      // Find the journal with the provided ID
      const journal = await Journal.findByPk(journalId);

      if (!journal) {
        // Journal not found
        return res.status(404).json({ error: 'Journal not found' });
      }
      const journalData = journal.get({ plain: true });

      //TM
      const pagesData = await Page.findAll({ where: { journalId } }); // Fetch all pages associated with the journal

      const pages = [];

      pagesData.forEach(page => {
        pages.push(page.get({ plain: true }));
      });

      const data = {
        journal: journalData,
        pages: pages,
      };

      console.log(data.pages);
      //TM
      res.render('journal-view', {
        isAuthenticated: req.session.isAuthenticated,
        data: data,
      });
      console.log(journalData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //DN
};
