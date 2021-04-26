import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import {Input} from 'react-native-elements'
import { RFValue } from "react-native-responsive-fontsize";

export default class IncomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            income : '',
            userId : firebase.auth().currentUser.email
        }
    }
    goToBudget = () => {
        db.collection("users")
        .where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("users").doc(doc.id).update({
                    income: this.state.income,
                });
            });
        });
        this.props.navigation.navigate("BudgetPage")
    }
    render() {
        return(
            <View>
                <MyHeader 
                    navigation = {this.props.navigation}
                    title = "Your Income"
                />
                <Input
                    style = {styles.formTextInput}
                    placeholder = {"Enter your monthly Income"}
                    keyboardType = {'numeric'}
                    onChangeText = {(text) => {
                        this.setState({
                            income : text
                        })
                    }}
                />
                <TouchableOpacity 
                    style={[styles.button, { marginTop: RFValue(30) }]}
                    onPress = {()=>{
                        this.goToBudget();
                    }}
                >
                    <Text style={styles.requestbuttontxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formTextInput: {
        marginTop : RFValue(100),
        width: "75%",
        height: RFValue(35),
        borderWidth: 1,
        padding: 10,
    },
    requestbuttontxt:{
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#fff",
    },
    button: {
        width: "75%",
        height: RFValue(60),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(50),
        backgroundColor: "#FE5888",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginLeft: RFValue(50),
    },
})