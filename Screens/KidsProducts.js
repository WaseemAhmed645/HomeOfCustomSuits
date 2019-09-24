import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,ActivityIndicator,AsyncStorage,ToastAndroid
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios"
import { Left, Right, Header, Body } from "native-base";
import { FlatGrid } from 'react-native-super-grid';
export default class KidsProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: true,
      RespoceData:null,
      CustomData:null,
      Mens:[]
    }
    
  }
  
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
  componentDidMount(){
    axios.get("http://198.245.53.50:3000/api/universal/shop/products").then(responce=>{
     // console.log(responce);    
  this.setState({RespoceData:responce})
  this.setState({Mens:this.state.RespoceData.data.filter(product=>product.category.name == "Kids")})
  }
  ).catch(err=>console.warn("catch",err))
  }
 
  render() {
    //let Mens = null;
    let Products = null
    let CustomProducts =null

//console.log("After fetch  data from responce",this.state.RespoceData);
if(this.state.RespoceData==null){
  Products=<View style={{justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator color="#2cb0f0" size={15} />
 </View>
}else{
 
 // Mens = 
  //console.log(this.state.Mens)
  // Products=this.state.Mens.map(product=>(
  //   <View key={product._id} style={{ marginLeft: 10, marginTop: 10,width:150 }}>
  //   <TouchableOpacity
  //     onPress={() =>
  //       this.props.navigation.navigate("ProductDetail",{DetailData:product})
  //     }
  //   >
  //     <ImageBackground
  //       source={{uri:product.photoUrl[0].split(",")[0]}}
  //       imageStyle={{ borderRadius: 10 }}
  //       style={{ width: 150, height: 150 }}
  //     >
  //       <Right style={{ left: 50, marginTop: 10 }}>
  //       <TouchableOpacity 
  //           onPress={this._storeData.bind(this,product)}
  //           >
  //         <View
  //           style={{
  //             width: 30,
  //             height: 30,
  //             borderRadius: 15,
  //             backgroundColor: "rgba(255,255,255,0.6)",
  //             justifyContent: "center",
  //             alignItems: "center"
  //           }}
  //         >
            
  //           <Icon
  //            name="shopping-bag"
  //             size={15}
  //             style={{ color:"#2cb0f0" }}
  //           />
          
  //         </View>
  //         </TouchableOpacity>
  //       </Right>
  //       <View
  //         style={{
  //           width: 40,
  //           height: 20,
  //           borderRadius: 10,
  //           backgroundColor: "rgba(255,255,255,0.6)",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           margin: 10
  //         }}
  //       >
  //         <Text style={{ color: "white" }}>New</Text>
  //       </View>
  //     </ImageBackground>
  //   </TouchableOpacity>
  //   <View style={{justifyContent:'space-around',paddingRight:10}}>
  //     <Text style={{ color: "black",fontSize:14}} ellipsizeMode="tail"
  //                 numberOfLines={2} >{product.name}</Text>
  //     <Text style={{ color: "black" }}>Price:{product.price}</Text>
  //   </View>
  // </View>
  
  
  // ));
  // console.log("Products Container",Products)
}
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <FlatGrid
        itemDimension={130}
        items={this.state.Mens} 
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <View key={item._id} style={{ marginLeft: 10, marginTop: 10,width:150 }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ShopProductDetail",{DetailData:item})
            }
          >
            <ImageBackground
              source={{uri:item.photoUrl[0].split(",")[0]}}
              imageStyle={{ borderRadius: 10 }}
              style={{ width: 150, height: 150 }}
            >
              <Right style={{ left: 50, marginTop: 10 }}>
              <TouchableOpacity 
                  onPress={this._storeData.bind(this,item)}
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
                  
                  <Icon
                   name="shopping-bag"
                    size={15}
                    style={{ color:"#2cb0f0" }}
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
          <View style={{justifyContent:'space-around',paddingRight:10}}>
            <Text style={{ color: "black",fontSize:14}} ellipsizeMode="tail"
                        numberOfLines={2} >{item.name}</Text>
            <Text style={{ color: "black" }}>Price:{item.price}</Text>
          </View>
        </View>
        
        )}
        />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({});
