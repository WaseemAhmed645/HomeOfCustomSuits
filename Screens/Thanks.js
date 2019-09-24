import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Left, Right, Header, Body } from "native-base";
export default class Thanks extends Component {
  render() {
    return (
      <View style={{  backgroundColor: "white" }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <Icon
          name="gift"
          size={120}
          style={{
            alignSelf: "center",
            marginTop: 80,
            color: "#2cb0f0",
            marginBottom: 20
          }}
        />
        <Text
          style={{
            textAlign: "justify",
            marginTop: 30,
            marginBottom: 5,
            alignSelf: "center"
          }}
        >
          Thank You for purchasing. Your order will
        </Text>
        <Text style={{ textAlign: "justify", alignSelf: "center" }}>
          be shipped in 2-4 working days
        </Text>

        <TouchableOpacity
          style={{
            width: 250,
            height: 45,
            borderRadius: 30,
            backgroundColor: "#2cb0f0",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            marginTop: 100
          }}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
