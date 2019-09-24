import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import Video from "react-native-video";
const { height } = Dimensions.get("window");

export default class Splash extends Component {
  render() {
    return (
      <View>
        <Video
          source={require("../Screens/suit.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={false}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
              marginTop: 30
            }}
          >
            Suit App
          </Text>
          <Text style={{ alignSelf: "center", marginTop: 5, color: "white" }}>
            Buy Products Or Customize Your Product
          </Text>
          <Image
            source={require("../img/icon.png")}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginTop: 180
            }}
          />
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 5
            }}
            onPress={() => this.props.navigation.navigate("HomeStackFull")}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Start Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
});
