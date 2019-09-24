import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Right } from "native-base";
export default class Sty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Styles: false,
      SelectVestColar: {},
      SelectVestButton: {},
      SelectVestVent: {},
      SelectVestPockit: {},
      SelectShirtButton: {},
      SelectShirtColar: {},
      SelectShirtPocket: {},
      SelectShirtVent: {},
      SelectPantCuff: {},
      SelectPantPleat: {},
      SelectCoatButton: {},
      SelectCoatColar: {},
      SelectCoatPocket: {},
      SelectCoatVent: {}
    };
  }
  componentDidMount() {
    console.log("Styles", this.props);
  }
  onSelectVestColar(value) {
    this.setState(
      {
        SelectVestColar: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectVestButton(value) {
    this.setState(
      {
        SelectVestButton: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectVestVent(value) {
    this.setState(
      {
        SelectVestVent: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectVestPocket(value) {
    this.setState(
      {
        SelectVestPockit: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectShirtColar(value) {
    this.setState(
      {
        SelectShirtColar: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectShirtButton(value) {
    this.setState(
      {
        SelectShirtButton: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectShirtPocket(value) {
    this.setState(
      {
        SelectShirtPocket: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectShirtVent(value) {
    this.setState(
      {
        SelectShirtVent: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectPantCuff(value) {
    this.setState(
      {
        SelectPantCuff: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectPantCuff);
      }
    );
  }
  onSelectPantPleats(value) {
    this.setState(
      {
        SelectPantPleat: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectPantPleat);
      }
    );
  }
  onSelectCoatColar(value) {
    this.setState(
      {
        SelectCoatColar: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }

  onSelectCoatButton(value) {
    this.setState(
      {
        SelectCoatButton: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectCoatPocket(value) {
    this.setState(
      {
        SelectCoatPocket: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  onSelectCoatVents(value) {
    this.setState(
      {
        SelectCoatVent: value
      },
      () => {
        console.log("SelectVestValue", this.state.SelectVestColar);
      }
    );
  }
  _storeData = async product => {
    let StylesArray = [];
    try {
      StylesArray.push(product);
      await AsyncStorage.setItem("StylesItem", JSON.stringify(StylesArray));
      console.log("ASynStorage STyles Data:", StylesArray);
    } catch (error) {
      console.log("Error While Storage", error);
    }
    ToastAndroid.show("Selected", ToastAndroid.SHORT);
  };
  render() {
    let coatCollars,
      shirtCollars,
      vestCollars,
      coatButtons,
      shirtButtons,
      vestButtons,
      coatPockets,
      shirtPockets,
      vestPockets,
      coatVents,
      shirtVents,
      vestVents,
      cuffs,
      pleats = [];

    let customItem = null;
    customItem = this.props.styleProp;
    console.log("Cuffs Items", customItem);
    let Products = <View />;
    if (customItem == null || customItem == undefined) {
      Products = (
        <View>
          <Text>Empty customItem</Text>
        </View>
      );
    } else {
      if (customItem.name == "Pants") {
        console.log("pent Cuffs", customItem.cuffs);
        cuffs = (
          <View>
            {/* <TouchableOpacity onPress={() => this._storeData(this.state)}>
              <Right>
                <Icon name="check" size={24} />
              </Right>
            </TouchableOpacity> */}
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 15,
                  fontSize: 16,
                  position: "absolute",
                  // marginBottom:,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Cuffs
              </Text>
              {customItem.cuffs.map(cuff => (
                <View style={{ marginTop: 35 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectPantCuff(cuff);
                        this._storeData(this.state);
                      }}
                    >
                      <Image
                        source={{ uri: cuff.stylePhotoUrl }}
                        style={{
                          width: 150,
                          height: 130,
                          margin: 4,
                          borderRadius: 5,
                          borderColor:
                            this.state.SelectPantCuff._id == cuff._id
                              ? "#2cb0f0"
                              : "grey",
                          borderWidth:
                            this.state.SelectPantCuff._id == cuff._id ? 3 : 1
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
        pleats = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Pleats
            </Text>

            {customItem.pleats.map(pleat => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectPantPleats(pleat);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: pleat.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectPantPleat._id == pleat._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectPantPleat._id == pleat._id ? 3 : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

        // ab render m check lagao ....  k agr to customItem "Pant" ho to bas ye 2 styles (cuffs,pleats ) show ho jaye
      }
      if (customItem.name == "Two Pcs") {
        console.log("pent Cuffs", customItem.cuffs);
        coatCollars = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Coat Collars
            </Text>
            {customItem.coatCollars.map(coatCollar => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectCoatColar(coatCollar);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: coatCollar.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectCoatColar._id == coatCollar._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectCoatColar._id == coatCollar._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        coatButtons = (
          <View style={{ flexDirection: "row" }}>
            {customItem.coatButtons.map(coatButton => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => this.onSelectCoatButton(coatButton)}
                  >
                    <Image
                      source={{ uri: coatButton.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectCoatButton._id == coatButton._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectCoatButton._id == coatButton._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        coatPockets = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Coat Pockets
            </Text>

            {customItem.coatPockets.map(coatPocket => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectCoatPocket(coatPocket);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: coatPocket.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectCoatPocket._id == coatPocket._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectCoatPocket._id == coatPocket._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        coatVents = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Coat Vents
            </Text>
            {customItem.coatVents.map(coatVent => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectCoatVents(coatVent);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: coatVent.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectCoatVent._id == coatVent._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectCoatVent._id == coatVent._id ? 3 : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        cuffs = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Cuffs
            </Text>
            {customItem.cuffs.map(cuff => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectPantCuff(cuff);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: cuff.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectPantCuff._id == cuff._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectPantCuff._id == cuff._id ? 3 : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        pleats = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Pleats
            </Text>

            {customItem.pleats.map(pleat => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectPantPleats(pleat);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: pleat.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectPantPleat._id == pleat._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectPantPleat._id == pleat._id ? 3 : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

        // ab render m check lagao ....  k agr to customItem "Pant" ho to bas ye 2 styles (cuffs,pleats ) show ho jaye
      }
      if (customItem == null || customItem == undefined) {
        Products = (
          <View>
            <Text>Empty customItem</Text>
          </View>
        );
      } else {
        if (customItem.name == "Blazers") {
          //  console.log("pent Cuffs", customItem.cuffs);
          coatCollars = (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 15,
                  fontSize: 16,
                  position: "absolute",
                  // marginBottom:,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Coat Collars
              </Text>
              {customItem.coatCollars.map(coatCollar => (
                <View style={{ marginTop: 35 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectCoatColar(coatCollar);
                        this._storeData(this.state);
                      }}
                    >
                      <Image
                        source={{ uri: coatCollar.stylePhotoUrl }}
                        style={{
                          width: 150,
                          height: 130,
                          margin: 4,
                          borderRadius: 5,
                          borderColor:
                            this.state.SelectCoatColar._id == coatCollar._id
                              ? "#2cb0f0"
                              : "grey",
                          borderWidth:
                            this.state.SelectCoatColar._id == coatCollar._id
                              ? 3
                              : 1
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          );
          coatButtons = (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 15,
                  fontSize: 16,
                  position: "absolute",
                  // marginBottom:,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Coat Buttons
              </Text>
              {customItem.coatButtons.map(coatButton => (
                <View style={{ marginTop: 35 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectCoatButton(coatButton);
                        this._storeData(this.state);
                      }}
                    >
                      <Image
                        source={{ uri: coatButton.stylePhotoUrl }}
                        style={{
                          width: 150,
                          height: 130,
                          margin: 4,
                          borderRadius: 5,
                          borderColor:
                            this.state.SelectCoatButton._id == coatButton._id
                              ? "#2cb0f0"
                              : "grey",
                          borderWidth:
                            this.state.SelectCoatButton._id == coatButton._id
                              ? 3
                              : 1
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          );
          coatPockets = (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 15,
                  fontSize: 16,
                  position: "absolute",
                  // marginBottom:,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Coat Pockets
              </Text>
              {customItem.coatPockets.map(coatPocket => (
                <View style={{ marginTop: 35 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectCoatPocket(coatPocket);
                        this._storeData(this.state);
                      }}
                    >
                      <Image
                        source={{ uri: coatPocket.stylePhotoUrl }}
                        style={{
                          width: 150,
                          height: 130,
                          margin: 4,
                          borderRadius: 5,
                          borderColor:
                            this.state.SelectCoatPocket._id == coatPocket._id
                              ? "#2cb0f0"
                              : "grey",
                          borderWidth:
                            this.state.SelectCoatPocket._id == coatPocket._id
                              ? 3
                              : 1
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          );
          coatVents = (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 15,
                  fontSize: 16,
                  position: "absolute",
                  // marginBottom:,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Coat Vents
              </Text>
              {customItem.coatVents.map(coatVent => (
                <View style={{ marginTop: 35 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectCoatVents(coatVent);
                        this._storeData(this.state);
                      }}
                    >
                      <Image
                        source={{ uri: coatVent.stylePhotoUrl }}
                        style={{
                          width: 150,
                          height: 130,
                          margin: 4,
                          borderRadius: 5,
                          borderColor:
                            this.state.SelectCoatVent._id == coatVent._id
                              ? "#2cb0f0"
                              : "grey",
                          borderWidth:
                            this.state.SelectCoatVent._id == coatVent._id
                              ? 3
                              : 1
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          );
        }
        // ab render m check lagao ....  k agr to customItem "Pant" ho to bas ye 2 styles (cuffs,pleats ) show ho jaye
      }
    }
    if (customItem == null || customItem == undefined) {
      Products = (
        <View>
          <Text>Empty customItem</Text>
        </View>
      );
    } else {
      if (customItem.name == "Dress Shirts") {
        //  console.log("pent Cuffs", customItem.cuffs);
        shirtButtons = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Shirt Buttons
            </Text>

            {customItem.shirtButtons.map(shirtButton => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectShirtButton(shirtButton);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: shirtButton.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectShirtButton._id == shirtButton._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectShirtButton._id == shirtButton._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        shirtCollars = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Shirt Collars
            </Text>
            {customItem.shirtCollars.map(shirtCollar => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectShirtColar(shirtCollar);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: shirtCollar.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectShirtColar._id == shirtCollar._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectShirtColar._id == shirtCollar._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        shirtPockets = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Shirt Pockets
            </Text>
            {customItem.shirtPockets.map(shirtPocket => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectShirtPocket(shirtPocket);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: shirtPocket.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectShirtPocket._id == shirtPocket._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectShirtPocket._id == shirtPocket._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        shirtVents = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Shirt vents
            </Text>
            {customItem.shirtVents.map(shirtVent => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectShirtVent(shirtVent);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: shirtVent.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectShirtVent._id == shirtVent._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectShirtVent._id == shirtVent._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
      }
      // ab render m check lagao ....  k agr to customItem "Pant" ho to bas ye 2 styles (cuffs,pleats ) show ho jaye
    }
    if (customItem == null || customItem == undefined) {
      Products = (
        <View>
          <Text>Empty customItem</Text>
        </View>
      );
    } else {
      if (customItem.name == "Vest") {
        //  console.log("pent Cuffs", customItem.cuffs);
        vestCollars = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                position: "absolute",
                // marginBottom:,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Vest Collars
            </Text>
            {customItem.vestCollars.map(vestCollar => (
              <View style={{ marginTop: 35 }}>
                <View key={vestCollar._id}>
                  <View>
                    {/* <Text
                      style={{
                        margin: 15,
                        fontSize: 16,
                        color: "black",
                        fontWeight: "bold"
                      }}
                    >
                      Vest Collars
                    </Text> */}
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.onSelectVestColar(vestCollar);
                          this._storeData(this.state);
                        }}
                      >
                        <Image
                          source={{ uri: vestCollar.stylePhotoUrl }}
                          style={{
                            width: 150,
                            height: 130,
                            margin: 4,
                            borderRadius: 5,
                            borderColor:
                              this.state.SelectVestColar._id == vestCollar._id
                                ? "#2cb0f0"
                                : "grey",
                            borderWidth:
                              this.state.SelectVestColar._id == vestCollar._id
                                ? 3
                                : 1
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );

        vestButtons = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                color: "black",
                position: "absolute",
                fontWeight: "bold"
              }}
            >
              Vest Buttons
            </Text>
            {customItem.vestButtons.map(vestButton => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectVestButton(vestButton);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: vestButton.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectVestButton._id == vestButton._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectVestButton._id == vestButton._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );

        vestPockets = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                color: "black",
                position: "absolute",
                fontWeight: "bold"
              }}
            >
              Vest Pockets
            </Text>
            {customItem.vestPockets.map(vestPocket => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectVestPocket(vestPocket);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: vestPocket.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectVestPockit._id == vestPocket._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectVestPockit._id == vestPocket._id
                            ? 3
                            : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        vestVents = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                margin: 15,
                position: "absolute",
                fontSize: 16,
                color: "black",
                fontWeight: "bold"
              }}
            >
              Vest Vents
            </Text>
            {customItem.vestVents.map(vestVent => (
              <View style={{ marginTop: 35 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectVestVent(vestVent);
                      this._storeData(this.state);
                    }}
                  >
                    <Image
                      source={{ uri: vestVent.stylePhotoUrl }}
                      style={{
                        width: 150,
                        height: 130,
                        margin: 4,
                        borderRadius: 5,
                        borderColor:
                          this.state.SelectVestVent._id == vestVent._id
                            ? "#2cb0f0"
                            : "grey",
                        borderWidth:
                          this.state.SelectVestVent._id == vestVent._id ? 3 : 1
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
      }
      // ab render m check lagao ....  k agr to customItem "Pant" ho to bas ye 2 styles (cuffs,pleats ) show ho jaye
    }

    // console.log("STYLES Here in Render", STYLES);

    return (
      <View style={{ marginTop: 5, flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: "white",
                margin: 5,
                flexDirection: "row"
              }}
            >
              {customItem.name == "Pants" ? cuffs : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Pants" ? pleats : null}
            </View>
          </ScrollView>
        </ScrollView>
        <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Blazers" ? coatCollars : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Blazers" ? coatButtons : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Blazers" ? coatPockets : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Blazers" ? coatVents : null}
            </View>
          </ScrollView>
        </ScrollView>
        <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Dress Shirts" ? shirtCollars : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Dress Shirts" ? shirtButtons : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Dress Shirts" ? shirtPockets : null}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Dress Shirts" ? shirtVents : null}
            </View>
          </ScrollView>
        </ScrollView>
        <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
              {customItem.name == "Vest" ? vestCollars : null}
            </View>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Vest" ? vestButtons : null}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Vest" ? vestPockets : null}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Vest" ? vestVents : null}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Two Pcs" ? coatCollars : null}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Two Pcs" ? coatPockets : null}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Two Pcs" ? coatPockets : null}
              </View>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Two Pcs" ? coatVents : null}
              </View>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Two Pcs" ? cuffs : null}
              </View>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                {customItem.name == "Two Pcs" ? pleats : null}
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
