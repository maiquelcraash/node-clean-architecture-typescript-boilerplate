## Node Clean Architecture Typescript Boilerplate
A Node.js webserver template implementing Clean Architecture concepts using Typescript

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg "Clean Architecture")

### Summary
This project is based on Uncle Bob's Clean Architecture ideas. It's really recommended to read he's [blog post](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) about it and, maybe, he's book too to have deep understanding about the benefits in using it. This projects also fits perfectly the [Ports & Adapters aka Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).

Note the arrows in the image pointing inwards. They demonstrates the **Dependency Rule**: _"Nothing in an inner circle can know anything at all about something in an outer circle"_. This project shows how you can implement it in a real world scenario. Each layer should expose its **Ports** (interfaces), so outer layers can understand the behavior of the dependency that need to be injected. An implemented port is called **Adapter**. For convenience, all abstract classes in this project starting with an extra "I" are ports and extend the IPort interface (directly or indirectly). All classes that implements a Port, are Adapters.

### Project Structure
The project entry point is inside the `src`
- `domain`: The red and yellow segments in the Clean Architecture refers to the business rules, the core of your system. This folder will contain the heart of your application. Rather than having two separate layers for Use Cases and Entities, I decided to consider all as domain.
- `interface-adapters`: Represented by the green layer in the image. It's where we build our app. In this example project, contains the webserver logic, controllers and presentation.
- `infrastructure`: Represented by the blue layer in the image. It's where we adapt all the external dependencies such as libraries, databases and I/O processes following the Port contract provided by inner layers.

### Project Features
 - Node LTS version support
 - Typescript compiler and linter
 - Dependency Injection (please check `src/infrastructure/DependencyInjection`)
 - Import boundaries control. Eslint will ensure that you're following the Dependency Rule.
 - Unit and Integration tests

### Installation and Usage


### Todos
 - Fix test with ``--coverage``. For some reason the snapshots when using Jest's coverage are different than the default testing behavior.
 - Include more Use Cases examples.
 - Keep it compatible with Node LTS.

### Licence
MIT License