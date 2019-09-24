import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Picker,
  ScrollView,
  TextInput,
  FlatList,
  StatusBar,ImageBackground,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { Left, Right, Header, Body } from "native-base";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.didBlurSubscription = "";
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      (obj) => {console.log("HomeScreen didFocus start")}
      );
    
  }
  state = {
    user: "",
    Cart: [],
    filter: "",
    Account: 1,
    totalbill: 0,
    QTY: 1
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("itemName");
      let CartData;
      if (value !== null) {
        // We have data!!
        CartData = JSON.parse(value);
        this.setState({ Cart: CartData });
        console.log(CartData);
      } else {
        this.setState({ Cart: null });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _retrieveToken = async total => {
    const value = await AsyncStorage.getItem("accessToken");
    //let CartData
    if (value !== null) {
      console.log("Tken  F  ound");
      this.props.navigation.navigate("CheckOut", {
        Order: this.state.Cart,
        Bill: total
      });
      // console.log("AcessTOkenofUser",value);
    } else {
      this.props.navigation.navigate("CartLogin");
    }
  };

  componentDidMount() {
    axios
    .get("http://198.245.53.50:3000/api/universal/shop/products")
    .then(responce => {
     console.log(responce);
      this.setState({ RespoceData: responce });
    })
    .catch(err => console.warn("catch", err));
    this.didBlurSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        console.debug("didBlur", payload);
        this._retrieveData();
      }
    );
  }
  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  updateUser = user => {
    this.setState({ user: user });
  };
  dlt = data => {
    console.log("Delete Data", data);
    var item = this.state.Cart;
    console.log("Item for delee", item);
    console.log("Keys", AsyncStorage.getAllKeys());
    AsyncStorage.removeItem("itemName");
    var Arrays = item.filter(value => {
      return value._id !== data._id;
    });
    this.setState({ Cart: Arrays });
    this._storeData(Arrays);
    // item.forEach(element => {
    //   if(data._id==element._id){
    //     const result = words.filter(word => word.length > 6);
    // AsyncStorage.removeItem(data.id)

    //   }
    // });
  };
  _storeData = async data => {
    try {
      // filter.push(data)
      await AsyncStorage.setItem("itemName", JSON.stringify(data));
      // console.log("ASynStorage",filter)
    } catch (error) {
      console.log("Error While Storage");
    }
  };

  _handleMinus = pro => {
    var value = parseInt(pro.productQuantity) - 1;
    pro["productQuantity"] = value.toString();
    this.setState({
      test: ""
    });

    //  this.render();
    //  alert(JSON.stringify(this.state.Cart));
    console.log("CART", this.state.Cart);
  };
  _handlePlus = pro => {
    var value = parseInt(pro.productQuantity) + 1;
    pro["productQuantity"] = value.toString();
    this.setState({
      test: ""
    });
    // this.render();
    // alert(JSON.stringify(this.state.Cart));
  };
  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item }) => (
    <View key={item._id}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: item.photoUrl[0].split(",")[0] }}
          style={{ width: 60, height: 60, borderRadius: 3, margin: 5 }}
        />
        <View style={{ marginTop: 5 }}>
          <Text
            style={{ color: "black", fontSize: 14 }}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text style={{ color: "black" }}>Price: {item.price}</Text>
          {/* <Text style={{ color: "black" }}>Qty: {item.productQuantity}</Text> */}
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Size: {item.size}</Text>
            <Text style={{ color: "grey", marginLeft: 10 }}>
              {/* Color:{pro.color} */}
            </Text>
          </View>
        </View>
        <Right>
          <TouchableOpacity
            onPress={() => {
              this.dlt(item);
            }}
          >
            <Icon1 name="cross" size={20} style={{ margin: 3, right: 10 }} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <TouchableOpacity onPress={() => this._handleMinus(item)}>
              <Icon2 name="minus" size={17} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>{item.productQuantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._handlePlus(item)}>
              <Icon2 name="plus" size={18} />
            </TouchableOpacity>
          </View>
        </Right>
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
  );
  render() {
    let total = 0;
    let OverAll = 0;
    console.log("this is a saved data", this.state.Cart);
    let Products = "";
   let Accessories= null;

   if (this.state.RespoceData == null) {
    Accessories = (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#2cb0f0" size={15} />
      </View>
    );
  } else {
    Accessories =this.state.RespoceData.data;
    Accessories = Accessories.filter(item=>item.isAccessory===true);
    
    Accessories = Accessories.map(product => (
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
            style={{ width: 100, height: 100 }}
          >
            <Right style={{ left: 25, marginTop: 4 }}>
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
            </View> */}
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










    if (this.state.Cart == null) {
      Products = (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50
          }}
        >
          <Text>Empty Cart</Text>
          {/* <ActivityIndicator color="#2cb0f0" size={15} /> */}
        </View>
      );
    } else {
      if (this.state.Cart && this.state.Cart.length <= 0) {
        Products = (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50
            }}
          >
            <Text>Empty Cart</Text>
          </View>
        );
      } else {
        //     return(
        //     <FlatList
        //   data={this.state.Cart}
        //   extraData={this.state}
        //   keyExtractor={this._keyExtractor}
        //   renderItem={this._renderItem}
        // />
        //     )
        Products = this.state.Cart.map(
          pro => (
            (total += pro.price * pro.productQuantity),
            (
              <View key={pro._id}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: pro.photoUrl[0].split(",")[0] }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      margin: 5
                    }}
                  />
                  <View style={{ marginTop: 5 }}>
                    <Text
                      style={{ color: "black", fontSize: 14 }}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {pro.name}
                    </Text>
                    <Text style={{ color: "black" }}>Price: {pro.price}</Text>
                    {/* <Text style={{ color: "black" }}>Qty: {pro.productQuantity}</Text> */}
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "grey" }}>Size: {pro.size}</Text>
                      <Text style={{ color: "grey", marginLeft: 10 }}>
                        {/* Color:{pro.color} */}
                      </Text>
                    </View>
                  </View>
                  <Right>
                    <TouchableOpacity
                      onPress={() => {
                        this.dlt(pro);
                      }}
                    >
                      <Icon1
                        name="cross"
                        size={20}
                        style={{ margin: 3, right: 10 }}
                      />
                    </TouchableOpacity>
                    {/* <Picker
              selectedValue={this.state.user}
              onValueChange={(itemValue, itemIndex) =>{
                
                // this.setState({Account: parseInt(itemValue)},()=>{
                // //  alert(this.state.Account)
                  
                // })
                pro.productQuantity = itemValue,

                

               this.state.QTY=itemValue
                // alert(itemValue)
              }
    
            }
              style={{ width: 50 }}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker> */}
                    <View style={{ flexDirection: "row", marginRight: 10 }}>
                      <TouchableOpacity onPress={() => this._handleMinus(pro)}>
                        <Icon2
                          name="minus"
                          size={15}
                          style={{ marginTop: 3 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 15,
                            marginBottom: 3,
                            marginLeft: 3,
                            marginRight: 3
                          }}
                        >
                          {pro.productQuantity}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._handlePlus(pro)}>
                        <Icon2
                          name="plus"
                          size={12}
                          style={{ marginTop: 5, fontWeight: "bold" }}
                        />
                      </TouchableOpacity>
                    </View>
                  </Right>
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
            )
          )
        );
      }
      // console.log("pros Container",pros)
    }

    return (
      <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.0)" }}>
        <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
        <Header style={{ backgroundColor: "#2cb0f0" }}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-left" size={20} style={{ color: "white" }} />
            </TouchableOpacity>
          </Left>
          <Body style={{ left: 70 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              My Cart
            </Text>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 300,
            elevation: 1
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {Products}
          </ScrollView>
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Left style={{ left: 10,marginTop:10 }}>
            <TextInput
            placeholder="PromoCode"
           style={{height: 40,width:150, borderColor: 'gray', textAlign:'center',borderWidth: 1,borderRadius:25}}
         // onChangeText={(text) => this.setState({input: text})}
        />
            </Left>
            <Right style={{ right: 10 ,marginTop:10}}>
          <TouchableOpacity style={{justifyContent:'center',alignItems:"center",width:100,height:40,borderRadius:25,backgroundColor:'#2cb0f0'}}>
            <Text style={{fontSize:15,fontFamily:"",color:"white"}}>Apply</Text>
          </TouchableOpacity>
            </Right>
          </View>
          <View
            style={{ backgroundColor: "white", height: 300, marginTop: 10 }}
          >
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Left style={{ left: 10 }}>
                <Text style={{ fontSize: 14 }}>Total ammount</Text>
              </Left>
              <Right style={{ right: 20 }}>
                <Text
                  style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
                >
                  $: {total * this.state.Account}
                </Text>
              </Right>
            </View>
            <View>
              <Text style={{fontSize:15,marginLeft:10,marginTop:10,marginBottom:10,color:'black',fontWeight:"bold",fontFamily:""}}>Accessories</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {Accessories}
            </View>
          </ScrollView>
          <TouchableOpacity
              disabled={
                this.state.Cart && this.state.Cart.length > 0 ? false : true
              }
              style={{
                width: 250,
                height: 40,
                borderRadius: 30,
                backgroundColor: "#2cb0f0",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                bottom:10,
              }}
              onPress={
                () => this._retrieveToken(total)
                //this.props.navigation.navigate("CheckOut", {Order:this.state.Cart,Bill:total})
              }
            >
              <Text style={{ color: "white", fontSize: 15 }}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
