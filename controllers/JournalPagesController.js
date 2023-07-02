const { Journal, User, Page } = require('../models');

module.exports = {
  createNewJournalPage: async (req, res) => {
    try {
      const journalId = req.params.id;

      // Find the journal
      const journal = await Journal.findByPk(journalId);

      if (!journal) {
        console.log('no journals');
        return res.status(404).json({ message: 'Journal not found' });
      }

      // Create a new journal page
      const newPage = await Page.create({ journalId });
      console.log(newPage); //
      res.status(200).json(newPage);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteJournalPage: async (req, res) => {
    try {
      const pageId = req.params.id;

      // Find the page to delete
      const page = await Page.findByPk(pageId);

      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }

      // Delete the page
      await page.destroy();

      res.status(200).json({ message: 'Page deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  editJournalPage: async (req, res) => {
    try {
      const pageId = req.params.id;
      const { title, content } = req.body;

      // Find the page to be edited
      const page = await Page.findByPk(pageId);

      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }

      // Update the page with the new title and content
      page.title = title;
      page.content = content;

      // Save the changes to the database
      await page.save();

      res.status(200).json({ message: 'Page edited successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
