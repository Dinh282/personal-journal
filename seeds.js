const { User, Journal, Page } = require('./models');
const sequelize = require('./db/config');

const tableExists = async tableName => {
  const query = `
    SELECT COUNT(*) as count
    FROM information_schema.tables
    WHERE table_name = :tableName
  `;
  const [result] = await sequelize.query(query, {
    replacements: { tableName },
    type: sequelize.QueryTypes.SELECT,
  });
  return result.count > 0;
};

const seedDatabase = async () => {
  try {
    // Create tables if they do not exist
    await sequelize.sync();

    // Clear existing data
    const pageTableExists = await tableExists('pages');
    const journalTableExists = await tableExists('journals');
    const userTableExists = await tableExists('users');

    if (pageTableExists) {
      await Page.destroy({ where: {} });
    }
    if (journalTableExists) {
      await Journal.destroy({ where: {} });
    }
    if (userTableExists) {
      await User.destroy({ where: {} });
    }

    const users = await User.bulkCreate([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password1',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password2',
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        password: 'password3',
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        password: 'password4',
      },
    ]);

    for (const user of users) {
      const journals = await Journal.bulkCreate([
        {
          title: 'Journal 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date: new Date(),
          userId: user.id,
        },
        {
          title: 'Journal 2',
          content:
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          date: new Date(),
          userId: user.id,
        },
      ]);

      for (const journal of journals) {
        await Page.bulkCreate([
          {
            title: 'Page 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            journalId: journal.id,
          },
          {
            title: 'Page 2',
            content:
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            journalId: journal.id,
          },
          {
            title: 'Page 3',
            content:
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            journalId: journal.id,
          },
          {
            title: 'Page 4',
            content:
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            journalId: journal.id,
          },
        ]);
      }
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
