export const typeDefs = `#graphql
  type User {
    id:ID!
    username:String!
    profession:String!
    password:String!
    image:String!
  }

  type Task {
    id:ID!
    description:String!
    tasks:String!
    title:String!
    userid:ID!
    breaktime:Int!
    totaltime: Int
  }

  type Query {
    users:[User]
    user(id:ID!):User
  }

  type Mutation {
    addUser(user:addUserInput):User
    login(credentials:loginInput):User
    signup(details:signupInput):Boolean!
    createTaskGroup(taskGroup:taskInput):Task!
    editTaskGroup(taskGroup:editTaskInput):Task!
    getTaskOfUser(data:userIdInput):[Task]!
  }

  input addUserInput{
    name:String!
    profession:String!
    age:Int!
  }  

  input loginInput{
    username:String!
    password:String!
  }  

  input signupInput{
    username:String!
    password:String!
    image:String!
    profession:String!
  }  

  input taskInput{
    userId:ID!
    tasks:String!
    title:String!
    desc:String!
    breakTime:Int!
  }

  input editTaskInput{
    tasks:String
    totalTime:Int
    taskGroupId:ID
  }
  input userIdInput{
    userid:ID!
  }
`;
