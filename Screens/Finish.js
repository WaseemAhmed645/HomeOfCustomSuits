import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Left } from "native-base";
export default class Finish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam("Item", "NotFound")
    };
  }
  _retrieveData = async () => {
    try {
      const PentStyle = await AsyncStorage.getItem("StylesItem");
      const PentStuff = await AsyncStorage.getItem("StuffItem");
      const PentMeaurments = await AsyncStorage.getItem("MeaurmentItem");
      let CartData;
      if (PentStuff !== null || PentStyle !== null || PentMeaurments !== null) {
        console.log("Selected Styles:", PentStyle);
        console.log("Selected Stuff:", PentStuff);
        console.log("Selected Meaurments:", PentMeaurments);
        console.log("Item", this.state.item);
      } else {
        this.setState({ Cart: null });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: "white",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ position: "absolute", top: 20, left: 20 }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: "white"
            }}
            onPress={() => this.props.navigation.navigate("Custom")}
          >
            <Icon name="close" size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 40
          }}
        >
          <Text style={{ color: "black", fontSize: 18 }}>
            {" "}
            Thank you for your Customization!
          </Text>
          <Text>Please proceed to checkout to view your order details</Text>
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
            marginTop: 20
          }}
          // onPress={() => this.props.navigation.navigate("Payment")}
          // onPress={() => this._retrieveData()}
          onPress={() =>
            this.props.navigation.navigate("CartLogin", {
              isCustom: true,
              customItem: this.state.item
            })
          }
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            Proceed To CheckOut
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
