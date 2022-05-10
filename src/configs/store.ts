// import axios from 'axios'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import rootReducers from '../reduxs/reducers'
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, Store, createStore } from 'redux';
import axiosMiddleware from '../middleware/axios';
import { axios } from 'utils';

const enhancer = [axiosMiddleware, thunk.withExtraArgument(axios)]

const composedEnhancer = (import.meta.env.VITE_ENVIRONMENT_NAME !== 'production')
  ? composeWithDevTools(applyMiddleware(...enhancer))
  : applyMiddleware(...enhancer)


export default function configureStore(initialState?: RootReducers) {
  const store: Store = createStore(
    rootReducers,
    {},
    composedEnhancer
  )
  const persistor = persistStore(store)
  return { store, persistor }
}