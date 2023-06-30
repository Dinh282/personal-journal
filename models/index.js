const User = require('./User');
const Journal = require('./Journal');
const Page = require('./Page');

module.exports = {
  User,
  Journal,
  Page,
};

User.hasMany(Journal, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Journal.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Journal.hasMany(Page, {
  foreignKey: 'journalId',
  onDelete: 'CASCADE',
});

Page.belongsTo(Journal, {
  foreignKey: 'journalId',
});
