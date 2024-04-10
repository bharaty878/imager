import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import History from './History';
const Drawer = createDrawerNavigator();

const Navi = () => {
  return (
    <View style={{flex:1}}>
      <NavigationContainer>
      <Drawer.Navigator>
         <Drawer.Screen name="Home" component={Home} />
         <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default Navi

const styles = StyleSheet.create({})

