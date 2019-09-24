import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
  StatusBar
} from "react-native";
import { TextInput } from "react-native-paper";
import { Right } from "native-base";
import axios from "axios";
import CheckOut from "./CheckOut";
export default class Login2 extends Component {
  state = { Email: "", Password: "", token: "" };
  _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("accessToken");
      if (value !== null) {
        this.props.navigation.navigate("Profile");
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (error) {}
  };
  _storeData = async token => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      console.log("ASynStorage", token);
    } catch (error) {
      console.log("Error While Storage");
    }
  };
  componentDidMount() {
    this._retrieveToken();
  }

  onEmailChange = text => {
    this.setState({ Email: text });
  };
  onPassowrdChange = text => {
    this.setState({ Password: text });
  };

  SigninReq = () => {
    let Signin = null;
    Signin = {
      email: this.state.Email,
      password: this.state.Password
    };
    // console.warn("SignUp"+ JSON.stringify(Signup))
    // alert("Signup"+ JSON.stringify(Signin))

    axios
      .post("http://198.245.53.50:3000/api/customer/login", Signin)
      .then(response => {
        console.log("respoene here", response);
        this._storeData(response.data.token);
        this.props.navigation.navigate("Profile");

        // this.state.token=response.token
        //  console.log("TOken",response.token)
        // ToastAndroid.show("Login Sucessfully",ToastAndroid.SHORT)

        // console.warn("sucess",response
        // this.props.navigation.navigate('Login')
      })
      .catch(error => {
        alert(JSON.stringify(error.response.data));
        console.log(error.response.data);
      });
    //  alert("new Order"+ JSON.stringify(newOrder))
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <View style={{ margin: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
            {" "}
            Log into{" "}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
            {" "}
            your account{" "}
          </Text>
          <Right style={{ left: 60 }}>
            {/* <TouchableOpacity style={{width:100,height:40,backgroundColor:"#2cb0f0",borderRadius:10,justifyContent:'center',alignItems:'center'}}
  onPress={()=>this.props.navigation.navigate("MyOrders")}
  >
    <Text style={{color:'white'}}>MyOrders</Text>
  </TouchableOpacity> */}
          </Right>
        </View>

        <View
          style={{
            width: width - 30,
            height: 30,
            marginRight: 15,
            marginLeft: 15,
            marginTop: 20,
            marginBottom: 2,
            borderRadius: 20
          }}
        >
          <TouchableOpacity>
            <TextInput
              label="Email"
              mode="outlined"
              editable="true"
              name="Email"
              onChangeText={this.onEmailChange}
              // onChangeText={(City) => this.setState({City})}
              value={this.state.Email}
              theme={{
                colors: {
                  placeholder: "grey",
                  background: "#f5f6f5",
                  text: "grey",
                  primary: "#5d5d5d"
                }
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextInput
              label="Password"
              mode="outlined"
              editable="true"
              name="Password"
              secureTextEntry={true}
              onChangeText={this.onPassowrdChange}
              // onChangeText={(City) => this.setState({City})}
              value={this.state.Password}
              theme={{
                colors: {
                  placeholder: "grey",
                  background: "#f5f6f5",
                  text: "grey",
                  primary: "#5d5d5d"
                }
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            width: 250,
            height: 45,
            borderRadius: 30,
            backgroundColor: "#2cb0f0",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            marginTop: 180
          }}
          onPress={() => this.SigninReq()}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Signup")}
          style={{ alignSelf: "center" }}
        >
          <Text style={{ color: "#cac9c9", fontSize: 15, marginTop: 20 }}>
            If You Have Not Register? Signup Here{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
