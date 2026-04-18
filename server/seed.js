const mongoose = require('mongoose');
const Request = require('./models/Request');
require('dotenv').config();

const dummyRequests = [
  {
    title: "Need help with React useEffect hook",
    description: "I'm confused about dependency array in useEffect. My component keeps re-rendering infinitely when I add an object to the dependency array.",
    category: "Programming",
    tags: ["react", "javascript", "hooks"],
    urgency: "high",
    status: "open"
  },
  {
    title: "Python pandas DataFrame merge issue",
    description: "I have two DataFrames and I want to merge them on multiple columns but getting duplicate rows. Can someone help me understand merge vs join?",
    category: "Programming", 
    tags: ["python", "pandas", "data"],
    urgency: "medium",
    status: "open"
  },
  {
    title: "CSS Flexbox alignment not working",
    description: "My flex items are not centering vertically. I've tried align-items center but it doesn't work. Using a nav bar layout.",
    category: "Design",
    tags: ["css", "flexbox", "html"],
    urgency: "low",
    status: "open"
  },
  {
    title: "MongoDB aggregation pipeline help needed",
    description: "Need to group documents by date and calculate sum of values. Not sure how to use $group and $sum together in aggregation.",
    category: "Database",
    tags: ["mongodb", "database", "aggregation"],
    urgency: "high",
    status: "open"
  },
  {
    title: "Git merge conflict resolution",
    description: "Working in a team and getting merge conflicts every time I pull. Need help understanding how to properly resolve conflicts.",
    category: "Tools",
    tags: ["git", "github", "teamwork"],
    urgency: "medium",
    status: "open"
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Request.deleteMany({});
  await Request.insertMany(dummyRequests);
  console.log('✅ Dummy data inserted!');
  process.exit();
});