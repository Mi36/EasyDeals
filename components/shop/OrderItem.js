import React,{useState} from 'react';
import { View ,Text,StyleSheet, Button} from 'react-native';
import CartItem from './CartItem'

const OrderItem = props => {
    const [showDetails,setShowDetails]=useState(false)
  return (
    <View style={styles.OrderItem}>
        <View style={styles.summary}>
       <Text>${props.amount}</Text>
       
      </View>
      <Button title={showDetails?"Hide Details":"Show Details"} onPress={()=>{
          setShowDetails(prevState=>!prevState)
      }}/>
      {
      
      showDetails&&<View>
          {props.item.map(cartItem=><CartItem 
          quantity={cartItem.quantity} 
          amount={cartItem.sum} 
          title={cartItem.productTitle}/>)}
          
          </View>
          
          }
     </View>
  );
}


const styles = StyleSheet.create({
    OrderItem:{
        padding:15,
        elevation:5,
        shadowColor:'black',
        shadowOpacity:.25,
        backgroundColor:'white',
        borderRadius:10,
      //  height:300,
        margin:20,
        shadowRadius:8,
        shadowOffset:{width:0,height:2}
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',paddingBottom:15
    }
    
})

export default OrderItem
