import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './App'
import Iouters from './Iouters'
import { store } from './redux/store';


// const store=createStore(menu,composeWithDevTools())
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Iouters />
    </Provider>
    , document.getElementById('root')
);
// ReactDOM.render(<Router />, document.getElementById('root'));
// registerServiceWorker();