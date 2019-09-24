import React, { Component } from 'react'
import { Text, StyleSheet, View ,ImageBackground,TouchableOpacity} from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import Icon from "react-native-vector-icons/FontAwesome";
import {Right,Left} from "native-base"
import axios from 'axios'
export default class Shirt extends Component {
    constructor(props){
            super(props)
           this.state ={
               customdata:[],
               Shirt:[],
            data: [
            { id: 1, name: "Tayyab" },
            { id: 2, name: "Hamza" },
            { id: 3, name: "Hassan" },
            { id: 4, name: "Haseeb" }
          ]}
    }
    componentDidMount(){
    axios.get("http://198.245.53.50:3000/api/universal/custom/products").then(responce=>{
      console.log("Custome Responce",responce); 
      this.setState({customdata:responce.data}) 
      this.setState({Shirt :this.state.customdata.filter(pro=>pro.name == "Dress Shirts")}) 
  }
  ).catch(err=>console.log("catch",err))
  
    }
    redirectDetail=(item)=>{
      //console.log("Recived item",item)
      if(item.name=="Dress Shirts"){
        this.props.navigation.navigate("CutomizeDetail",{CustomDetail:item})
      }else{
        console.log("No Product Recived")
      }
          }
    render() {
      
        return (
                 <FlatGrid
                    itemDimension={130}
                    items={this.state.Shirt} 
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    // spacing={20}
        renderItem={({ item, index }) => (
            <View style={{ flex:1,marginLeft: 10, marginTop: 10,width:150 }}>
            <TouchableOpacity
          onPress={()=>this.redirectDetail(item)}
       >
         <ImageBackground
         //source={require("../img/4.jpg")}
          source={{uri:item.photoUrl[0].split(",")[0]}}
           imageStyle={{ borderRadius: 10 }}
           style={{ width: 150, height: 150 }}
         >
           <Right style={{ left: 50, marginTop: 10 }}>
             <TouchableOpacity
           //  onPress={()=>this.props.navigation.navigate("CutomizeDetail")}
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
                name="cut"
                 size={15}
                 style={{ color: "#2cb0f0" }}
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
         <View style={{}}>
           <Text style={{ color: "black",fontSize:14}} ellipsizeMode="tail"
                     numberOfLines={2}>{item.name}</Text>
           {/* <Text style={{ color: "black", fontSize: 18 }}>
           {item.date}
           </Text> */}
           <Text style={{ color: "black" }}>Price: {item.price}</Text>
         </View>
       </View>
        )}
        />
        
        )
    }
}

const styles = StyleSheet.create({})
