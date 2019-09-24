import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Right, Left } from "native-base";

export default class Meaurments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chest: "",
      stomach: "",
      shoulder: "",
      token: "",
      backLength: "",
      collar: "",
      shirtLength: "",
      hip: "",
      waist: "",
      outSeam: "",
      knee: "",
      thigh: "",
      bottom: "",
      crotch: "",
      seleve: "",
      bicep: "",
      cuff: ""
      // Bchest: "",
      // Bstomach: "",
      // Bshoulder: "",
      // bbackLength: "",
      // Bcollar: "",
      // BshirtLength: "",
      // Bhip: "",
      // Bbicep: "",
      // Bseleve: "",

      // Schest: "",
      // Sstomach: "",
      // Sshoulder: "",
      // Scollar: "",
      // SshirtLength: "",
      // Sbicep: "",
      // Sseleve: "",
      // Ship: "",
      // Scuff: "",
      // SbackLength: "",

      // Phip: "",
      // Pwaist: "",
      // PoutSeam: "",
      // Pknee: "",
      // Pthigh: "",
      // Pbottom: "",
      // Pcrotch: "",

      // Vchest: "",
      // Vstomach: "",
      // Vshoulder: "",
      // Vcollar: "",
      // VbackLength: "",
      // VshirtLength: ""
    };
  }
  // onChestChange = text => {
  //   this.setState({ Chest: text });
  // };
  componentDidMount() {
    console.log("Item For Meaurments", this.props.styleProp);
  }
  onBchestChange(value) {
    this.setState({ chest: value });
  }
  onBstomachChange(value) {
    this.setState({ stomach: value });
  }
  onBhipChange(value) {
    this.setState({ hip: value });
  }
  onBshoulderChange(value) {
    this.setState({ shoulder: value });
  }
  onBseleveChange(value) {
    this.setState({ seleve: value });
  }
  onBbackLengthChange(value) {
    this.setState({ backLength: value });
  }
  onBbicepChange(value) {
    this.setState({ bicep: value });
  }
  onBcollarChange(value) {
    this.setState({ collar: value });
  }
  onBshirtLengthChange(value) {
    this.setState({ shirtLength: value });
    // console.log("data in balzers", this.state);
  }

  onSchestChange(value) {
    this.setState({ chest: value });
  }
  onSstomachChange(value) {
    this.setState({ stomach: value });
  }
  onShipChange(value) {
    this.setState({ hip: value });
  }
  onSshoulderChange(value) {
    this.setState({ shoulder: value });
  }
  onSseleveChange(value) {
    this.setState({ seleve: value });
  }
  onSbackLengthChange(value) {
    this.setState({ backLength: value });
    // console.log("data in Shirts", this.state);
  }
  onSbicepChange(value) {
    this.setState({ bicep: value });
  }
  onScollarChange(value) {
    this.setState({ collar: value });
  }
  onSshirtLengthChange(value) {
    this.setState({ shirtLength: value });
  }
  onScuffChange(value) {
    this.setState({ cuff: value });
    // console.log("data in Shirts", this.state);
  }

  onPhipChange(value) {
    this.setState({ hip: value });
  }
  onPwasitChange(value) {
    this.setState({ waist: value });
  }
  onPoutSeamChange(value) {
    this.setState({ outSeam: value });
  }
  onPkneeChange(value) {
    this.setState({ knee: value });
  }
  onPthighChange(value) {
    this.setState({ thigh: value });
  }
  onPbottomChange(value) {
    this.setState({ bottom: value });
    //console.log("Pent Data :", this.state);
  }
  onPcrotchChange(value) {
    this.setState({ crotch: value });
  }

  onVchestChange(value) {
    this.setState({ chest: value });
  }
  onVstomachChange(value) {
    this.setState({ stomach: value });
  }

  onVshoulderChange(value) {
    this.setState({ shoulder: value });
  }

  onVbackLengthChange(value) {
    this.setState({ backLength: value });
  }

  onVcollarChange(value) {
    this.setState({ collar: value });
  }
  onVshirtLengthChange(value) {
    this.setState({ shirtLength: value });
    // console.log("data in Vest", this.state);
  }
  _storeData = async product => {
    let MeaurmentArray = "";
    try {
      MeaurmentArray = product;
      await AsyncStorage.setItem(
        "MeaurmentItem",
        JSON.stringify(MeaurmentArray)
      );
      console.log("ASynStorage Meaurments Data:", MeaurmentArray);
    } catch (error) {
      console.log("Error While Storage", error);
    }
    ToastAndroid.show("Product Sucessfully Added", ToastAndroid.SHORT);
  };
  render() {
    let BlazersMeaurment = null;
    let PantsMeaurment = null;
    let VestMeaurment = null;
    let ShirtMeaurment = null;
    let TwoPieceMeaurment = null;

    if (
      this.props.styleProp.name === "Blazers" ||
      this.props.styleProp.name === "Two Pcs"
    ) {
      BlazersMeaurment = (
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontWeight: "bold",
              margin: 10
            }}
          >
            Blazers Meaurments
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Chest</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="chest"
                keyboardType="numeric"
                onChangeText={text => this.onBchestChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.chest}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Stomach</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="stomach"
                keyboardType="numeric"
                onChangeText={text => this.onBstomachChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.stomach}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View style={{ flexDirection: "row" }}>
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Hip</Text>
            </Left>
            <Right style={{ right: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="hip"
                keyboardType="numeric"
                onChangeText={text => this.onBhipChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.hip}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Shoulder</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="shoulder"
                keyboardType="numeric"
                onChangeText={text => this.onBshoulderChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.shoulder}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Seleves</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="seleve"
                keyboardType="numeric"
                onChangeText={text => this.onBseleveChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.seleve}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Back Length</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="backLength"
                keyboardType="numeric"
                onChangeText={text => this.onBbackLengthChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.backLength}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Bicep</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="bicep"
                keyboardType="numeric"
                onChangeText={text => this.onBbicepChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.bicep}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Collar</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="collar"
                keyboardType="numeric"
                onChangeText={text => this.onBcollarChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.collar}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Shirt Length</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                name="shirtLength"
                keyboardType="numeric"
                onChangeText={text => this.onBshirtLengthChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.shirtLength}
                style={{ fontSize: 14 }}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: "#2cb0f0",
              margin: 10
            }}
            onPress={() => {
              this._storeData(this.state),
                this.props.Prop.props.navigation.navigate("Finish", {
                  Item: this.props.styleProp
                });
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      <View />;
    }

    if (this.props.styleProp.name === "Dress Shirts") {
      ShirtMeaurment = (
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontWeight: "bold",
              margin: 10
            }}
          >
            Shirt Meaurments
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18 }}>Chest</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="chest"
                keyboardType="numeric"
                onChangeText={text => this.onSchestChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.chest}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Stomach</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="stomach"
                keyboardType="numeric"
                onChangeText={text => this.onSstomachChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.stomach}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Hip</Text>
            </Left>
            <Right style={{ right: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="hip"
                keyboardType="numeric"
                onChangeText={text => this.onShipChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.hip}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Shoulder</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="shoulder"
                keyboardType="numeric"
                onChangeText={text => this.onSshoulderChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.shoulder}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Seleves</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="seleve"
                keyboardType="numeric"
                onChangeText={text => this.onSseleveChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.seleve}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Cuff</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="cuff"
                keyboardType="numeric"
                onChangeText={text => this.onScuffChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.cuff}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18 }}>Shirt Length </Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="shirtLength"
                keyboardType="numeric"
                onChangeText={text => this.onSshirtLengthChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.shirtLength}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Collar</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="collar"
                keyboardType="numeric"
                onChangeText={text => this.onScollarChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.collar}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Bicep</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="bicep"
                keyboardType="numeric"
                onChangeText={text => this.onSbicepChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.bicep}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ justifyContent: "space-around", flexDirection: "row" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Back Length</Text>
            </Left>
            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                keyboardType="numeric"
                style={{
                  fontSize: 14
                }}
                name="backLength"
                onChangeText={text => this.onSbackLengthChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.backLength}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: "#2cb0f0",
              margin: 10
            }}
            onPress={() => {
              this._storeData(this.state),
                this.props.Prop.props.navigation.navigate("Finish", {
                  Item: this.props.styleProp
                });
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      <View />;
    }

    if (
      this.props.styleProp.name === "Pants" ||
      this.props.styleProp.name === "Two Pcs"
    ) {
      PantsMeaurment = (
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: "bold",
                margin: 10
              }}
            >
              Pants Meaurments
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Waist</Text>
              </Left>
              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="waist"
                  keyboardType="numeric"
                  onChangeText={text => this.onPwasitChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.waist}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />
            <View style={{ flexDirection: "row" }}>
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Hip</Text>
              </Left>

              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="hip"
                  keyboardType="numeric"
                  onChangeText={text => this.onPhipChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.hip}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Thigh</Text>
              </Left>
              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="thigh"
                  keyboardType="numeric"
                  onChangeText={text => this.onPthighChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.thigh}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Crotch</Text>
              </Left>
              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="crotch"
                  keyboardType="numeric"
                  onChangeText={text => this.onPcrotchChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.crotch}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Knee</Text>
              </Left>
              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="knee"
                  keyboardType="numeric"
                  onChangeText={text => this.onPkneeChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.knee}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Out Seam</Text>
              </Left>
              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="outSeam"
                  keyboardType="numeric"
                  onChangeText={text => this.onPoutSeamChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.outSeam}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Left style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>Bottom</Text>
              </Left>
              <Right style={{ marginRight: 10 }}>
                <TextInput
                  placeholder="Enter Size in (cm)"
                  style={{ fontSize: 14 }}
                  name="bottom"
                  keyboardType="numeric"
                  onChangeText={text => this.onPbottomChange(text)}
                  // onChangeText={(City) => this.setState({City})}
                  value={this.state.bottom}
                />
              </Right>
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "grey" }}
            />

            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#2cb0f0",
                margin: 10
              }}
              onPress={() => {
                this._storeData(this.state),
                  this.props.Prop.props.navigation.navigate("Finish", {
                    Item: this.props.styleProp
                  });
              }}
            >
              <Text style={{ color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      <View />;
    }
    if (this.props.styleProp.name === "Vest") {
      VestMeaurment = (
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontWeight: "bold",
              margin: 10
            }}
          >
            Vest Meaurments
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
              //   width: "100%",
              //   height: 50,
              //   flexDirection: "row"
            }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Chest</Text>
            </Left>

            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="chest"
                keyboardType="numeric"
                onChangeText={text => this.onVchestChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.chest}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Stomach</Text>
            </Left>

            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="stomach"
                keyboardType="numeric"
                onChangeText={text => this.onVstomachChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.stomach}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Shoulder</Text>
            </Left>

            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="shoulder"
                keyboardType="numeric"
                onChangeText={text => this.onVshoulderChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.shoulder}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Back Length</Text>
            </Left>

            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="backLength"
                keyboardType="numeric"
                onChangeText={text => this.onVbackLengthChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.backLength}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Colar</Text>
            </Left>

            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                name="collar"
                keyboardType="numeric"
                onChangeText={text => this.onVcollarChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.collar}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          {/* <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} /> */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Left style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Shirt Length</Text>
            </Left>

            <Right style={{ marginRight: 10 }}>
              <TextInput
                placeholder="Enter Size in (cm)"
                style={{ fontSize: 14 }}
                keyboardType="numeric"
                name="shirtLength"
                onChangeText={text => this.onVshirtLengthChange(text)}
                // onChangeText={(City) => this.setState({City})}
                value={this.state.shirtLength}
              />
            </Right>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: "#2cb0f0",
              margin: 10
            }}
            onPress={() => {
              this._storeData(this.state),
                this.props.Prop.props.navigation.navigate("Finish", {
                  Item: this.props.styleProp
                });
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      <View />;
    }
    if (this.props.styleProp.name === "Two Pcs") {
      TwoPieceMeaurment = (
        <ScrollView>
          <View>{PantsMeaurment}</View>
        </ScrollView>
      );
    } else {
      <View />;
    }
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View>{BlazersMeaurment}</View>
        <View>{PantsMeaurment}</View>
        <View>{ShirtMeaurment}</View>
        <View>{VestMeaurment}</View>
        <View>{TwoPieceMeaurment}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
