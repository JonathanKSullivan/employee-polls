# Employee Polls

Employee Polls is a React and Redux-powered web application that allows employees within a company to create, vote on, and track polls. The application offers features like user authentication, poll creation, leaderboards, and voting results. This project serves as a way to improve collaboration and transparency within a company by letting employees post and answer "Would you rather?" style questions.

## Features

- **User Authentication**: Employees can log in by selecting their username.
- **Poll Creation**: Users can create "Would You Rather" style polls with two possible answers.
- **Voting**: Employees can vote on polls and see real-time results of the votes.
- **Leaderboards**: Employees are ranked based on the number of polls they've created and answered.
- **Dynamic Polling**: Users can toggle between answered and unanswered polls and view the results of polls they’ve voted on.
- **404 Handling**: If a user tries to access a poll that doesn’t exist, a 404 page is displayed.
  
## Demo

Once deployed, a live demo of the project will be available.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v12.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/your-username/employee-polls.git
cd employee-polls
```

### Install Dependencies

```bash
npm install
```

or with Yarn:

```bash
yarn install
```

### Environment Variables

Create a `.env` file at the root of your project with the following variables:

```bash
# Example .env file
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Run Locally

To start the development server:

```bash
npm run dev
```

or with Yarn:

```bash
yarn dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

### Build for Production

To build the app for production:

```bash
npm run build
```

or with Yarn:

```bash
yarn build
```

To run the production build:

```bash
npm start
```

or with Yarn:

```bash
yarn start
```

## Running Tests

This project uses Jest and React Testing Library for unit tests.

To run tests:

```bash
npm test
```

or with Yarn:

```bash
yarn test
```

### Example Tests
- Snapshot tests for components.
- Unit tests for the Redux actions and reducers.
- DOM tests for verifying interactions such as button clicks or form submissions.

## Tech Stack

- **React**: Frontend framework for building user interfaces.
- **Redux**: State management library to handle application state.
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript.
- **Ant Design**: UI component library for building elegant interfaces.
- **Jest**: Testing framework for JavaScript applications.
- **React Testing Library**: Testing utilities for React components.

## API Reference

This project uses a mock database defined in `src/utils/_DATA.js` to simulate API calls. The mock API includes the following methods:

- `_getQuestions()`: Fetch all poll questions.
- `_saveQuestion(question)`: Save a new poll question.
- `_saveQuestionAnswer({ authedUser, qid, answer })`: Save the answer for a poll question.

## Optimizations

- **Code Splitting**: Next.js handles code splitting to improve performance.
- **Lazy Loading**: Suspense is used to load components asynchronously for improved user experience.

## Lessons Learned

- Implementing complex state management with Redux while maintaining simplicity.
- Testing with Jest and React Testing Library to ensure code quality.
- Building a modular and reusable component-based architecture.

## Roadmap

- [ ] Add user registration and email authentication.
- [ ] Integrate real-time data fetching for live poll updates.
- [ ] Improve styling with custom themes.
- [ ] Optimize for mobile responsiveness.

## License

This project is licensed under the MIT License.
