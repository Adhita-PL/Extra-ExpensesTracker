import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../components/MyHeader'
import { RFValue } from "react-native-responsive-fontsize";
import {Input} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class BudgetEditScreen extends Component{
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
            docId : "",
        }
    }
    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection("budget")
          .where("user_id", "==", email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var data = doc.data();
              this.setState({
                groceries: data.groceries,
                docId: doc.id,
              });
            });
        });
    };
    addBudget = () =>{
        var grocery = parseInt(this.state.groceries)
        var rent = parseInt(this.state.rent)
        var bills = parseInt(this.state.bills)
        var entertainment = parseInt(this.state.entertainment)
        var kids = parseInt(this.state.kids)
        var fuel = parseInt(this.state.fuel)
        var other = parseInt(this.state.other)
        db.collection("budget").doc(this.state.docId).update({
            "groceries" : grocery,
            "rent" : rent,
            "bills" : bills,
            "entertainment" : entertainment,
            "kids" : kids,
            "fuel" : fuel,
            "other" : other,
        })
    }
    componentDidMount() {
        this.getUserDetails();
    }
    render() {
        return(
            <View style = {{flex : 1}}>
                <MyHeader 
                    navigation = {this.props.navigation}
                    title = "Edit"
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
                        <TouchableOpacity style = {styles.button} onPress = {()=>{this.addBudget()}} >
                            <Text style = {{fontSize : 30}}>Set Budget</Text> 
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
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        elevation: 16,
        marginTop : RFValue(20),
    },
})
