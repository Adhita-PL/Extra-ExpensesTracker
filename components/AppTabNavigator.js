import React, {Component} from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import IncomeScreen from '../screens/IncomeScreen'
import ExpenseScreen from '../screens/ExpenseScreen'
import BudgetScreen from '../screens/BudgetScreen'
import AnalysisScreen from '../screens/AnalysisScreen'

export const AppTabNavigator = createBottomTabNavigator({
    IncomePage : {screen: IncomeScreen, 
    navigationOptions:{
        tabBarIcon : <Image source = {require("../assets/home-icon.png")} style = {{width:20, height:20}}/>,
        tabBarLabel : "Income Screen"
    }},
    ExpensesPage : {screen: ExpenseScreen, 
        navigationOptions:{
            tabBarIcon : <Image source = {require("../assets/home-icon.png")} style = {{width:20, height:20}}/>,
            tabBarLabel : "Expense Screen"
    }},
    BudgetPage : {screen: BudgetScreen, 
        navigationOptions:{
            tabBarIcon : <Image source = {require("../assets/home-icon.png")} style = {{width:20, height:20}}/>,
            tabBarLabel : "Budget Screen"
        }},
    AnalysisPage : {screen: AnalysisScreen, 
            navigationOptions:{
                tabBarIcon : <Image source = {require("../assets/home-icon.png")} style = {{width:20, height:20}}/>,
                tabBarLabel : "Analysis Screen"
    }},
})