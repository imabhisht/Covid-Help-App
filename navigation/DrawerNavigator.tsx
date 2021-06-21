import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/HomePage';
import HomePage2 from '../screens/HomePage2';
import {DrawerContent} from '../components/DrawerContent'; 
import InformationScreen from '../screens/InformationScreen';
import DrawerContentTrial from '../components/DrawerContentTrial';
import SupportFirst from '../screens/SupportFirst';
import ProvideInformation from '../screens/ProvideInformation';
import WelcomeScreen from '../screens/StartScreens/WelcomeScreen';
import AboutProject from '../screens/AboutProject';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false
      }} 
      drawerContent={props => <DrawerContentTrial {...props}/>}
      >
       <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
      />


      <Drawer.Screen
        options={{
          headerTitle: 'Explore Oxygen',
          headerShown: true,
          headerStatusBarHeight: 40,
          headerStyle:{
            justifyContent: 'center',
            shadowColor: 'transperent',
            backgroundColor: '#fff',
            elevation: 0,
            paddingBottom: '3%',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontFamily: 'VarelaRound_400Regular',
            fontSize: 26,
            marginVertical: '10%'
          },
        }}
        name="Home"
        component={HomePage}
      />

      <Drawer.Screen
        options={{
          headerTitle: 'Explore Plasma',
          headerShown: true,
          headerStatusBarHeight: 40,
          headerStyle:{
            justifyContent: 'center',
            shadowColor: 'transperent',
            backgroundColor: '#fff',
            elevation: 0,
            paddingBottom: '3%',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontFamily: 'VarelaRound_400Regular',
            fontSize: 26,
            marginVertical: '10%'
          },
        }}
        name="Home2"
        component={HomePage2}
      />

      <Drawer.Screen 
          name="Information"
          component={InformationScreen}
      />

      <Drawer.Screen 
          name="SupportFirst"
          component={SupportFirst}
      />

      <Drawer.Screen 
        name="ProvideInformation"
        component={ProvideInformation}
      />

      <Drawer.Screen 
        name="About"
        component={AboutProject}
        />

    </Drawer.Navigator>
  );
}

const drawerHeaderStyleHOME = {
  
}