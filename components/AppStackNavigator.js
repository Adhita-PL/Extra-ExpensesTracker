import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import ExpensesEditScreen from '../screens/ExpensesEditScreen';
import ExpenseScreen from '../screens/ExpenseScreen'

export const switchNavigator = createSwitchNavigator({
  ExpensesPage : {
    screen : ExpenseScreen,
  },
  ExpenseEdit : {
    screen : ExpensesEditScreen,
  }
});
const AppContainer = createAppContainer(switchNavigator);
