import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import {
  Undo,
  Redo,
  PlayArrow,
  Settings,
  ExitToApp,
  RestartAlt
} from '@mui/icons-material';

import {
  useStores,
  TabPanel,
  MenuBtn,
  SpaceModelView,
  OutdoorSidebar,
  ReactPlanner,
  Plugins as PlannerPlugins,
  Models as PlannerModels,
  reducer as PlannerReducer,
} from 'space-studio';

import React, { useState } from 'react';
import Immutable, {Map} from 'immutable';
import { SizeMe } from 'react-sizeme';
import { observer } from 'mobx-react';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

import MyCatalog from './catalog/mycatalog';
import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';
import saveGLB from './ui/saveGLB';
import saveJSON from './ui/saveJSON';

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarScreenshotButton,
];

//define state
let AppState = Map({
  'space-studio': new PlannerModels.State()
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update('space-studio', plannerState => PlannerReducer(plannerState, action));
  return state;
};


let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension ?
    window.devToolsExtension({
      features: {
        pause   : true,     // start/pause recording of dispatched actions
        lock    : true,     // lock/unlock dispatching actions and side effects
        persist : true,     // persist states on page reloading
        export  : true,     // export history of actions in a file
        import  : 'custom', // import history of actions from a file
        jump    : true,     // jump back and forth (time travelling)
        skip    : true,     // skip (cancel) actions
        reorder : true,     // drag and drop actions in the history list
        dispatch: true,     // dispatch custom actions or action creators
        test    : true      // generate tests for the selected actions
      },
      actionsBlacklist: blackList,
      maxAge: 999999
    }) :
    f => f
);

const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

function MenuScreen(props) {
  const { PlaymodeStore, SidebarStore, IndoormodeStore, ModelStore } = useStores();

  const handleChange = () => {
    IndoormodeStore.setValue();
  };

  const enterPlayMode = () => {
    PlaymodeStore.enterPm();
      //props.sUp(true);
  };

  const localStorageClear = () => {
    localStorage.clear();
  }

  const exportModel = () => {
    saveJSON(ModelStore.model, 'city');
  }
  
  return (
      <Box sx={{ bgcolor: 'white', width: '100vw', height: '100vh' }}>
        <AppBar sx={{ bgcolor: '#fafafa', borderBottom: 1, borderColor: '#eaeaea' }}>
          <Toolbar variant="dense">
            <MenuBtn/>
            <IconButton edge="start" sx={{ mr: 2 }}>
              <Undo sx={{color: '#7c7c7c'}} />
            </IconButton>
            <IconButton edge="start" sx={{ mr: 5 }}>
              <Redo sx={{color: '#7c7c7c'}} />
            </IconButton>
            <Typography component={'div'} variant="h6" sx={{ mr: 10 ,color: '#7c7c7c' }}>
              Space Studio
            </Typography>
            <Tabs value={IndoormodeStore.value} onChange={handleChange} sx={{ flexGrow: 1 }} textColor="secondary" indicatorColor="secondary">
              <Tab label="실외 공간 생성" index='0' />
              <Tab label="실내 공간 생성" index='1' />
            </Tabs>
            <IconButton edge="start" sx={{ mr: 3 }} onClick={localStorageClear}>
              <RestartAlt sx={{color: '#7c7c7c'}}/>
            </IconButton>         
            <IconButton edge="start" sx={{ mr: 3 }} onClick={enterPlayMode}>
              <PlayArrow sx={{color: '#7c7c7c'}}/>
            </IconButton>
            <IconButton edge="start" sx={{ mr: 3 }}>
              <Settings sx={{color: '#7c7c7c'}} />
            </IconButton>
            <IconButton edge="start" sx={{ mr: 1 }} onClick={exportModel}>
              <ExitToApp sx={{color: '#7c7c7c'}}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', pt: '5vh'}}>
          <TabPanel value={IndoormodeStore.value} index={0} width='100vw' sx={{display: 'flex', flexFlow: 'row nowrap'}}>
            <SpaceModelView/>
            <Box sx={{ minWidth: '200px', width: '16vw'}}>
              <OutdoorSidebar catalog={MyCatalog}/>
            </Box>
          </TabPanel>
          <TabPanel value={IndoormodeStore.value} index={1} width='100vw'>
            <Provider store={store}>
              <SizeMe monitorHeight>
                {({size}) =>
                  <ReactPlanner
                    catalog={MyCatalog}
                    width={size.width}
                    height={890}
                    plugins={plugins}
                    toolbarButtons={toolbarButtons}
                    autosaveKey={SidebarStore.current === 'building' ? SidebarStore.item.name : 'temp'}
                    initialObject={SidebarStore.current === 'building' && SidebarStore.item.floorShape}
                    stateExtractor={state => state.get('space-studio')}
                  />
                }
              </SizeMe>
            </Provider>
          </TabPanel>
        </Box>
      </Box>
      
  );
}

export default observer(MenuScreen);
