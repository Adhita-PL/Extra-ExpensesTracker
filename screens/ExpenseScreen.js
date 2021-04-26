import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../components/MyHeader'
import { RFValue } from "react-native-responsive-fontsize";
import {Input} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class ExpenseScreen extends Component {
    constructor() {
        super()
        this.state = {
            userId :  firebase.auth().currentUser.email,
            groceries : 0,
            rent : 0,
            bills : 0,
            entertainment : 0,
            kids : 0,
            fuel : 0,
            other: 0,
            setExpenses : "",
            userDocId : '',

            groceriesExpense : "",
            rentExpense : 0,
            billsExpense : 0,
            entertainmentExpense : 0,
            kidsExpense : 0,
            fuelExpense : 0,
            otherExpense : 0,
        }
    }
    addBudget = () =>{
        var grocery = parseInt(this.state.groceries)
        var rent = parseInt(this.state.rent)
        var bills = parseInt(this.state.bills)
        var entertainment = parseInt(this.state.entertainment)
        var kids = parseInt(this.state.kids)
        var fuel = parseInt(this.state.fuel)
        var other = parseInt(this.state.other)
        db.collection("expenses").add({
            "user_id" : this.state.userId,
            "groceries" : grocery,
            "rent" : rent,
            "bills" : bills,                            
            "entertainment" : entertainment,
            "kids" : kids,
            "fuel" : fuel,
            "other" : other,
        })
        db.collection("users").where("email_id", "==", this.state.userId).get()
        .then()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("users").doc(doc.id).update({
                    setExpenses: true,
                });
            });
        });
    }
    getSetExpenses() {
        db.collection("users").where("email_id", "==", this.state.userId)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                setExpenses: doc.data().setExpenses,
                userDocId: doc.id,
              });
            });
        });
    }
    getExpenseForDisplay = () => {
        db.collection("expenses").where("user_id", '==', this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    groceriesExpense : doc.data().groceries,
                    rentExpense : doc.data().rent,
                    billsExpense : doc.data().bills,
                    entertainmentExpense : doc.data().entertainment,
                    kidsExpense : doc.data().kids,
                    fuelExpense : doc.data().fuel,
                    otherExpense : doc.data().other,
                })
            })
        })
    }
    componentDidMount() {
        this.getSetExpenses();
        this.getExpenseForDisplay();
    }
    render() {
        if(this.state.setExpenses === true) {
            return(
                <View style = {{flex : 1}}>
                    <MyHeader 
                        navigation = {this.props.navigation}
                        title = "Your Expenses"
                    />
                    <View style={styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Groceries : {this.state.groceriesExpense}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Rent : {this.state.rentExpense}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Bills : {this.state.billsExpense}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Entertainment : {this.state.entertainmentExpense}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Kids : {this.state.kidsExpense}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Fuel : {this.state.fuelExpense}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Others : {this.state.otherExpense}
                        </Text>
                    </View> 
                    <View style = {{justifyContent : 'center',alignItems : 'center'}}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress = {()=>{
                                this.props.navigation.navigate("ExpenseEdit")
                            }}>
                            <Text>Edit</Text>    
                        </TouchableOpacity> 
                    </View>
                       
                </View>
            )
        } 
        return(
            <View style = {{flex : 1}}>
                <MyHeader 
                    navigation = {this.props.navigation}
                    title = "Your Expenses"
                />
                <ScrollView style={styles.scrollView}>
                    <KeyboardAvoidingView>
                    <View>
                        <Text style = {{fontSize : RFValue(20)}}>Groceries</Text>
                        <Input
                            style = {styles.formTextInput}
                            placeholder = {"Vegetables, fruits, milk, etc"}
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    groceries : text
                                })
                            }}
                            value = {this.state.groceries}
                        />
                        <Text style = {{fontSize : RFValue(20)}}>Rent</Text>
                        <Input
                            style = {styles.formTextInput}
                            placeholder = {"Home Rent, EMI's"} 
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    rent : text
                                })
                            }}
                            value = {this.state.rent}
                        />
                        <Text style = {{fontSize : RFValue(20)}}>Bills</Text>
                        <Input
                            style = {styles.formTextInput}
                            placeholder = {"Electricity, Internet, DTH"}
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    bills : text
                                })
                            }}
                            value = {this.state.bills}
                        />
                        <Text style = {{fontSize : RFValue(20)}}>Entertainment</Text>
                        <Input
                            style = {styles.formTextInput}
                            placeholder = {"Shopping, Movies, Tours"} 
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    entertainment : text
                                })
                            }}
                            value = {this.state.entertainment}
                        />
                        <Text style = {{fontSize : RFValue(20)}}>Kids</Text>
                        <Input
                            style = {styles.formTextInput}
                            placeholder = {"Fees, clothes, toys"} 
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    kids : text
                                })
                            }}
                            value = {this.state.kids}
                        />
                        <Text style = {{fontSize : RFValue(20)}}>Fuel</Text>
                        <Input
                            style = {styles.formTextInput}
                            placeholder = {"2 or 4 wheeler, Public Transport"} 
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    fuel : text
                                })
                            }}
                            value = {this.state.fuel}
                        />
                        <Text style = {{fontSize : RFValue(20)}}>Others</Text>
                        <Input
                            style = {{width: "75%", height: RFValue(35), padding: 10,}}
                            placeholder = {"..."} 
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=>{
                                this.setState({
                                    other : text
                                })
                            }}
                            value = {this.state.other}
                        />
                        <TouchableOpacity style = {{width : 1000, height: 50}} onPress = {()=>{this.addBudget()}} >
                            <Text style = {{fontSize : 30}}>Set Expenses</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formTextInput: {
        width: "75%",
        height: RFValue(35),
        padding: 10,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    spendingCatogeriesText : {
        fontWeight: "400",
        fontSize: RFValue(20),
    },
    box : {
        flex : 0.1, 
        justifyContent:'center',
        alignItems:'center',
        marginTop:RFValue(10),
        padding: RFValue(10),
        borderWidth:1,
        borderColor:'#deeedd', 
        marginLeft : RFValue(10),
        marginRight : RFValue(10),
        width : RFValue(410)
    },
    button: {
        width: "75%",
        height: RFValue(60),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(60),
        backgroundColor: "#FE5888",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        elevation: 16,
        marginTop : RFValue(20),
    },
})