import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import immutableDevtools from 'immutable-devtools';

import App from './App';


import {
  StoreProvider,
  RootStore,
} from 'space-studio';


let blackList = isProduction === true ? [] : [
  'UPDATE_MOUSE_COORDS',
  'UPDATE_ZOOM_SCALE',
  'UPDATE_2D_CAMERA'
];

if( !isProduction ) {
  console.info('Environment is in development and these actions will be blacklisted', blackList);
  console.info('Enable Chrome custom formatter for Immutable pretty print');
  immutableDevtools( Immutable );
}


const rootStore = new RootStore();

ReactDOM.render(
  (
    <React.StrictMode>
      <StoreProvider value={rootStore}>
        <App />
      </StoreProvider>
    </React.StrictMode>
  ),
  document.getElementById('root')
);