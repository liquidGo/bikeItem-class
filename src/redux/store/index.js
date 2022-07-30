import {  createStore } from 'redux';
import {menu} from '../reducers/index';
import {composeWithDevTools } from 'redux-devtools-extension';

export const store= createStore(menu,composeWithDevTools())


