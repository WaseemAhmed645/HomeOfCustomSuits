import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import KidsProducts from "./KidsProducts";
import MensProducts from "./MensProducts";
import WomenProducts from "./WomenProducts";

import { Left, Right, Header, Body } from "native-base";

export default class Products extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header style={{ backgroundColor: "#2cb0f0" }}>
            <Left>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon name="arrow-left" size={20} style={{ color: "white" }} />
              </TouchableOpacity>
            </Left>
            <Body style={{ left: 40 }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Feature Products
              </Text>
            </Body>
            <Right />
          </Header>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-evenly",
              alignSelf: "center"
            }}
          >
            <View style={{ marginTop: 10 }}>
              <ImageBackground
                source={require("../img/5.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={{ width: 170, height: 160 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    style={{ color: "#2cb0f0" }}
                    size={15}
                  />
                </View>
              </ImageBackground>

              <View>
                <Text style={{ color: "black" }}>Casual Dress</Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Cutomizable Dress
                </Text>
                <Text style={{ color: "black" }}>$256.24</Text>
              </View>
            </View>

            <View style={{ marginLeft: 5, marginTop: 10 }}>
              <ImageBackground
                source={require("../img/6.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={{ width: 170, height: 160 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    style={{ color: "#2cb0f0" }}
                    size={15}
                  />
                </View>
              </ImageBackground>

              <View style={{}}>
                <Text style={{ color: "black" }}>Casual Dress</Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Cutomizable Dress
                </Text>
                <Text style={{ color: "black" }}>$256.24</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
              alignSelf: "center"
            }}
          >
            <View style={{ marginTop: 10 }}>
              <ImageBackground
                source={require("../img/3.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={{ width: 170, height: 160 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    style={{ color: "#2cb0f0" }}
                    size={15}
                  />
                </View>
              </ImageBackground>

              <View style={{}}>
                <Text style={{ color: "black" }}>Casual Dress</Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Cutomizable Dress
                </Text>
                <Text style={{ color: "black" }}>$256.24</Text>
              </View>
            </View>

            <View style={{ marginLeft: 5, marginTop: 10 }}>
              <ImageBackground
                source={require("../img/2.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={{ width: 170, height: 160 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    style={{ color: "#2cb0f0" }}
                    size={15}
                  />
                </View>
              </ImageBackground>

              <View style={{}}>
                <Text style={{ color: "black" }}>Casual Dress</Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Cutomizable Dress
                </Text>
                <Text style={{ color: "black" }}>$256.24</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
              alignSelf: "center"
            }}
          >
            <View style={{ marginTop: 10 }}>
              <ImageBackground
                source={require("../img/10.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={{ width: 170, height: 160 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    style={{ color: "#2cb0f0" }}
                    size={15}
                  />
                </View>
              </ImageBackground>

              <View style={{}}>
                <Text style={{ color: "black" }}>Casual Dress</Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Cutomizable Dress
                </Text>
                <Text style={{ color: "black" }}>$256.24</Text>
              </View>
            </View>

            <View style={{ marginLeft: 5, marginTop: 10, marginBottom: 20 }}>
              <ImageBackground
                source={require("../img/9.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={{ width: 170, height: 160 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    style={{ color: "#2cb0f0" }}
                    size={15}
                  />
                </View>
              </ImageBackground>

              <View style={{}}>
                <Text style={{ color: "black" }}>Casual Dress</Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Cutomizable Dress
                </Text>
                <Text style={{ color: "black" }}>$256.24</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
