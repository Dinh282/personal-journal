const User = require('./User');
const Journal = require('./Journal')

module.exports = {
  User,
  Journal
};

User.hasMany(Journal, { foreignKey: 'userId' });
Journal.belongsTo(User, { foreignKey: 'userId' });