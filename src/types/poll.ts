export interface PollOption {
  text: string; // Text for the option
  votes: string[]; // Array of user IDs who voted for this option
}

export interface Poll {
  id: string; // Unique identifier for the poll
  author: string; // The user who created the poll (could be the user ID)
  timestamp: number; // The time when the poll was created
  optionOne: PollOption; // First option in the poll
  optionTwo: PollOption; // Second option in the poll
}

export interface NewPoll {
  author: string; // The user who created the poll (could be the user ID)
  optionOneText: string; // First option in the poll
  optionTwoText: string; // Second option in the poll
}

export interface Answer {
  authedUser: string; // ID of the authenticated user answering the poll
  qid: string; // Poll ID (question ID) being answered
  answer: 'optionOne' | 'optionTwo'; // The option the user selects
}
