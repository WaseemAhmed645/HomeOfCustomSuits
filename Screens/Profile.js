import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Header, Left, Right, Body, Title } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
width = Dimensions.get("window").width;
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.didBlurSubscription = "";
    this.state = {
      token: "",
      firstName: "",
      email: "",
      lastName: "",
      photoUrl: "",
      isloadingImage: true
    };
  }

  _retrieveToken = async () => {
    this.setState({
      isloadingImage: true
    });
    const value = await AsyncStorage.getItem("accessToken");
    //let CartData
    if (value !== null) {
      console.log("Tken  F  ound");
      this.setState({ token: value });
      axios
        .get("http://198.245.53.50:3000/api/current/customer", {
          headers: { Authorization: value }
        })
        .then(response => {
          console.log("UserResponce", response);
          this.setState({
            firstName: response.data.firstName,
            email: response.data.email,
            lastName: response.data.lastName,
            photoUrl: response.data.photoUrl,
            isloadingImage: false
          });
          //this.props.navigation.navigate("Payment")

          //  console.warn("responce"+JSON.stringify(response));
        })
        .catch(error => {
          // alert(error);
          console.warn("error" + error);
        });
    } else {
      this.props.navigation.navigate("Login2");
    }
  };

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        console.debug("didBlur", payload);
        this._retrieveToken();
      }
    );
  }
  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  _handleLogOut = () => {
    AsyncStorage.removeItem("accessToken");
    alert("You have been logged out.");
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar backgroundColor="#15a7ee" barStyle="light-content" />
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ backgroundColor: "white", flex: 1 }}>
              {/* <View
                style={{
                  height: 0.3,
                  borderWidth: 0.3,
                  borderColor: "white",
                  width: "100%"
                }}
              /> */}

              <Header
                style={{
                  backgroundColor: "#15a7ee"
                }}
              >
                <StatusBar backgroundColor="#15a7ee" barStyle="light-content" />

                <Left style={{ left: 40 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                      width: 200
                    }}
                  >
                    Profile
                  </Text>
                </Left>
              </Header>

              <View
                style={{
                  height: 0.5,
                  width: width,
                  borderWidth: 0.5,
                  borderColor: "grey"
                }}
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20
                }}
              >
                <Image
                  source={{ uri: this.state.photoUrl }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 80,
                    borderWidth: 2,
                    borderColor: "grey"
                  }}
                />
              </View>
              <View style={{ marginTop: 20, alignSelf: "center" }}>
                <Text>Name: {this.state.firstName}</Text>
                <Text>Email: {this.state.email}</Text>
              </View>
              {this.state.isloadingImage ? (
                <View
                  style={{
                    position: "absolute",
                    top: height / 2,
                    left: width / 2
                  }}
                >
                  <ActivityIndicator
                    style={{ alignSelf: "center" }}
                    size="large"
                    color="#38d68b"
                  />
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 60,
                  backgroundColor: "white"
                }}
              >
                <Icon1
                  name="user"
                  color="black"
                  size={30}
                  style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("EditProfile")}
                >
                  <View>
                    <Text style={styles.text}>Edit Profile </Text>
                    <Text style={styles.normalText}>
                      Edit Your Profile Here !
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 0.2,
                  width: width,
                  borderWidth: 0.2,
                  borderColor: "grey"
                }}
              />

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon2
                  name="list"
                  size={35}
                  style={{
                    marginLeft: 10,
                    marginRight: 8,
                    marginTop: 10,
                    color: "black"
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("MyOrders")}
                >
                  <View>
                    <Text style={styles.text}>Orders</Text>
                    <Text style={styles.normalText}>
                      Find out what's going on !
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 0.2,
                  width: width,
                  borderWidth: 0.2,
                  borderColor: "grey"
                }}
              />

              <View
                style={{
                  height: 0.2,
                  width: width,
                  borderWidth: 0.2,
                  borderColor: "grey"
                }}
              />
            </View>
            <TouchableOpacity onPress={this._handleLogOut}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Icon1
                  name="poweroff"
                  size={27}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    color: "black"
                  }}
                />
                <View>
                  <Text style={styles.text}>Logout</Text>
                  <Text style={styles.normalText}>For Logout !</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  headText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    margin: 15
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20,
    marginTop: 10
  },
  normalText: {
    color: "black",
    fontSize: 10,
    marginLeft: 20,
    marginTop: 8,
    marginBottom: 15
  }
});
