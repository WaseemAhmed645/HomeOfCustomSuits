import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  navigation,
  routes,
  TabNavigator,
  NavigationActions,
  StackActions,
  defaultHandler
} from "react-navigation";
// import {
//   TabNavigator,
//   createMaterialTopTabNavigator
// } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon1 from "react-native-vector-icons/AntDesign";
import Home from "./Screens/Home";
import Products from "./Screens/Products";
import Custom from "./Screens/Custom";
import Cart from "./Screens/Cart";
import Profile from "./Screens/Profile";
import CheckOut from "./Screens/CheckOut";
import Payment from "./Screens/Payment";
import Finish from "./Screens/Finish";
import ProductDetail from "./Screens/ProductDetail";
import ShopProductDetail from "./Screens/ShopProductDetail";
import Login2 from "./Screens/Login2";
import CartLogin from "./Screens/CartLogin";
import KidsProducts from "./Screens/KidsProducts";
import MensProducts from "./Screens/MensProducts";
import WomenProducts from "./Screens/WomenProducts";
import Signup from "./Screens/Signup";
import MyOrders from "./Screens/MyOrders";
import OrderDetail from "./Screens/OrderDetail";
import Splash from "./Screens/Splash";
import EditProfile from "./Screens/EditProfile";
import CutomizeDetail from "./Screens/CutomizeDetail";
import CustomTabNavigator from "./Screens/CustomStack";
import Thanks from "./Screens/Thanks";
import { Menu } from "react-native-paper";
import Coat from "./Screens/Coat";
import Pent from "./Screens/Pent";
import Vest from "./Screens/Vest";
import Shirt from "./Screens/Shirt";
//import Profile from "./Screens/Profile";
//import { ProductsTab } from "./Screens/Products";
let _navigator;
export default class App extends Component {
  //   static navigationOptions = ({ navigation }) => {
  //     return {
  //          tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
  //              const { route, index, focused} = scene;

  //              if(focused){
  //                  navigation.state.params.scrollToTop()
  //              }
  //              jumpToIndex(0)
  //          }
  //      }
  // };
  render() {
    return <AppContainer />;
  }
}
//  resetStack= (navigation, routes) => {
//   if (routes.length > 1) {
//     const { routeName } = routes[0];
//     navigation.dispatch(NavigationActions.reset({
//       index: 0,
//       actions: [NavigationActions.navigate({ routeName })],
//     }));
//   }
// }

const KidStack = createStackNavigator(
  {
    KidsProducts: KidsProducts,
    ShopProductDetail: ShopProductDetail
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null,

      headerVisible: false
    }
  }
);
const WomenStack = createStackNavigator(
  {
    WomenProducts: WomenProducts,
    ShopProductDetail: ShopProductDetail
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null,

      headerVisible: false
    }
  }
);
const MenStack = createStackNavigator(
  {
    MensProducts: MensProducts,
    ShopProductDetail: ShopProductDetail
  },
  {
    headerMode: "none",
    navigationOptions: {
      header: null,

      headerVisible: false
    }
  }
);

const CustomStack = createStackNavigator(
  {
    CustomTabNavigator: CustomTabNavigator,
    CutomizeDetail: CutomizeDetail,
    Custom: Custom,
    Finish: Finish
  },
  {
    headerMode: "none",

    navigationOptions: {
      header: null,
      //initialRouteName:"CustomTabNavigator",
      headerVisible: false
    }
  }
);

const DashboardTabNavigator = createMaterialTopTabNavigator(
  {
    Kids: { screen: KidStack },
    Women: { screen: WomenStack },
    Men: { screen: MenStack }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: "#2cb0f0"
      }
    }
  }
);
const HomeStack = createStackNavigator(
  {
    Home: Home,
    ProductDetail: ProductDetail,
    CutomizeDetail: CutomizeDetail
  },
  {
    initialRouteName: "Home",
    headerMode: "none",

    navigationOptions: {
      headerVisible: false
    }
  }
);
const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
    OrderDetail: OrderDetail,
    EditProfile: EditProfile,
    Login2: Login2,
    Signup: Signup
  },
  {
    initialRouteName: "Profile",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const CartStack = createStackNavigator(
  {
    Cart: Cart,
    CartLogin: CartLogin,
    CheckOut: CheckOut,
    Payment: Payment,
    Thanks: Thanks,
    MyOrders: MyOrders,
    Finish: Finish
  },
  {
    initialRouteName: "Cart",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({routeName: 'Cart'})
//     ]
// });
reset = () => {
  // const { navigate } = this.props.navigation
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Cart" })],
    key: null // THIS LINE
  });
  this.props.navigation.dispatch(resetAction);
};
setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};
const Bottom = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      initialRouteName: "Home",
      navigationOptions: {
        initialRouteName: "Home",
        tabBarLabel: "HOME",
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("Home");
          defaultHandler();
        },
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={22} />
        )
      }
    },
    Products: {
      screen: DashboardTabNavigator,
      navigationOptions: {
        tabBarLabel: "SHOP",
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("KidsProducts");
          defaultHandler();
        },
        tabBarIcon: ({ tintColor }) => (
          <Icon2 name="tshirt" color={tintColor} size={20} />
        )
      }
    },
    Customize: {
      screen: CustomStack,
      initialRouteName: "CustomTabNavigator",
      navigationOptions: {
        //   initialRouteName:"Tab",
        tabBarLabel: "CUSTOMIZE",
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("CustomTabNavigator");
          defaultHandler();
        },
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./img/cut.png")}
            style={{ height: 24, width: 24, tintColor: tintColor }}
          />
        )
      }
    },
    Cart: {
      screen: CartStack,
      initialRouteName: "Cart",
      navigationOptions: {
        // tabBarOnPress: () => {
        //   const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //       NavigationActions.navigate({ routeName: 'Home'})
        //     ],
        //     key: null // THIS LINE
        //   })
        //   this.props.navigation.dispatch(resetAction)
        // }
        // ,
        initialRouteName: "Cart",
        tabBarLabel: "CART",
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("Cart");
          defaultHandler();
        },
        //initialRouteName:'CartStack',
        activeTintColor: "#2cb0f0",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="shopping-bag" color={tintColor} size={20} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      tabBarOptions: {
        tabBarOnPress: {
          initialRouteName: "Profile"
        }
      },
      navigationOptions: {
        // tabBarOnPress:{
        // //  initialRouteName:"Home"
        // //navigate("Hom)
        // },

        tabBarLabel: "PROFILE",
        activeTintColor: "#2cb0f0",
        tabBarIcon: ({ tintColor }) => (
          <Icon1 name="user" color={tintColor} size={20} />
        )
      }
    }
    // }, {
    //   initialRouteName: "Home",
    //   defaultNavigationOptions: ({ navigation }) => ({
    //     tabBarOnPress: ({ navigation, defaultHandler }) => {
    //       console.log('onPress:', navigation.state.routeName);
    //       defaultHandler()
    //     },
    //   }),
  },
  {
    navigationOptions: {
      header: null,
      tabBarOptions: {
        activeTintColor: "#2cb0f0",
        inactiveTintColor: "grey",
        header: null,
        style: {
          backgroundColor: "white",
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: "black",
          shadowOpacity: 0.5,
          elevation: 5
        }
      }
      // },tabBarComponent: props => {
      //   const {navigation, navigationState} = props
      //   const jumpToIndex = index => {
      //     const lastPosition = navigationState.index
      //     const tab = navigationState.routes[index]
      //     const tabRoute = tab.routeName
      //     const firstTab = tab.routes[0].routeName

      //     lastPosition !== index && navigation.dispatch(pushNavigation(tabRoute))
      //     lastPosition === index && navigation.dispatch(resetNavigation(firstTab))
      //   }
      //   return <TabView.TabBarBottom {...props} jumpToIndex={jumpToIndex}/>
      // },
    }
  }
);
const NewHomeStack = createStackNavigator(
  {
    Splash: Splash,
    HomeStackFull: Bottom
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const AppContainer = createAppContainer(NewHomeStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
