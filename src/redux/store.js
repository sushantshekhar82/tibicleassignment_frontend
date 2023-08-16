import {legacy_createStore,applyMiddleware,combineReducers,compose} from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './register/reducer';

const rootReducer = combineReducers({
   user:userReducer,
    
  });
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );