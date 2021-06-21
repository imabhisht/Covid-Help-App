import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card, Title, Paragraph , Chip} from 'react-native-paper';

const ItemElement = ({renderData, navigation, itemID}) => {
    function elementClicked(){
        navigation.navigate('Information',{renderData: renderData , itemID: itemID})
    }

    function SliceString(){
        if((renderData.agencyName).length > 20){
            return (renderData.agencyName).slice(0,20)+"..."
        }else{
            return renderData.agencyName
        }

        
    }
    return (
        <View style={styles.parentContainer}>
            
            <Card onPress={elementClicked} style={{marginTop: '3%',borderRadius: 15, backgroundColor: 'white'}}>
                <Card.Content>
                <Paragraph style={[styles.availableTitle, renderData.isVerified ? styles.isAvailable : styles.notAvailable]}>
                    {renderData.isVerified ? "Verified" : "Not Verified"}
                    </Paragraph>
                
                
                <Title style={{fontSize: 27, marginTop:'2%' }}>{SliceString()}</Title>
                <Paragraph>{renderData.agencyArea} {renderData.agencyCity}</Paragraph>
                {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '4%'}}>
                    <View>
                        <Chip mode={'flat'} textStyle={styles.chipText} style={[{width: 90},renderData.isAvailableI1 ? styles.itemIsAvailable : styles.itemNotAvailable ]} icon="information" onPress={() => console.log('Pressed')}>Oxygen</Chip>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Chip mode={'flat'} textStyle={styles.chipText} style={[{width: 150}, renderData.isAvailableI2 ? styles.itemIsAvailable : styles.itemNotAvailable]} icon="information" onPress={() => console.log('Pressed')}>Oxygen Concentrator</Chip>
                    </View>
                </View> */}
                
                </Card.Content>
            </Card>
            
    
        </View>
    )
}

export default ItemElement

const styles = StyleSheet.create({
    parentContainer:{
        paddingHorizontal: '4%'
    },
    container:{
        marginTop: '3%',
        backgroundColor: 'white',
        borderRadius: 25,
    },
    availableTitle:{
        fontSize: 12, marginTop:7 , fontFamily: 'Roboto_700Bold'
    },
    chipText:{
        fontSize: 12,color:'white',fontFamily:'Roboto_500Medium'
    },
    notAvailable:{
        color: "#fb3640"
    },
    isAvailable:{
        color: "#29bb89"
    },
    itemIsAvailable:{
        backgroundColor: "#29bb89"
    },
    itemNotAvailable:{
        backgroundColor: "#fb3640"
    },


})
