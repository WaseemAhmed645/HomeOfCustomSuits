import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Picker,
  ScrollView,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Left, Right, Header, Body } from "native-base";

export default class MyOrders extends Component {
  state = { RespoceData: null, token: null };
  _retrieveToken = async () => {
    const value = await AsyncStorage.getItem("accessToken");
    var token = value;

    var decoded = jwt_decode(token);
    console.log("Decoded Token", decoded);

    axios
      .get(`http://198.245.53.50:3000/api/universal/orders/${decoded.id}`)
      .then(responce => {
        //  console.warn(responce);
        this.setState({ RespoceData: responce });
      })
      .catch(err => console.log("catch", err));
    //   if (value !== null) {
    //     //this.props.navigation.navigate("CheckOut",{Order:this.state.Cart,Bill:total})
    //    // console.log("AcessTOkenofUser",value);
    //   }else{
    //     this.props.navigation.navigate("Login")
    //   }
    // } catch (error) {
    //  // console.log("Error while getting acces token")
    //   // Error retrieving data
    //}
  };

  componentDidMount() {
    this._retrieveToken();

    // return decoded;
    //let CartData
    //  console.log("tokenid ",this.state.tokenId)
    // 5cb70e4627830a1f6c92867f
    //   axios.get("http://198.245.53.50:3000/api/universal/orders/5cb70e4627830a1f6c92867f").then(responce=>{
    //     console.warn(responce);
    // this.setState({RespoceData:responce})
    // }
    // ).catch(err=>console.warn("catch",err))
  }
  render() {
    let nonCustomArray = null;
    let CustomArray = null;
    let Products = null;
    let CustomProducts = null;

    //console.log("After fetch  data from responce",this.state.RespoceData);
    if (this.state.RespoceData == null) {
      Products = (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="#2cb0f0" size={15} />
        </View>
      );
    } else {
      nonCustomArray = this.state.RespoceData.data;
      // .filter(
      //   pro => pro.isCustom == false
      // );
      CustomArray = this.state.RespoceData.data;
      // .filter(
      //   pro => pro.isCustom == true
      // );
      console.log("nonCustomArray length" + nonCustomArray.length);
      nonCustomArray.sort(function(a, b) {
        var dateA = new Date(a.date),
          dateB = new Date(b.date);
        return dateB - dateA;
      });
      CustomArray.sort(function(a, b) {
        var dateA = new Date(a.date),
          dateB = new Date(b.date);
        return dateB - dateA;
      });
      Products = CustomArray.map(pro => (
        <View>
          <View
            key={pro._id}
            style={{
              margin: 10,
              backgroundColor: "white",
              elevation: 2,
              width: "90%",
              height: 90,
              alignSelf: "center",
              justifyContent: "flex-start"
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 12,
                marginLeft: 10,
                marginTop: 10
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              OrderType : {pro.isCustom ? "custom" : "nonCustom"}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                marginLeft: 10,
                marginTop: 10
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              Total Ammount: $ {pro.totalBill}
            </Text>
            <Text style={{ color: "black", marginLeft: 10, fontSize: 12 }}>
              Time: {moment(pro.date).format("MMMM D, YYYY")}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey", marginLeft: 10, fontSize: 12 }}>
                Status: {pro.status}
              </Text>
              <Right style={{ right: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("OrderDetail", {
                      OrderProduct: pro
                    })
                  }
                >
                  <Text style={{ color: "#2cb0f0", marginBottom: 15 }}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </Right>
            </View>
          </View>
          <View
            style={{
              width: 2,
              backgroundColor: "#cac9c9",
              width: "80%",
              alignSelf: "center",
              height: 2,
              margin: 5
            }}
          />
        </View>
      ));
    }
    return (
      <View>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <Header style={{ backgroundColor: "#2cb0f0" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("{Profile}")}
            >
              <Icon name="arrow-left" size={20} style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body style={{ left: 70 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              My Orders
            </Text>
          </Body>

          <Right />
        </Header>
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={styles.contentContainer}
        >
          {Products}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 40
  }
});
