const mongoose = require('mongoose');
const Request = require('./models/Request');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  // ✅ Existing users ka isOnboarded fix karo
  await User.updateMany(
    { skills: { $exists: true, $ne: [] } },
    { isOnboarded: true }
  );
  console.log('✅ Existing users isOnboarded updated!');

  // Users
  await User.deleteMany({});
  const hashed = await bcrypt.hash('123456', 10);

  const users = await User.insertMany([
    {
      name: 'Ali Hassan',
      email: 'ali@test.com',
      password: hashed,
      role: 'both',
      trustScore: 150,
      helpedCount: 12,
      skills: ['React', 'Node', 'JavaScript'],
      interests: ['Web Dev', 'Teaching'],
      location: 'Karachi',
      isOnboarded: true
    },
    {
      name: 'Sara Khan',
      email: 'sara@test.com',
      password: hashed,
      role: 'can_help',
      trustScore: 120,
      helpedCount: 9,
      skills: ['Python', 'ML', 'Data Analysis'],
      interests: ['AI', 'Research'],
      location: 'Lahore',
      isOnboarded: true
    },
    {
      name: 'Bilal Ahmed',
      email: 'bilal@test.com',
      password: hashed,
      role: 'both',
      trustScore: 95,
      helpedCount: 7,
      skills: ['CSS', 'Design', 'Figma'],
      interests: ['UI/UX', 'Frontend'],
      location: 'Karachi',
      isOnboarded: true
    },
    {
      name: 'Zara Sheikh',
      email: 'zara@test.com',
      password: hashed,
      role: 'can_help',
      trustScore: 80,
      helpedCount: 5,
      skills: ['MongoDB', 'Express', 'Node'],
      interests: ['Backend', 'Databases'],
      location: 'Islamabad',
      isOnboarded: true
    },
    {
      name: 'Usman Ali',
      email: 'usman@test.com',
      password: hashed,
      role: 'both',
      trustScore: 60,
      helpedCount: 4,
      skills: ['Git', 'Linux', 'DevOps'],
      interests: ['Open Source', 'Deployment'],
      location: 'Remote',
      isOnboarded: true
    },
  ]);

  console.log('✅ Users inserted!');

  // Requests
  await Request.deleteMany({});
  await Request.insertMany([
    {
      title: "Need help with React useEffect hook",
      description: "I'm confused about dependency array in useEffect. My component keeps re-rendering infinitely when I add an object to the dependency array.",
      category: "Programming",
      tags: ["react", "javascript", "hooks"],
      urgency: "high",
      status: "open",
      author: users[0]._id
    },
    {
      title: "Python pandas DataFrame merge issue",
      description: "I have two DataFrames and I want to merge them on multiple columns but getting duplicate rows. Can someone help me understand merge vs join?",
      category: "Programming",
      tags: ["python", "pandas", "data"],
      urgency: "medium",
      status: "open",
      author: users[1]._id
    },
    {
      title: "CSS Flexbox alignment not working",
      description: "My flex items are not centering vertically. I've tried align-items center but it doesn't work. Using a nav bar layout.",
      category: "Design",
      tags: ["css", "flexbox", "html"],
      urgency: "low",
      status: "open",
      author: users[2]._id
    },
    {
      title: "MongoDB aggregation pipeline help needed",
      description: "Need to group documents by date and calculate sum of values. Not sure how to use $group and $sum together in aggregation.",
      category: "Database",
      tags: ["mongodb", "database", "aggregation"],
      urgency: "high",
      status: "open",
      author: users[3]._id
    },
    {
      title: "Git merge conflict resolution",
      description: "Working in a team and getting merge conflicts every time I pull. Need help understanding how to properly resolve conflicts.",
      category: "Tools",
      tags: ["git", "github", "teamwork"],
      urgency: "medium",
      status: "open",
      author: users[4]._id
    },
  ]);

  console.log('✅ Requests inserted!');
  console.log('🎉 All done!');
  process.exit();
};

run().catch(err => {
  console.log('Error:', err);
  process.exit(1);
});