import auth from './features/Auth'
import toast from './features/Toast'
import form from './features/AstroForm'
import astrolist from './features/astrolist'
import modal from './features/modal'
import onlineusers from './features/onlineusers'
import services from './features/services'
import broadcast from './features/broadcast'
import astrotrans from './features/astrotrans'
import { combineReducers, Middleware } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const reducers=combineReducers({
    auth,
    toast,
    form,
    modal,
    astrolist,
    services,
    onlineusers,
    broadcast,
    astrotrans
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
  }

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
      return middlewares
    },
  })

const persistor = persistStore(store)

export { store, persistor }
