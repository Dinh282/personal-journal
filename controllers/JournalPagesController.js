const { Journal, User, Page } = require('../models');

module.exports = {
createNewJournalPage: async (req, res) => {
            console.log("here", req.params)
          try {
            const journalId = req.params.id;

            // Find the journal
            const journal = await Journal.findByPk(journalId);
      
            if (!journal) {
                console.log("no journals")
              return res.status(404).json({ message: 'Journal not found' });
            }
      
            // Create a new journal page
            const newPage = await Page.create({ journalId });
            console.log(newPage);//
            res.status(200).json(newPage);
          } catch (err) {
            console.error(err);
            res.status(500).json(err);
          }
        },
     

};