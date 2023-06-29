const { Journal } = require('../models');

module.exports = {
    
    createNewJournal: async (req, res) => {

      const {
        body: { title, content},
      } = req;
      try {
        const newJournal = await Journal.create({
          title,
          content,
          userId: req.session.currentUser.id,
        });

        
        res.status(200).json(newJournal)
        
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },

    deleteJournal: async (req, res) => {
      const { id } = req.params;
  
      try {
        // Find the journal with the provided ID
        const journal = await Journal.findByPk(id);
  
        if (!journal) {
          return res.status(404).json({ error: 'Journal not found' });
        }
  
        // Delete the journal
        await journal.destroy();
  
        // Send a success response
        res.status(200).json({ message: 'Journal deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete journal' });
      }
    }
  
    




};