import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
var ImagePicker = require("react-native-image-picker");
import { TextInput } from "react-native-paper";
import axios from "axios";
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.state = {
      filePath: {},
      Token: null,
      UserResponse: null,
      firstName: null,
      lastName: null,
      email: null,
      avatarSource: "",
      photoUrl: "",
      imageResponse: "",
      picture: "",
      isloadingImage: true
    };
  }

  componentDidMount() {
    // this._retrieveToken()
    this.GetUser();
  }
  //   _retrieveToken = async () => {

  //   };

  GetUser = async () => {
    try {
      const value = await AsyncStorage.getItem("accessToken");
      if (value !== null) {
        this.setState({ Token: value });
        axios
          .get("http://198.245.53.50:3000/api/current/customer", {
            headers: { Authorization: value }
          })
          .then(response => {
            // AsyncStorage.removeItem("itemName")
            //   this.setState({UserResponse:response.data})
            //  console.log("UserResponce",this.state.UserResponse)
            // alert(response.data.photoUrl)
            this.setState({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
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
        alert("Unauthorized Login");
        this.props.navigation.navigate("Login");
      }
    } catch (error) {}
  };
  onfirstNameChange = text => {
    this.setState({ firstName: text });
  };
  onlastNameChange = text => {
    this.setState({ lastName: text });
  };
  onemailChange = text => {
    this.setState({ email: text });
  };

  chooseFile() {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          isloadingImage: true
        });
        //let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: "data:image/jpeg;base64," + response.data };

        this.setState({
          avatarSource: source,
          photoUrl: response.uri,
          imageResponse: response,
          imageAdded: true,
          picture: source.uri,
          isloadingImage: false
        });
        console.log(
          "AvatarSource: ",
          this.state.avatarSource,
          "Photo Url: ",
          this.state.photoUrl,
          "state",
          this.state
        );
      }
    });
  }
  UpdateProfile = () => {
    // console.log("UpdatedData",this.state.firstName,this.state.lastName,this.state.email)
    // console.log("ImagePath",this.state.filePath)
    this.setState({
      isloadingImage: true
    });
    const { imageResponse } = this.state;
    let formdata = new FormData();
    formdata.append("myFile", {
      uri: imageResponse.uri,
      type: imageResponse.type,
      name: imageResponse.fileName
    });
    console.log("this is formdata of editProfile", formdata);

    console.log("Executing Fetch Api");

    axios
      .post("http://198.245.53.50:3000/api/uploadfile", formdata)
      .then(res => {
        console.log("response on file upload", res);
        const userData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          photoUrl: res.data.photoUrl
        };
        axios
          .post("http://198.245.53.50:3000/api/customer", userData, {
            headers: { Authorization: this.state.Token }
          })
          .then(
            this.setState(
              {
                isloadingImage: false
              },
              () => {
                this.props.navigation.navigate("Profile");
              }
            )
          )
          .catch(err => alert("error" + JSON.stringify(err)));
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  handleEditProfile() {
    this.chooseFile();
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{flex:1,backgroundColor:'red',justifyContent:'center',alignItems:'center',height:100}}>
          <Image
            source={{
              uri:this.state.picture
            }}
            style={{ width: 100, height: 100 }}
          />
          {/* <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          /> */}
        {/* <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text> */}
        <ImageBackground
          style={{
            width: "100%",
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#2cb0f0"
          }}
          // source={require("../../img/profileBackground.jpg")}
        >
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
                color="#2cb0f0"
              />
            </View>
          ) : null}
          <View
            style={{
              // flex: 1,
              // flexDirection: "row"
              width: 180,
              height: 180,
              // marginTop: 10,
              // borderColor:'red',
              // borderWidth:2,
              borderRadius: 180 / 2,
              alignSelf: "center"
            }}
          >
            <TouchableOpacity onPress={this.handleEditProfile}>
              <Image
                source={{
                  uri: this.state.photoUrl
                }}
                style={{
                  width: 180,
                  height: 180,
                  // marginTop: 10,
                  borderRadius: 180 / 2
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                right: 25,
                top: 160,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity onPress={this.handleEditProfile}>
                <Icon
                  name="camera"
                  size={25}
                  color="white"
                  onPress={this.handleEditProfile}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        {/* <Button title="Add Photo" onPress={this.chooseFile.bind(this)} style={{marginTop:10}}/> */}
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
                label="First Name"
                mode="outlined"
                editable="true"
                name="firstName"
                onChangeText={Text => this.onfirstNameChange(Text)}
                //placeholder={this.state.UserResponse !== null ? this.state.UserResponse.firstName:""}
                value={this.state.firstName}
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
                label="Last Name"
                mode="outlined"
                editable="true"
                name="lastName"
                onChangeText={this.onlastNameChange}
                value={this.state.lastName}
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
                label="Email"
                mode="outlined"
                editable="true"
                name="email"
                onChangeText={this.onemailChange}
                value={this.state.email}
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
              onPress={() => this.UpdateProfile()}
            >
              <Text style={{ color: "white", fontSize: 15 }}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
