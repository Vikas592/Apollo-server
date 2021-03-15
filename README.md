# Apollo-server

###### User Story #58281

###### [Apollo GraphQL] Day 1: Introduction to Apollo GraphQL

---

### What is GraphQL?

GraphQL is a query language for APIs and a set of server-side runtimes for fulfilling those queries with existing data.

##### How it works :

GraphQL exposes a single endpoint from your server.
You send a query to that endpoint by using a special Query Language syntax. That query is just a string.
The server responds to a query by providing a JSON object.

##### With GraphQL we can:

- ask exactly what we need, nothing more and nothing less.
- get many resources in a single request.
- describe what is possible with type system.
- add new fields and types without impacting existing API

---

### Difference between GraphQL and Rest.

| REST                                   | GraphQL                        |
| -------------------------------------- | ------------------------------ |
| Architectural Concept                  | Query language                 |
| returns all data for an endpoint       | returns only asked information |
| based on JSON, so cannot control types | has a type system              |
| needs multiple endpoints               | has a single endpoint          |

---

### Write down about Schema and Resolvers.

##### Schema

GraphQL schema is what defines the API of the server and which operations can be performed by the server. Schema is written using GraphQL query language (a.k.a Schema Definition Language).
Schema is what defines object types and fields to represent the data as well as root types that defines the group of operations that the API allows.

The root types are the **query type**, **mutation type**, and **subscription type**, which are the three types of operations you can run request from a GraphQL server. The query type is compulsory for any GraphQL schema, while the other two are optional. While we can define custom types in the schema.

GraphQL specification also defines a set of built-in scalar types. They are **Int**, **Float**, **Boolean**, **String**, and **ID**.

```js
const typeDefs = `
  type Book {
    id: Int!
    title: String!
    pages: Int
    chapters: Int
  }

  type Query {
    books: [Book!]
    book(id: Int!): Book
  }
`;
```

What we have above is the GraphQL schema. In it, we defined a Book type with four fields and a root Query type with two fields. The two fields in the root Query type defines what queries/operations the server can execute. The books field returns a list of Book type, and the book field will return a Book type based on the id passed as an argument to the book query.

Every field in a GraphQL type can have zero or more arguments. There's an exclamation mark that follows the scalar types assigned to some fields. This means that the field or argument is non-nullable.

#### Resolver

Resolvers is where we define how GraphQL queries are resolved so that the right fields can be returned to the user.
This is accomplished by defining a resolver function for every field in the schema.

```js
const resolvers = {
  Query: {
    books: function (root, args, context, info) {
      return books;
    },
    book: (root, args, context, info) => books.find((e) => e.id === args.id),
  },
  Book: {
    id: (parent) => parent.id,
    title: (parent) => parent.title,
    pages: (parent) => parent.pages,
    chapters: (parent) => parent.chapters,
  },
};
```

There are four (4) arguments that every resolver function receives. They're described as:

1. **root:** This argument is sometimes called parent. It contains the result of the previously executed resolver in the call chain. For example, if we call the book query, it'll start executing from the root field book in the Query root type. After that, it'll execute the resolvers in the Book type to get values for those fields. In the code above, I named the first argument for the resolvers of the fields in Book as parent. The value for the argument will be the Book object received from the parent resolver. This is why we're calling parent.title, for example, to return value for that field.
2. **args:** These are the arguments provided to the field in the GraphQL query. Following our example, this will be the id argument for the book query book(id: Int!): Book.
3. **context:** This is an object that every resolver can read from or write to. You can keep objects that give access to database or that contain information from the HTTP request headers here. Unlike the root and args parameters, their values vary based on what level in the execution chain the resolver is called from. The context object is the same across resolvers, and you can write contextual information to it as needed. We will use this argument in the next post, so stay tuned!
4. **info:** Taking definition from here, it holds field-specific information relevant to the current query as well as the schema details. To learn more about it, you can read this excellent post on the subject.
