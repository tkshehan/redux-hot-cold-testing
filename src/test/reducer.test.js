import reducer from '../reducer';
import {makeGuess, generateAuralUpdate, restartGame} from '../actions';
import {trelloReducer} from '../../../redux-trello/src/reducers';

describe('hot-or-cold reducer', () => {
  const testState = {
    guesses: [1, 2, 3],
    feedback: 'Make your test!',
    auralStatus: 'Test',
    correctAnswer: 101 // Cannot be generated as the initial state.
  };

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.auralStatus).toEqual('');
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.correctAnswer).toBeGreaterThanOrEqual(1);
  });

  it('should return the current state on an unknown action', () => {
    const state = trelloReducer(testState, {type: '__UNKNOWN'});
    expect(state).toBe(testState);
  });

  describe('makeGuess', () => {
    it('should add a guess to the list of guesses', () => {
      const guess = 50;
      const state = reducer(testState, makeGuess(guess));
      expect(state.guesses)
        .toEqual(expect.arrayContaining([...testState.guesses, guess]));
    });

    it('should generate the appropriate feedback', () => {
      const correctAnswer = 100;
      const guesses = [50, 60, 80, 95, 100];
      const feedback = [
        "You're Ice Cold...",
        "You're Cold...",
        "You're Warm.",
        "You're Hot!",
        'You got it!'];
      let state = reducer({
        guesses: [],
        feedback: 'Make your guess!',
        auralStatus: '',
        correctAnswer
      }, {type: '___'});

      for (let i = 0; i < 5; i++) {
        state = reducer(state, makeGuess(guesses[i]));
        expect(state.feedback).toEqual(feedback[i]);
      }
    });
  });

  describe('restartGame', () => {
    it('Should return a reset state with correct values', () => {
      let correctAnswer = 200;
      let state = reducer(testState, restartGame(correctAnswer));
      expect(state.correctAnswer).toEqual(correctAnswer);
      expect(state.guesses).toEqual(expect.arrayContaining([]));
      expect(state.auralStatus).toEqual('');
      expect(state.feedback).toEqual('Make your guess!');
    });
  });

  describe('generateAuralUpdate', () => {
    it('Should change the auralUpdate state', () => {
      let state = reducer(undefined, makeGuess(10));
      state = reducer(state, generateAuralUpdate());
      expect(state.auralStatus).toEqual(
        `Here's the status of the game right now: ${state.feedback} You've made 1 guess. ` +
        `It was: 10`
      );
    });
  });
});