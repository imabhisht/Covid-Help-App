import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {SafeAreaView} from  'react-native-safe-area-context';
import { HelperText ,Caption, Subheading, Button, Menu, Divider, Provider } from 'react-native-paper';

const SupportFirst = (props) => {
    

    function ButtonPressed(){
        if(helpSelect === 'Select from here'){
            setHasError(true);
        }else{
        props.navigation.navigate('ProvideInformation',{help: helpSelect});
        }
    }
    const [hasError,setHasError] = React.useState(false);
    const [helpSelect,setHelpSelect] = React.useState("Select from here")
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <Provider>
        <SafeAreaView>
            <View>
                <View style={{alignItems: 'center',marginTop:'10%'}}>
                    <Text style={styles.title}>Support People by Providing Information</Text>
                </View>

                <View style={{alignItems: 'center',marginTop:'12%'}}>
                    <Subheading style={{fontSize: 18}}>How you going to Help?</Subheading>
                    
                        <View
                            style={{
                            paddingTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            }}>
                            <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                            <Button mode={"contained"}style={{backgroundColor: "whitesmoke",paddingHorizontal:"15%"}} labelStyle={{color:"gray"}} onPress={openMenu} >{helpSelect}</Button>}>
                            <Menu.Item onPress={() => {
                                setHelpSelect("Oxygen");
                                closeMenu();
                                setHasError(false);
                                }} title="Support Oxygen / Oxygen Concentrator" />
                            <Menu.Item onPress={() => {
                                setHelpSelect("Plasma");
                                closeMenu();
                                setHasError(false);
                                }} title="Support Plasma" />
                            <Divider />
                            <Menu.Item onPress={() => {}} title="Support Blood" disabled titleStyle={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} />
                            </Menu>
                        </View> 
                        <HelperText type="error" visible={hasError}>
                            Please Select the type of Help
                        </HelperText>        
                </View>

                <View style={{marginTop: '10%',alignItems: 'flex-start',marginLeft:'5%',marginRight:'10%'}}>
                        <Subheading style={{fontSize: 15}}>Please Read Carefully before Proceeding:</Subheading>
                        <View style={{marginLeft:"3%"}}>
                            <Caption> • Only Provide Authentic and Reliable Source.</Caption>
                            <Caption> • Be Responsible to the Information you Provide.</Caption>
                            <Caption> • There are humongous number of people, fighting for their life & Waiting to get help. Please be Respectful.</Caption>
                            <Caption> • This Platform is not meant for any Fraudulent Data and Code of Coduct will be followed against such Activities. </Caption>
                        </View>
                </View>

                <View style={{marginTop:'15%',alignItems: 'center'}}>
                    <Button style={{width:"50%", backgroundColor:'#29bb89'}}icon="" mode="contained" onPress={() => ButtonPressed()}>
                                I Understand
                    </Button>
                </View>
            </View>   
        </SafeAreaView>
    </Provider>
    )
}

export default SupportFirst

const styles = StyleSheet.create({


    title:{
        fontFamily: 'VarelaRound_400Regular',
        fontSize: 23,
        marginHorizontal: '5%',
        textAlign: 'center',
    },


})
