import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid
} from "react-native";

export default class Stuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Styles: false,
      SelectStuff: {}
    };
  }
  onSelectStuff(value) {
    this.setState(
      {
        SelectStuff: value
      },
      () => {
        console.log("FAbric", this.state.SelectStuff._id);
      }
    );
  }
  _storeData = async product => {
    let Stuff = "";
    try {
      Stuff = product;
      await AsyncStorage.setItem("StuffItem", JSON.stringify(Stuff));
      console.log("ASynStorage STyles Data:", Stuff);
    } catch (error) {
      console.log("Error While Storage", error);
    }
    ToastAndroid.show("Selected", ToastAndroid.SHORT);
  };
  render() {
    let Fabrics = [];
    Fabrics = this.props.styleProp.fabric;
    let Products = <View />;
    if (Fabrics.length === 0) {
      Products = (
        <View>
          <Text>Empty Fabric</Text>
        </View>
      );
    } else {
      Products = Fabrics.map(product => (
        <View key={product._id}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.onSelectStuff(product);
                this._storeData(this.state);
              }}
            >
              <Image
                source={{ uri: product.fabricPhotoUrl }}
                style={{
                  width: 150,
                  height: 150,
                  margin: 4,
                  borderRadius: 5,
                  borderColor:
                    this.state.SelectStuff._id == product._id
                      ? "#2cb0f0"
                      : "grey",
                  borderWidth: this.state.SelectStuff._id == product._id ? 4 : 1
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ));
    }
    console.log("Fabrics Here in Render", Fabrics);

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          {Products}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
