import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/app/App';

require('./stylesheets/main.scss');

const store = new Store({
  portName: 'HNR' // communication port name
});

const anchor = document.createElement('div');
anchor.id = 'code-journal-content-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('code-journal-content-anchor')
);
