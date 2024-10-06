export const initialState = {
  authedUser: 'sarahedo',
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: '/sarahedo.png',
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionOne',
      },
      questions: ['8xf0y6ziyjabvozdd253nd'],
    },
  },
  polls: {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'sarahedo',
      optionOne: { votes: ['sarahedo'], text: 'Option 1' },
      optionTwo: { votes: [], text: 'Option 2' },
    },
  },
};
