import {createStore} from 'redux';
import {wrapStore} from 'react-chrome-redux';
import rootReducer from './reducer';

const store = createStore(rootReducer);

wrapStore(store, {portName: 'HNR'}); // make sure portName matches
