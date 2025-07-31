/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavgator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';



function App(): React.JSX.Element {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MenuProvider>
          <AppNavgator/>
      </MenuProvider>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
