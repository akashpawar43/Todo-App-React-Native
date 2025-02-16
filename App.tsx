import { ImageBackground, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider, useFocusEffect } from "@react-navigation/native";
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/oldScreens/HomeScreen';
import AddTodoScreen from './src/screens/oldScreens/AddTodoScreen';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Icon, Image } from 'react-native-elements';
import EditTodoScreen from './src/screens/oldScreens/EditTodoScreen';
enableScreens();
import RNBootSplash from "react-native-bootsplash";
import AddTodoScreenNew from './src/screens/newScreens/AddTodoScreenNew';
import ViewTodoScreen from './src/screens/newScreens/ViewTodoScreen';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import ViewTodoScreenNew from './src/screens/oldScreens/ViewTodoScreenNew';
import TodoListScreen from './src/screens/newScreens/TodoListScreen';
import EditTodoScreenNew from './src/screens/newScreens/EditTodoScreenNew';
import ProfileScreen from './src/screens/newScreens/ProfileScreen';
import { Provider } from 'react-redux';
import store from './src/screens/store/store/store';

export type RootDrawerParams = {
  Home: undefined,
  'AddTodo': undefined,
  'ViewTodo': { id: string },
  'EditTodo': { id: string },
  'EditTodoNew': { id: string },
  'ViewTodoNew': { id: string },
  'HomeNew': undefined,
  'Profile': undefined,
  // 'Add Todo new': undefined,
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <ImageBackground style={styles.backgroundImage} >
          <Image source={require('./src/assets/profile.png')} style={styles.profileImage} />
        </ImageBackground>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const App = () => {
  const theme = useColorScheme();
  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate loading
      RNBootSplash.hide({ fade: true });
    };

    init();
  }, []);

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          // minHeight: 80,
          // paddingVertical: 20,
          // marginTop: 10,
          borderLeftColor: '#4caf50',
        }}
        text1Style={{
          fontSize: 13
        }}
        text2Style={{
          fontSize: 13
        }}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          minHeight: 80,
          paddingVertical: 20,
          marginTop: 10,
          borderLeftColor: '#FE6301',
        }}
        text1Style={{
          fontSize: 13
        }}
        text2Style={{
          fontSize: 13
        }}
        text2NumberOfLines={5}
      />
    ),
  };
  return (
    <Provider store={store}>
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={{ headerShown: false, drawerStyle: { padding: 0 } }} drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="Home">
            <Drawer.Screen name='Home' options={{
              drawerIcon: ({ color, size }) => (
                <Icon name='home' size={33} color='#5670cd' />
              ),
              drawerActiveTintColor: '#5670cd',
              drawerLabelStyle: {
                color: '#5670cd',
              },
            }} component={TodoListScreen} />
            {/* }} component={HomeScreen} /> */}
            <Drawer.Screen name='AddTodo' options={{
              drawerIcon: ({ color, size }) => (
                <Icon name='add' size={33} color='#5670cd' />
              ),
              drawerActiveTintColor: '#5670cd',
              drawerLabelStyle: {
                color: '#5670cd',
              },
            }} component={AddTodoScreenNew} />
            <Drawer.Screen name='EditTodoNew' options={{ drawerItemStyle: { display: 'none' } }} component={EditTodoScreenNew} />
            <Drawer.Screen name='ViewTodo' options={{ drawerItemStyle: { display: 'none' } }} component={ViewTodoScreen} />
            <Drawer.Screen name='ViewTodoNew' options={{ drawerItemStyle: { display: 'none' } }} component={ViewTodoScreenNew} />
            <Drawer.Screen name='EditTodo' options={{ drawerItemStyle: { display: 'none' } }} component={EditTodoScreen} />
            <Drawer.Screen name='Profile' options={{
              drawerIcon: ({ color, size }) => (
                <Icon name='profile' size={33} color='#5670cd' />
              ),
              drawerActiveTintColor: '#5670cd',
              drawerLabelStyle: {
                color: '#5670cd',
              },
            }} component={ProfileScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({
  drawerHeader: {
    // width: '100%',
    height: 180, // Adjust height as needed
    marginBottom: 20,
    padding: 0,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    resizeMode: 'cover',
    // position: 'absolute', // Ensure it fills the space
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});