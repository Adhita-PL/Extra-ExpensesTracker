import React from 'react';
import BudgetScreen from '../screens/BudgetScreen';
import BudgetEditScreen from '../screens/BudgetEditScreen';
import { createSwitchNavigator } from 'react-navigation';

export const switchNavigator = createSwitchNavigator({
  BudgetPage : {
    screen : BudgetScreen,
  },
  BudgetEdit : {
    screen : BudgetEditScreen,
  }
});
const AppContainer = createAppContainer(switchNavigator);
