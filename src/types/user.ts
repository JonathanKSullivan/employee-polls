export interface User {
  id: string; // Unique identifier for the user
  password: string; // User's password
  name: string; // User's display name
  avatarURL: string | null; // URL to the user's avatar, or null if not provided
  answers: {
    // Object where keys are question IDs and values are 'optionOne' or 'optionTwo'
    [key: string]: 'optionOne' | 'optionTwo';
  };
  questions: string[]; // Array of question IDs the user has created
}
