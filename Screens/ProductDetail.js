import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Picker,
  StatusBar,AsyncStorage,ToastAndroid
} from "react-native";
import { Left, Right } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
export default class ProductDetail extends Component {
  _storeData = async (product) => {
   
    localArray = await AsyncStorage.getItem('itemName')
    localArray = JSON.parse(localArray)

    if (localArray) {
    //  console.warn("in if case")
      const foundIndex = localArray.findIndex(pro => pro._id === product._id);
      if (foundIndex > 0 || foundIndex === 0) {
      //console.warn("in found index case")

        localArray[foundIndex].productQuantity = localArray[foundIndex].productQuantity + 1;
        await AsyncStorage.setItem('itemName', JSON.stringify(localArray))
      } else {
        //console.warn("in found index case")

        product.productQuantity = 1;
        localArray.push(product);
        await AsyncStorage.setItem('itemName', JSON.stringify(localArray))
      }
    } else {
      localArray1 = [];
      product.productQuantity = 1;
      localArray1.push(product);
      await AsyncStorage.setItem('itemName', JSON.stringify(localArray1))
    }
    ToastAndroid.show("Product Sucessfully Added",ToastAndroid.SHORT)
  };
  constructor(props) {
    super(props);
    this.state={
      Detail:props.navigation.getParam("DetailData","NotFound")
      // props.navigation.state.params("DetailData","NotFound")
    }
    
  }
  componentDidMount(){
    console.log("Product Detail",this.state.Detail)
  }
  state = { user: "",color:"" };
  updateUser = user => {
    this.setState({ user: user });
  };
  UpdateColor = color => {
    this.setState({ color: color });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <ImageBackground   source={{uri:this.state.Detail.photoUrl[0].split(",")[0]}} style={{ flex: 1 }}>
        
          {/* <View
            style={{
              width: "100%",
              height: 300,
              position: "absolute",
              bottom: 0,
                backgroundColor:'black',
             opacity:0.5,
              //backgroundColor: "rgba(255,255,255,0.1)",
           elevation:1
            }}
          > */}
          <ImageBackground source={require("../img/detail.png")} style={{width:'100%',height:250,position:'absolute',bottom:0}} >
            <View style={{ flexDirection: "row", marginTop: 10}}>
              <Left style={{ left: 10 }}>
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
                >
                {this.state.Detail.name}
                </Text>
              </Left>
              <Right style={{ right: 20, color: "white" }}>
                <Text style={{color: "white"}}> Price: {this.state.Detail.price}</Text>
              </Right>
            </View>

      

            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Left style={{ left: 10, flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ backgroundColor: "white", borderRadius: 30 }}
                >
                  <Picker
                    selectedValue={this.state.user}
                    onValueChange={this.updateUser}
                    style={{ width: 120 }}
                  >
                    <Picker.Item label="Small" value="S" />
                    <Picker.Item label="Medium" value="M" />
                    <Picker.Item label="Large" value="L" />
                  </Picker>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
                    marginLeft: 15
                  }}
                >
                  <Picker
                    selectedValue={this.state.color}
                    onValueChange={this.UpdateColor}
                    style={{ width: 120 }}
                  >
                    <Picker.Item label="Red" value="Red" />
                    <Picker.Item label="Greem" value="Green" />
                    <Picker.Item label="Aqua" value="Aqua" />
                  </Picker>
                </TouchableOpacity>
              </Left>
              <Right style={{ right: 20 }}>
                <TouchableOpacity
                 onPress={this._storeData.bind(this,this.state.Detail)}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="shopping-bag"
                      size={20}
                      style={{ color: "#2cb0f0" }}
                    />
                  </View>
                </TouchableOpacity>
              </Right>
            </View>
            <View style={{ flexDirection: "row",opacity:5 }}>
              <Left>
                <Text
                  style={{
                    textAlign: "justify",
                    color: "#f0f0f0",
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 20
                  }}
                >
                  These are just sample Terms & Condition texts. You should seek
                  professional legal advice before using the texts.These are
                  just sample Terms 
                </Text>
              </Left>
            </View>
            </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
