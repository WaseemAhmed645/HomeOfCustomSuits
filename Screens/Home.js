import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  ToastAndroid
} from "react-native";
//import AsyncStorage from "react-native-community/async-storage"
import axios from "axios";
import Slideshow from "react-native-image-slider-show";
import Icon from "react-native-vector-icons/FontAwesome";
var f = require("../img/Home.jpg");
var s = require("../img/2.jpg");
var l = require("../img/3.jpg");
import { Left, Right } from "native-base";
let DataArray = [];
let localArray = [];
export default class Home extends Component {
  constructor(props) {
    super(props);
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
  componentDidMount() {
    axios
      .get("http://198.245.53.50:3000/api/universal/shop/products")
      .then(responce => {
        // console.log(responce);
        this.setState({ RespoceData: responce });
      })
      .catch(err => console.warn("catch", err));

    axios
      .get("http://198.245.53.50:3000/api/universal/custom/products")
      .then(responce => {
        console.log("Custome", responce);
        this.setState({ CustomData: responce });
      })
      .catch(err => console.log("catch", err));
  }

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

  
  _storeData = async product => {
    localArray = await AsyncStorage.getItem("itemName");
    localArray = JSON.parse(localArray);

    if (localArray) {
      //  console.warn("in if case")
      const foundIndex = localArray.findIndex(pro => pro._id === product._id);
      if (foundIndex > 0 || foundIndex === 0) {
        //console.warn("in found index case")

        localArray[foundIndex].productQuantity =
          localArray[foundIndex].productQuantity + 1;
        await AsyncStorage.setItem("itemName", JSON.stringify(localArray));
      } else {
        //console.warn("in found index case")

        product.productQuantity = 1;
        localArray.push(product);
        await AsyncStorage.setItem("itemName", JSON.stringify(localArray));
      }
    } else {
      localArray1 = [];
      product.productQuantity = 1;
      localArray1.push(product);
      await AsyncStorage.setItem("itemName", JSON.stringify(localArray1));
    }
    ToastAndroid.show("Product Sucessfully Added", ToastAndroid.SHORT);
  };

  
 

  render() {
    let Products = null;
    let NewArrival = null;
    let CustomProducts = null;
    let haveDiscount = null;

    if (this.state.RespoceData == null) {
      NewArrival = (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="#2cb0f0" size={15} />
        </View>
      );
    } else {
      NewArrival =this.state.RespoceData.data;
      NewArrival = NewArrival.filter(item=>item.isAccessory===false);
      NewArrival = NewArrival.filter(item =>item.haveDiscount===false)
      NewArrival = NewArrival.sort(function(a, b) {
        var dateA = new Date(a.date),
        dateB = new Date(b.date);
        return dateB - dateA;
        });
      NewArrival = NewArrival.map(product => (
        <View
          key={product._id}
          style={{ marginLeft: 10, marginTop: 10, width: 150 }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ProductDetail", {
                DetailData: product
              })
            }
          >
            <ImageBackground
              source={{ uri: product.photoUrl[0].split(",")[0] }}
              imageStyle={{ borderRadius: 10 }}
              style={{ width: 150, height: 150 }}
            >
              <Right style={{ left: 50, marginTop: 10 }}>
                <TouchableOpacity onPress={this._storeData.bind(this, product)}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "rgba(255,255,255,0.6)",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="shopping-bag"
                      size={15}
                      style={{ color: "#2cb0f0" }}
                    />
                  </View>
                </TouchableOpacity>
              </Right>
              <View
                style={{
                  width: 40,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <Text style={{ color: "white" }}>New</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{ justifyContent: "space-around", paddingRight: 10 }}>
            <Text
              style={{ color: "black", fontSize: 14 }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {product.name}
            </Text>
            <Text style={{ color: "black" }}>Price: ${product.price}</Text>
          </View>
        </View>
      ));
      // console.log("Products Container",Products)
    }

    //console.log("After fetch  data from responce",this.state.RespoceData);
    if (this.state.RespoceData == null) {
      Products = (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="#2cb0f0" size={15} />
        </View>
      );
    } else {
      Products =this.state.RespoceData.data;
      Products = Products.filter(item=>item.isAccessory===false);
      Products = Products.filter(item =>item.haveDiscount===false)
      
      Products = Products.map(product => (
        <View
          key={product._id}
          style={{ marginLeft: 10, marginTop: 10, width: 150 }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ProductDetail", {
                DetailData: product
              })
            }
          >
            <ImageBackground
              source={{ uri: product.photoUrl[0].split(",")[0] }}
              imageStyle={{ borderRadius: 10 }}
              style={{ width: 150, height: 150 }}
            >
              <Right style={{ left: 50, marginTop: 10 }}>
                <TouchableOpacity onPress={this._storeData.bind(this, product)}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "rgba(255,255,255,0.6)",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="shopping-bag"
                      size={15}
                      style={{ color: "#2cb0f0" }}
                    />
                  </View>
                </TouchableOpacity>
              </Right>
              <View
                style={{
                  width: 40,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <Text style={{ color: "white" }}>New</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{ justifyContent: "space-around", paddingRight: 10 }}>
            <Text
              style={{ color: "black", fontSize: 14 }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {product.name}
            </Text>
            <Text style={{ color: "black" }}>Price: ${product.price}</Text>
          </View>
        </View>
      ));
      // console.log("Products Container",Products)
    }

    if (this.state.RespoceData == null) {
      haveDiscount = (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="#2cb0f0" size={15} />
        </View>
      );
    } else {
      haveDiscount =this.state.RespoceData.data;
      haveDiscount =  haveDiscount.filter(item =>item.haveDiscount===true)
      haveDiscount =  haveDiscount.map(product => (
        <View
          key={product._id}
          style={{ marginTop:10,marginLeft: 5, width: 400,flexDirection:"row",marginRight:10 ,borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:5}}
        >
          <TouchableOpacity
          style={{flexDirection:"row"}}
            onPress={() =>
              this.props.navigation.navigate("ProductDetail", {
                DetailData: product
              })
            }
          >
          <View style={{margin:1,backgroundColor:"white",width:"40%",height:150,justifyContent:"center",alignItems:"center"}}>
          <View style={{flexDirection:"row"}}>
          <Text style={{fontSize:20,marginRight:5,fontWeight:"bold",color:"#2cb0f0"}}>{product.discount} %</Text>
          <Text>OFF</Text>
          </View>
          
            <Text style={{fontSize:12}}>{product.name}</Text>
            <Text>Price: ${product.price}</Text>
            
          </View>
            <ImageBackground
              source={{ uri: product.photoUrl[0].split(",")[0] }}
              imageStyle={{}}
              style={{ width: "70.2%", height: 152 }}
            >
              <Right style={{ left: 25, paddingTop: 10 }}>
                <TouchableOpacity onPress={this._storeData.bind(this, product)}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "rgba(255,255,255,0.6)",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="shopping-bag"
                      size={15}
                      style={{ color: "#2cb0f0" }}
                    />
                  </View>
                </TouchableOpacity>
              </Right>
              {/* <View
                style={{
                  width: "100%",
                  height: "50%",
                 // borderRadius: 10,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  justifyContent: "center",
                  alignItems: "center",
                 // margin: 10
                }}
              >
                <Text style={{ color: "white" }}>New</Text>
              </View> */}
            </ImageBackground>
          </TouchableOpacity>
          {/* <View style={{ justifyContent: "space-around", paddingRight: 10 }}>
            <Text
              style={{ color: "black", fontSize: 14 }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {product.name}
            </Text>
            <Text style={{ color: "black" }}>Price:{product.price}</Text>
          </View> */}
        </View>
      ));
      // console.log("Products Container",Products)
    }





    if (this.state.CustomData == null) {
      CustomProducts = (
        <View>
          <ActivityIndicator color="#2cb0f0" size={15} />
        </View>
      );
    } else {
      CustomProducts = this.state.CustomData.data.map(CustomProduct => (
        <View
          key={CustomProduct._id}
          style={{ marginLeft: 10, marginTop: 10, width: 150 }}
        >
          <TouchableOpacity
          style={{}}
            onPress={() =>
              this.props.navigation.navigate("CutomizeDetail", {
                CustomDetail: CustomProduct
              })
            }
          >
            <ImageBackground
              source={{ uri: CustomProduct.photoUrl[0].split(",")[0] }}
              imageStyle={{ borderRadius: 10 }}
              style={{ width: 150, height: 150 }}
            >
              <Right style={{ left: 50, marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("CutomizeDetail")
                  }
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "rgba(255,255,255,0.6)",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon name="cut" size={15} style={{ color: "#2cb0f0" }} />
                  </View>
                </TouchableOpacity>
              </Right>
              <View
                style={{
                  width: 40,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <Text style={{ color: "white" }}>New</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{}}>
            <Text
              style={{ color: "black", fontSize: 14 }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {CustomProduct.name}
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
              {CustomProduct.productType}
            </Text>
            <Text style={{ color: "black" }}>Price: ${CustomProduct.price}</Text>
          </View>
        </View>
      ));
      // console.log("Products Container",Products)
    }

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Slideshow
            dataSource={this.state.dataSource}
            titleStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
            captionStyle={{ color: "white" }}
            height={500}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })}
            //  style={{ height: 400 }}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Left style={{ left: 10 }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
              >
                New Arrivals
              </Text>
            </Left>
            <Right style={{ right: 10 }}>
              <Text>Show all</Text>
            </Right>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {NewArrival}
            </View>
          </ScrollView>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Left style={{ left: 10 }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
              >
              You may also like 
              </Text>
            </Left>
            <Right style={{ right: 10 }}>
              <Text>Show all</Text>
            </Right>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {Products}
          
            </View>
          </ScrollView>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Left style={{ left: 10 }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
              >
             Offers
              </Text>
            </Left>
            <Right style={{ right: 10 }}>
              <Text>Show all</Text>
            </Right>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {haveDiscount}
            </View>
          </ScrollView>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Left style={{ left: 10 }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
              >
                Customize Products
              </Text>
            </Left>
            <Right style={{ right: 10 }}>
              <Text>Show all</Text>
            </Right>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {CustomProducts}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
