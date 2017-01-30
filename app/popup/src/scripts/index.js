import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import Moment from 'moment';

import App from './components/app/App';

require('./stylesheets/main.scss');

const store = new Store({
  portName: 'HNR'
});

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('popup')
);
