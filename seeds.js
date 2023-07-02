const { User, Journal, Page } = require('./models');
const sequelize = require('./db/config');
const bcrypt = require('bcrypt');

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
        password: await bcrypt.hash('password1', 10),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password2', 10),
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        password: await bcrypt.hash('password3', 10),
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        password: await bcrypt.hash('password4', 10),
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
            title: 'Sea Legs Yellow Jack rum',
            content:
              'Heave to ballast tack gaff ho American Main run a rig transom topgallant landlubber or just lubber. Weigh anchor transom galleon yardarm hempen halter mutiny cable furl Chain Shot lugsail. Nelsons folly Plate Fleet loaded to the gunwalls broadside fore code of conduct parrel splice the main brace case shot quarterdeck.',
            journalId: journal.id,
          },
          {
            title: 'Pink bilge keelhaul line',
            content:
              'Mutiny jolly boat nipperkin Buccaneer rigging chase spyglass plunder Nelsons folly wench. Spanker mutiny landlubber or just lubber coffer crack Jennys tea cup jib skysail spirits run a rig pillage. Parley run a rig tender topsail case shot sutler sheet carouser crows nest smartly.',
            journalId: journal.id,
          },
          {
            title: 'Lookout clap of thunder load',
            content:
              'Jack Davy Jones Locker heave to bilge tackle parley pirate aft hogshead mizzenmast. Gangplank Cat o-nine tails mizzenmast gabion spyglass swab gun ropes end case shot lass. Run a rig tender clap of thunder ballast topgallant sutler gangplank grog blossom hempen halter driver.',
            journalId: journal.id,
          },
          {
            title: 'Flogging scurvy lookout',
            content:
              'Arr quarterdeck avast Jack Ketch barkadeer Letter of Marque starboard lugger salmagundi aye. Clipper code of conduct ho black spot long clothes league Privateer barkadeer sloop nipper. Rum dance the hempen jig long clothes hardtack splice the main brace wherry lugger pirate keel strike colors.',
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
