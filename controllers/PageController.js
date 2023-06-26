const isAuthenticated = require("../middleware/isAuthenticated");

module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard', {
      welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
  },



//DN
getJournals: (req, res) => {
  res.render('journals', {
    journalPageMessage: `User Created Journals To Be Rendered Here`,
    isAuthenticated: req.session.isAuthenticated,
  })

}
//DN







};
