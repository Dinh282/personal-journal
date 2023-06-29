const { Journal } = require('../models');

module.exports = {
    createNewJournal: async (req, res) => {
      const {
        body: { title, content,},
      } = req;
      try {
        const newJournal = await Journal.create({
          title,
          content,
          userID: req.session.userID,
        });
  
        res.status(200).json(newJournal)
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },

}