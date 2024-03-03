class User {
  constructor(name, age, location) {
    this.name = name;
    this.age = age;
    this.location = location;
    this.friends = [];
    this.posts = [];
    this.messages = [];
    this.groups = [];
  }

  addFriend(user) {
    this.friends.push(user);
    user.friends.push(this);
  }

  createPost(content) {
    const post = new Post(content, this);
    this.posts.push(post);
    return post;
  }

  sendMessage(user, message) {
    const chat = new Chat(this, user);
    chat.addMessage(message);
    this.messages.push(chat);
    user.messages.push(chat);
  }

  joinGroup(group) {
    this.groups.push(group);
    group.addMember(this);
  }
}

class Post {
  constructor(content, author) {
    this.content = content;
    this.author = author;
    this.comments = [];
    this.likes = 0;
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  like() {
    this.likes++;
  }
}

class Chat {
  constructor(user1, user2) {
    this.user1 = user1;
    this.user2 = user2;
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }
}

class Group {
  constructor(name) {
    this.name = name;
    this.members = [];
    this.posts = [];
  }

  addMember(user) {
    this.members.push(user);
  }

  createPost(content, author) {
    const post = new Post(content, author);
    this.posts.push(post);
    return post;
  }
}

// 示例用法
const user1 = new User("Alice", 25, "New York");
const user2 = new User("Bob", 28, "San Francisco");

user1.addFriend(user2);
const post = user1.createPost("Hello, friends!");
post.addComment("Nice post!");
post.like();

user1.sendMessage(user2, "Hey Bob, how are you?");
user2.sendMessage(user1, "Hi Alice, I'm doing great!");

const group = new Group("Programming Enthusiasts");
user1.joinGroup(group);
const groupPost = group.createPost("Who's up for a coding session?", user1);
groupPost.addComment("I'm in!");

console.log(user1);
console.log(user2);
console.log(group);
