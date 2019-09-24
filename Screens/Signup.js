import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
export default class Signup extends Component {
  state = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Confirmpassowrd: ""
  };

  onFirstNameChange = text => {
    this.setState({ FirstName: text });
  };
  onLastNameChange = text => {
    this.setState({ LastName: text });
  };
  onEmailChange = text => {
    this.setState({ Email: text });
  };
  onPassowrdChange = text => {
    this.setState({ Password: text });
  };
  onCnfrmPassowrdChange = text => {
    this.setState({ Confirmpassowrd: text });
  };
  SignupReq = () => {
    let Signup = null;
    Signup = {
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      email: this.state.Email,
      password: this.state.Password,
      password2: this.state.Confirmpassowrd
    };
    // console.warn("SignUp"+ JSON.stringify(Signup))
    // alert("Signup"+ JSON.stringify(Signup))

    axios
      .post("http://198.245.53.50:3000/api/customer/register", Signup)
      .then(response => {
        this.props.navigation.navigate("Login2");
        ToastAndroid.show("Register Sucessfully", ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log("error", error.response.data);
      });
    //  alert("new Order"+ JSON.stringify(newOrder))
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
            {" "}
            Sign up{" "}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
            {" "}
            your self{" "}
          </Text>
        </View>

        <View
          style={{
            width: width - 30,
            height: 30,
            marginRight: 15,
            marginLeft: 15,
            marginTop: 20,
            marginBottom: 2,
            flex: 1,
            borderRadius: 20
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity>
              <TextInput
                label="FirstName"
                mode="outlined"
                editable="true"
                name="FirstName"
                onChangeText={this.onFirstNameChange}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.FirstName}
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
                label="LastName"
                mode="outlined"
                editable="true"
                name="LastName"
                onChangeText={this.onLastNameChange}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.LastName}
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
            <TouchableOpacity>
              <TextInput
                label="ConfirmPassword"
                mode="outlined"
                editable="true"
                name="ConfirmPassword"
                onChangeText={this.onCnfrmPassowrdChange}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.Confirmpassowrd}
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
            <TouchableOpacity
              style={{
                width: 250,
                height: 45,
                borderRadius: 30,
                backgroundColor: "#2cb0f0",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                marginTop: 20
              }}
              onPress={this.SignupReq}
            >
              <Text style={{ color: "white", fontSize: 15 }}>Sign up</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
