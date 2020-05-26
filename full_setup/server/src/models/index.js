//The messages would come from a database in a resolver or cache.
let messages = {
  1: {
    id: "1",
    text: "Hello Word",
    userId: "1",
  },
  2: {
    id: "2",
    text: "Bye World",
    userId: "2",
  },
};

//The users would be an example of something that comes
//from a database through a resolver.
let users = {
  1: {
    id: "1",
    username: "Daniel Dolan",
    messageIds: [1],
  },
  2: {
    id: "2",
    username: "Dave Davids",
    messageIds: [2],
  },
};

module.exports = { users, messages };
