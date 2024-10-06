import { Middleware, AnyAction } from 'redux';

const logger: Middleware = (store) => (next) => (action: unknown) => {
  const typedAction = action as AnyAction;

  console.group(typedAction.type);
  console.log('The action:', typedAction);
  const returnValue = next(typedAction);
  console.log('The new state:', store.getState());
  console.groupEnd();

  return returnValue;
};

export default logger;
