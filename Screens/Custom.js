import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Slideshow from "react-native-image-slider-show";
import Icon from "react-native-vector-icons/FontAwesome";
import Finish from "./Finish";
import Meaurments from "./Meaurments";
import Stuff from "./Stuff";
import Sty from "./Sty";

var f = require("../img/m1.jpg");
var s = require("../img/m2.jpg");
var l = require("../img/m4.jpg");
export default class Custom extends Component {
  constructor(props) {
    super(props);
    this.didBlurSubscription = "";
    this.state = {
      //Item: [],
      Item: [],
      Styles: true,
      Data: [],
      option: false,
      Meaurments: false,
      Stuff: false,
      Finish: false,
      activeStyle: false,
      activeStuff: false,
      activeMeaurments: false,
      activeFinish: false
    };
    // console.log(
    //   "data in custom ",
    //   props.navigation.getParam("CustomDetail", "NotFound")
    // );
    this.state = {
      position: 1,
      interval: true,
      RespoceData: null,

      CustomData: null,
      dataSource: [
        {
          title: "Mens Formal Dress",
          caption: "$299.20",
          url: f
        },
        {
          title: "Girls Formal Dress",
          caption: "$3925.0",
          url: l
        },
        {
          title: "Complete Formal Suit",
          caption: " $2475.02",
          url: s
        }
      ]
    };
  }
  componentWillMount() {
    this.setState({
      Styles: true
      //Finish: true
    });
  }
  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.setState(
          {
            Item: this.props.navigation.getParam("ItemsDetail", "NotFound")
          },
          () => {
            console.log("Item", this.state.Item);
          }
        );
        // console.log(
        //   "Product Detail Data",
        //   this.props.navigation.getParam("ItemsDetail", "NotFound")
        // );
      }
    );
  }
  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.setState({ option: true });
  }

  renderView = () => {
    let Item = this.props.navigation.getParam("ItemsDetail", "NotFound");

    if (this.state.Styles) {
      return <Sty styleProp={Item} />;
    } else if (this.state.Stuff) {
      return <Stuff styleProp={Item} />;
    } else if (this.state.Meaurments) {
      return <Meaurments Prop={this} styleProp={Item} />;
    } else if (this.state.Finish) {
      console.log("PASS ITEM TO FINISH", Item);
      return <Finish Prop={this} styleProp={Item} />;
    }
  };

  render() {
    return (
      <View
        style={{ backgroundColor: "white", flex: 1, backgroundColor: "white" }}
      >
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <ScrollView
          contentContainerStyle={{ backgroundColor: "white" }}
          showsVerticalScrollIndicator={false}
        >
          <Slideshow
            dataSource={this.state.dataSource}
            titleStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
            captionStyle={{ color: "white" }}
            height={200}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })}
            //  style={{ height: 400 }}
          />
          <View
            style={{
              alignSelf: "center",
              marginTop: 10,
              backgroundColor: "white"
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10
              }}
            >
              Customization Process
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",

              backgroundColor: "white"
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                  marginRight: 5,
                  marginTop: 5,
                  borderWidth: 2,
                  borderColor: this.state.Styles ? "#2cb0f0" : "#2cb0f0",
                  backgroundColor: this.state.Styles ? "#2cb0f0" : "white"
                }}
                onPress={() => {
                  this.setState({
                    Styles: true,
                    activeStyle: true,
                    //   option: false,
                    Meaurments: false,
                    Stuff: false,
                    Finish: false
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 18,

                    color: this.state.Styles ? "white" : "#2cb0f0",
                    fontWeight: this.state.Styles ? "bold" : "normal"
                  }}
                >
                  Styles
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: "grey",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  margin: 4,
                  borderWidth: 2,
                  borderColor: this.state.Stuff ? "#2cb0f0" : "#2cb0f0",
                  backgroundColor: this.state.Stuff ? "#2cb0f0" : "white"
                }}
                onPress={() => {
                  this.setState({
                    Styles: false,
                    Meaurments: false,
                    Stuff: true,
                    Finish: false
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: this.state.Stuff ? "white" : "#2cb0f0",
                    fontWeight: this.state.Stuff ? "bold" : "normal"
                  }}
                >
                  Stuff
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 120,
                  height: 40,
                  backgroundColor: "grey",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  margin: 4,
                  borderWidth: 2,
                  borderColor: this.state.Meaurments ? "#2cb0f0" : "#2cb0f0",
                  backgroundColor: this.state.Meaurments ? "#2cb0f0" : "white"
                }}
                onPress={() => {
                  this.setState({
                    Styles: false,
                    Meaurments: true,
                    Stuff: false,
                    Finish: false
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: this.state.Meaurments ? "white" : "#2cb0f0",
                    fontWeight: this.state.Meaurments ? "bold" : "normal"
                  }}
                >
                  Meaurements
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            height: 350,
            position: "absolute",
            bottom: 0,
            backgroundColor: "white"
            //opacity:0.5,
            //backgroundColor: "rgba(255,255,255,0.1)",
            //elevation:1
          }}
        >
          {this.renderView()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
