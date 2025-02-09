import { ImageBackground, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider, useFocusEffect } from "@react-navigation/native";
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Icon, Image } from 'react-native-elements';
import EditTodoScreen from './src/screens/EditTodoScreen';
enableScreens();

export type RootDrawerParams = {
  Home: undefined,
  'Add Todo': undefined,
  'Edit Todo': { id: string },
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
  const theme = useColorScheme(); return (
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
          }} component={HomeScreen} />
          <Drawer.Screen name='Add Todo' options={{
            drawerIcon: ({ color, size }) => (
              <Icon name='add' size={33} color='#5670cd' />
            ),
            drawerActiveTintColor: '#5670cd',
            drawerLabelStyle: {
              color: '#5670cd',
            },
          }} component={AddTodoScreen} />
          <Drawer.Screen name='Edit Todo' options={{ drawerItemStyle: { display: 'none' } }} component={EditTodoScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
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