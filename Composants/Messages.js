import React from "react";
import { Text, View , StyleSheet} from "react-native"
import colors from "../Constantes/constants";

const Messages =({message,userName}) => {
    return(
        <View style={{
            padding:10,
            alignSelf: userName==message.user ? 'flex-end' : 'flex-start'  
        }}>
            <Text style={[styles.hour,
                            {
                                alignSelf: userName==message.user ? 'flex-end' : 'flex-start'  
                            }
                        ]}>{message.heure}</Text>
            <Text style={[styles.msg,
                {
                    backgroundColor : userName==message.user ? colors.green : colors.lightGreen,
                    borderBottomLeftRadius : userName==message.user ? 20 : 0,
                    borderBottomRightRadius : userName==message.user ? 0 : 20
                }
            ]}
            >
                {message.contenu}</Text>
              
        </View>
    )
}
const styles=StyleSheet.create({
    msg:{
        fontSize:15,
        color: colors.white,
        padding:20,
        marginBottom:5,
        borderTopRightRadius:20,
        borderTopLeftRadius:20

    },
    hour:{
       color:colors.greyS,
       fontSize:10,
       marginHorizontal:20
    }
})
export default Messages;