import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import ExpensesEditScreen from '../screens/ExpensesEditScreen'
import BudgetEditScreen from '../screens/BudgetEditScreen'
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions : {
      drawerIcon : <Icon name = "home" type = "fontawesome5" />
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions : {
      drawerIcon : <Icon name = "settings" type = "fontawesome5" />,
      drawerLabel : "Settings"
    }
  },
  ExpenseEdit : {
    screen : ExpensesEditScreen,
    navigationOptions : {
      drawerIcon : <Icon name = "edit" type = "fontawesome" />,
      drawerLabel : "Expenses Edit"
    }
  },
  BudgetEdit : {
    screen : BudgetEditScreen,
    navigationOptions : {
      drawerIcon : <Icon name = "edit" type = "fontawesome" />,
      drawerLabel : "Budget Edit"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {                                                   
    initialRouteName : 'Home'
  })