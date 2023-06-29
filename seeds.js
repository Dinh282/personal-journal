const { User, Journal } = require('./models');
const sequelize = require('./db/config');

const seedDatabase = async () => {
  try {
    await Journal.destroy({ where: {} });
    await User.destroy({ where: {} });

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
      await Journal.bulkCreate([
        {
          title: 'Journal Entry 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date: new Date(),
          userId: user.id,
        },
        {
          title: 'Journal Entry 2',
          content:
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          date: new Date(),
          userId: user.id,
        },
        {
          title: 'Journal Entry 3',
          content:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          date: new Date(),
          userId: user.id,
        },
      ]);
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
console.log();
