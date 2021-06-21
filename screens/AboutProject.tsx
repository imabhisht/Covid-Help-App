import React from 'react'
import { StyleSheet, Text, View,Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Subheading, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const AboutProject = () => {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <View style={{marginHorizontal: '10%'}}>
                <Text></Text>
                
                <Subheading style={{textAlign: 'center',fontSize:17}}>{"This Application is been develop inwake of existing Covid-19 Crisis in the Country\n\nYour one Support can save someone Life..."}.</Subheading>
            </View>
            <View style={{marginTop: '15%'}}>
                <Text style={{fontFamily:'VarelaRound_400Regular',fontSize:14,textAlign: 'center',color:'gray'}}>Assisted by Jay Vakil</Text>
            </View> 
            <View style={{marginTop: '5%'}}>
                <Text style={{fontFamily:'VarelaRound_400Regular',fontSize:15,textAlign: 'center',color:'gray'}}>Developed with ❤️ by Abhisht</Text>
            </View>

            {/* <View style={{marginTop: '5%', flexDirection: 'row'}}>
                <AntDesign style={{marginRight: '1%'}} name="github" size={24} color="black" />
                <AntDesign style={{marginLeft: '1%'}} name="linkedin-square" size={24} color="black" />
            </View> */}

            <Button mode="outlined" labelStyle={{fontSize: 10,color:'gray'}} style={{borderColor:'black',marginTop:'5%'}} onPress={()=>{ Linking.openURL('mailto:abhishtchouhan@gmail.com')}}>Contact Us</Button>
        </SafeAreaView>
    )
}

export default AboutProject

const styles = StyleSheet.create({})
