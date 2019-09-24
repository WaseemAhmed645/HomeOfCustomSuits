import { createMaterialTopTabNavigator } from "react-navigation";
import Coat from "./Coat";
import Pent from "./Pent";
import Vest from "./Vest";
import Shirt from "./Shirt";
const CustsomTabNavigator = createMaterialTopTabNavigator(
  {
    Coat: { screen: Coat },
    Pent: { screen: Pent },
    Vest: { screen: Vest },
    Shirt: { screen: Shirt }
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

export default CustsomTabNavigator;
