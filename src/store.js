import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './redux/rootReducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(
  createRootReducer(),
  initialState,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);
export { store };
