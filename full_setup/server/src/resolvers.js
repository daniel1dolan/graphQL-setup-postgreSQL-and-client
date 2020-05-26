const { v4: uuidv4 } = require("uuid");

//The Resolver is agnostic to the data source.
//For instance, data is hardcoded to resolve the 'me' field.
const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    company: () => {
      return {
        name: "Rufus Inc.",
        yearFounded: 2014,
      };
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      messages[id] = message;
      users[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;
      if (!message) {
        return false;
      }
      messages = otherMessages;

      return true;
    },
    updateMessage: (parent, { id, text }) => {
      const updatedMessage = messages[id];
      updatedMessage.text = text;

      return updatedMessage;
    },
  },
  User: {
    messages: (user) => {
      return Object.values(messages).filter(
        (message) => message.userId === user.id
      );
    },
  },
  Message: {
    user: (message) => {
      return users[message.userId];
    },
  },
};
