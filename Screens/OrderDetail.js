import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator ,TouchableOpacity,ImageBackground,ScrollView,StatusBar} from 'react-native'
import moment from "moment";
import {Right,Left,Body} from 'native-base'
import { FlatGrid } from 'react-native-super-grid';
export default class OrderDetail extends Component {
    state={Order:this.props.navigation.getParam("OrderProduct","NotFound"),OrderDetail:null}

    componentWillMount(){
        console.warn("ProductList"+ JSON.stringify(this.state.Order))
    }
    render() {
        let Detail=null
        Detail=this.state.Order
        if(Detail==null){
            Products=<View style={{justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator color="#2cb0f0" size={15} />
           </View>
          }else{
            
        //this.setState({OrderDetail:Products}),
      // />
      //       Products=Detail.products.map(product=>(
      //                  ));
            // console.log("Products Container",Products)
          }
          
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
               <StatusBar backgroundColor="#2cb0f0" barStyle="light-content" />
             <View  style={{ margin:10,backgroundColor:'white',elevation:2,width:"90%",height:70,alignSelf:'center',justifyContent:"flex-start" }}>
            <Text
              style={{ color: "black",fontSize:12,marginLeft:10,marginTop:10}} ellipsizeMode="tail"
              numberOfLines={2}
            >
             Total Ammount: $ {this.state.Order.totalBill}
            </Text>
            <Text style={{ color: "black",marginLeft:10,fontSize:12 }}>Time: {moment(this.state.Order.date).format("MMMM D, YYYY")}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey",marginLeft:10,fontSize:12   }}>Status: {this.state.Order.status}</Text>
              
            </View>
            </View>
            <FlatGrid
        itemDimension={130}
        items={this.state.Order.products} 
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <View  style={{ marginLeft: 5, marginTop: 5,width:150,height:200}}>
              <TouchableOpacity>
                <ImageBackground
                 source={{uri:item._id.photoUrl[0].split(",")[0]}}
                  imageStyle={{ borderRadius: 10 }}
                  style={{ width: 145, height: 150 }}
                >
                </ImageBackground>
              </TouchableOpacity>
              <View style={{justifyContent:'space-around',paddingRight:10,marginLeft:10}}>
                <Text style={{ color: "black",fontSize:14}} ellipsizeMode="tail"
                            numberOfLines={1} >Name: {item._id.name}</Text>
                <Text style={{ color: "black" }}>Price:{item._id.price}</Text>    
              </View>
            </View>
        )}
        />
            </View>
        )
    }
}

const styles = StyleSheet.create({})
