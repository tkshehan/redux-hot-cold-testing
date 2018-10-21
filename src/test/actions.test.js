import {
  GENERATE_AURAL_UPDATE,
  generateAuralUpdate,
  MAKE_GUESS,
  makeGuess,
  RESTART_GAME,
  restartGame
} from '../actions'

describe('makeGuess', () => {
  it('should return the action', () => {
    const guess = 5;
    const action = makeGuess(guess);
    expect(action.guess).toEqual(guess);
    expect(action.type).toEqual(MAKE_GUESS);
  });
});

describe('generateAuralUpdate', () => {
  it('should return the action', () => {
    const action = generateAuralUpdate();
    expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
  });
});

describe('restartGame', () => {
  it('should return the action', () => {
    const correctAnswer = 5;
    const action = restartGame(correctAnswer);
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toEqual(correctAnswer);
  })
});
