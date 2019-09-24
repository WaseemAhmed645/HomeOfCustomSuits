import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  AsyncStorage,
  StatusBar
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Left, Right, Header, Body } from "native-base";

width = Dimensions.get("window").width;
height = Dimensions.get("window").height;

export default class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      City: "",
      Address: "",
      ZipCode: "",
      Country: "",
      token: "",
      totalBill: this.props.navigation.getParam("Bill", "NotFound"),
      Products: this.props.navigation.getParam("Order", "NotFound"),
      customProduct: this.props.navigation.getParam("customItem", "NotFound"),
      isCustom: this.props.navigation.getParam("isCustom", false),
      ProductStyle: "",
      ProductStuff: "",
      ProductMeaurments: ""
    };
  }

  _storeData = async Total => {
    try {
      // filter.push(data)
      await AsyncStorage.setItem("TotalAmmount", JSON.stringify(Total));
      // console.log("ASynStorage",filter)
    } catch (error) {
      console.log("Error While Storage");
    }
  };

  _retrieveToken = async () => {
    const value = await AsyncStorage.getItem("accessToken");
    //let CartData
    if (value !== null) {
      console.log("Tken  F  ound");
      this.setState({ token: value });
      console.log("AcessTOkenofUser", value);
      console.log("this is the information of iscustom", this.state.isCustom);

      this.props.navigation.navigate("CheckOut", {
        isCustom: this.state.isCustom,
        customProduct: this.state.customProduct
      });
    } else {
      this.props.navigation.navigate("Login");
    }
  };
  _retrieveData = async () => {
    // const value = await AsyncStorage.getItem("accessToken");
    // //let CartData
    // if (value !== null) {
    //   console.log("Tken  F  ound");
    //   this.setState({ token: value });
    //   console.log("AcessTOkenofUser", value);
    //   this.props.navigation.navigate("CheckOut");
    // } else {
    //   this.props.navigation.navigate("Login");
    // }
    const ProductStyle = await AsyncStorage.getItem("StylesItem");
    const ProductStuff = await AsyncStorage.getItem("StuffItem");
    const ProductMeaurments = await AsyncStorage.getItem("MeaurmentItem");

    this.setState({
      ProductStuff: ProductStuff,
      ProductStyle: ProductStyle,
      ProductMeaurments: ProductMeaurments
    });
    // console.log("ColectedStyle", ProductStyle);
    // console.log("ColectedStuff", ProductStuff);
    // console.log("Collected:", ProductMeaurments);
  };
  componentDidMount() {
    this._retrieveToken();
    this._retrieveData();
  }

  onCityChange = text => {
    this.setState({ City: text });
  };
  onCountryChange = text => {
    this.setState({ Country: text });
  };
  onAddressChange = text => {
    this.setState({ Address: text });
  };
  onZipCodeChange = text => {
    this.setState({ ZipCode: text });
  };
  PostOrder = () => {
    let newOrder = null;
    let measurements = null;
    let fabric = null;
    let styles = [];
    let selectedStyles = null;
    let products = [];
    newOrder = {
      country: this.state.Country,
      city: this.state.City,
      zipCode: this.state.zipCode,
      address1: this.state.Address,
      // totalBill: this.state.totalBill,
      // products: this.state.Products,
      status: "pending"
    };
    var headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };

    if (this.state.isCustom) {
      measurements = JSON.parse(this.state.ProductMeaurments);
      fabric = JSON.parse(this.state.ProductStuff);
      selectedStyles = JSON.parse(this.state.ProductStyle);
      let customProduct = {
        _id: this.state.customProduct._id,
        productQuantity: "1",
        collar: measurements.collar,
        shoulder: measurements.shoulder,
        bicep: measurements.bicep,
        chest: measurements.chest,
        sleeves: measurements.sleeves,
        shirtLength: measurements.shirtLength,
        backLength: measurements.backLength,
        waist: measurements.waist,
        hip: measurements.hip,
        cuff: measurements.cuff,
        crotch: measurements.crotch,
        thigh: measurements.thigh,
        stomach: measurements.stomach,
        outSeam: measurements.outSeam,
        knee: measurements.knee,
        bottom: measurements.bottom,
        fabric: fabric.SelectStuff
      };
      // styles
      styles.push(
        selectedStyles[0].SelectCoatButton,
        selectedStyles[0].SelectCoatColar,
        selectedStyles[0].SelectCoatPocket,
        selectedStyles[0].SelectCoatVent,
        selectedStyles[0].SelectPantCuff,
        selectedStyles[0].SelectPantPleat,
        selectedStyles[0].SelectShirtButton,
        selectedStyles[0].SelectShirtColar,
        selectedStyles[0].SelectShirtPocket,
        selectedStyles[0].SelectShirtVent,
        selectedStyles[0].SelectVestButton,
        selectedStyles[0].SelectVestColar,
        selectedStyles[0].SelectVestPockit,
        selectedStyles[0].SelectVestVent
      );
      customProduct.styles = styles;
      products.push(customProduct);

      newOrder.isCustom = true;
      newOrder.totalBill = fabric.SelectStuff.fabricPrice;
      newOrder.products = products;
    } else if (this.state.isCustom == false) {
      newOrder.isCustom = false;
      newOrder.totalBill = this.state.totalBill;
      newOrder.products = this.state.Products;
    }
    console.log("custom order", newOrder);

    axios
      .post("http://198.245.53.50:3000/api/universal/order/place", newOrder, {
        headers: headers
      })
      .then(response => {
        AsyncStorage.removeItem("StylesItem");
        AsyncStorage.removeItem("StuffItem");
        AsyncStorage.removeItem("MeaurmentItem");
        AsyncStorage.removeItem("itemName");
        AsyncStorage.removeItem("");
        this.setState({
          isCustom: false
        });
        this._storeData(this.state.totalBill);
        console.log("paymentAmmount", this.state.totalBill);
        this.props.navigation.navigate("Payment", {
          Total: this.state.totalBill
        });

        console.warn("responce" + JSON.stringify(response));
      })
      .catch(error => {
        console.warn("error" + error);
      });
  };

  render() {
    // let obj={
    //   City:'',
    //   Address:"",
    //   ZipCode:""
    // }
    console.log("Iscustomdata:", this.state);
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <Header style={{ backgroundColor: "#2cb0f0" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <Icon name="arrow-left" size={20} style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body style={{ left: 70 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Check Out
            </Text>
          </Body>
          <Right style={{ left: 90 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyOrders")}
            >
              {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
             My Orders
            </Text> */}
            </TouchableOpacity>
          </Right>
          <Right />
        </Header>
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
          <ScrollView>
            <TouchableOpacity>
              <TextInput
                label="City"
                mode="outlined"
                editable="true"
                name="City"
                onChangeText={this.onCityChange}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.City}
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
                label="Country"
                mode="outlined"
                editable="true"
                name="Country"
                onChangeText={this.onCountryChange}
                value={this.state.Country}
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
                label="ZipCode"
                mode="outlined"
                keyboardType="numeric"
                editable="true"
                name="ZipCode"
                onChangeText={this.onZipCodeChange}
                value={this.state.ZipCode}
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
                label="Address"
                mode="outlined"
                editable="true"
                name="Address"
                onChangeText={this.onAddressChange}
                value={this.state.Address}
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
              //  onPress={() => this.props.navigation.navigate("Payment")}
              onPress={this.PostOrder}
            >
              <Text style={{ color: "white", fontSize: 15 }}>
                Continue To Payment
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
