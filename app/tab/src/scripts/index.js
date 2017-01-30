import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/app/App';

require('./stylesheets/main.scss');

const store = new Store({
  portName: 'HNR' // communication port name
});

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('tab')
);
