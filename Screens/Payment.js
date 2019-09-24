import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Slideshow from "react-native-image-slider-show";
import { Left, Right, Header, Body } from "native-base";
import { SQIPCore, SQIPCardEntry } from "react-native-square-in-app-payments";

width = Dimensions.get("window").width;
height = Dimensions.get("window").height;

var f = require("../img/44.jpg");

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      payment: this.props.navigation.getParam("Total", "NotFound"),
      interval: true,
      dataSource: [
        {
          url: f
        }
      ]
    };
  }
  async componentDidMount() {
    await SQIPCore.setSquareApplicationId(
      "sandbox-sq0idp-mk0inQl7RPjZg5Nq8pdt8Q"
    );
    _retrieveData();
    // console.log(
    //   "Totalammount",
    //   this.props.navigation.getParam("TotalBill", "NotFound")
    // );
  }
  _retrieveData = async () => {
    const TotalAmmount = await AsyncStorage.getItem("TotalAmmount");
    this.setState({ payment: TotalAmmount }, () => {
      console.log("total ammount for payment", this.state.payment);
    });
  };
  onCardEntryComplete = () => {
    // Update UI to notify user that the payment flow is completed
    this.props.navigation.navigate("Thanks");
  };

  onCardNonceRequestSuccess = async cardDetails => {
    try {
      // take payment with the card details
      // await chargeCard(cardDetails);

      await fetch(
        `http://198.245.53.50:3000/api/process-payment/${this.state.payment}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
          // body: JSON.stringify({
          //   nonce: cardDetails.nonce,
          //   item: this.state.cartItem.item_data,
          //   customer: this.state.customer
          // })
        }
      ).then(resp => {
        console.log(resp), alert("success" + resp);
        console.log("Total ammount of paymment is:", this.state.payment);
        // this.onCardEntryComplete();
      });

      // payment finished successfully
      // you must call this method to close card entry
      console.log(cardDetails);
      await SQIPCardEntry.completeCardEntry(this.onCardEntryComplete);
    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  };

  onCardEntryCancel() {
    // Handle the cancel callback
  }
  onStartCardEntry = async () => {
    const cardEntryConfig = {
      collectPostalCode: true
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      this.onCardNonceRequestSuccess,
      this.onCardEntryCancel
    );
  };
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <Header style={{ backgroundColor: "#2cb0f0" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-left" size={20} style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body style={{ left: 50 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Payment Here
            </Text>
          </Body>
          <Right />
        </Header>

        <Slideshow
          dataSource={this.state.dataSource}
          titleStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
          captionStyle={{ color: "white" }}
          height={200}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })}
          style={{ elevation: 2 }}
        />
        <Text style={{ margin: 20, alignSelf: "center" }}>
          {" "}
          Or CheckOut With{" "}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-evenly",
            marginTop: 30
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#cac9c9"
            }}
          >
            <Image
              source={require("../img/11.png")}
              style={{
                width: 100,
                height: 50,
                borderRadius: 20
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
            marginTop: 40
          }}
          // onPress={this.onStartCardEntry}
          onPress={() => this.onStartCardEntry()}
          // onPress={() => this.props.navigation.navigate("Thanks")}
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            Pay $ {this.state.payment}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
