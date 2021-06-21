import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator,ScrollView , Clipboard} from 'react-native'
import {SafeAreaView} from  'react-native-safe-area-context';
import { Button,Modal , Subheading, Paragraph,Card, Provider ,Portal} from 'react-native-paper';
import { Platform, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { db } from '../firebase';
import firebase from 'firebase';
// import Clipboard from '@react-native-community/clipboard';

const isString = (str) => Object.prototype.toString.call(str) === '[object String]'
const isBool = (bool) => Object.prototype.toString.call(bool) === '[object Boolean]'

const createError = (msg = '') => Promise.reject(new Error(msg))

const openLink = (url, cb) => {
  return Linking.canOpenURL(url).then(canOpen => {
    if (!canOpen) {
      return createError(`invalid URL provided: ${url}`)
    } else {
      return Linking.openURL(url).catch((err) => Promise.reject(err))
    }
  })
}

const call = (args = {}) => {
  const settings = Object.assign({
    prompt: true
  }, args)

  if (!settings.number) { return createError('no number provided') }
  if (!isString(settings.number)) { return createError('number should be string') }
  if (!isBool(settings.prompt)) { return createError('prompt should be bool') }

  const url = `${Platform.OS === 'ios' && settings.prompt ? 'telprompt:' : 'tel:'}${settings.number}`

  return openLink(url)
}


const InformationScreen = ({ route, navigation }) => {

    const { renderData , itemID } = route.params;
    const [visibleAsk, setVisibleAsk] = React.useState(false);
    const [confirmDel,setConfirmDel] = React.useState(false);
    const deleteID = async () => {
      await db.collection('FalseReported').doc(itemID).set({
        reported: firebase.firestore.FieldValue.serverTimestamp()
      },{merge: true});

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }


    const VerifyDelete = () => {
      return(
        <Modal visible={visibleAsk} onDismiss={()=>{setVisibleAsk(false)}} contentContainerStyle={{borderRadius: 10,backgroundColor: 'white', padding: 20,marginHorizontal:'10%'}}>
                  <View style={{justifyContent: 'space-between',alignItems: 'center'}}>
                      <Subheading style={{textAlign: 'center'}}>{"Reporting Information False...\n\nAre you Sure?"}</Subheading>
                      <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginTop:'10%'}}>
                      <Button icon="" style={{marginRight:'5%',backgroundColor:'#29bb89'}} mode="contained" onPress={ () => {
                        setVisibleAsk(false);
                        setConfirmDel(true);
                        deleteID();
                  }}>
                    Yes
                  </Button>
                  <Button icon="" style={{marginLeft:'5%',backgroundColor: '#fb3640'}} mode="contained" onPress={() => setVisibleAsk(false)}>
                   No
                  </Button>
                </View> 
                </View> 
                
        </Modal>

      )
    }

    const DeleteModal = () => {
      return(

        <Modal visible={confirmDel} dismissable contentContainerStyle={{backgroundColor: 'white', padding: 20,marginHorizontal:'20%',borderRadius:10}}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <ActivityIndicator style={{marginRight:'5%'}} size="large" color="#0000ff" />
            <Subheading >Submiting False Information Report...</Subheading>
        </View> 
      </Modal>
        
      )
    }


    

    function DialPrimary(){
        const args = {
            number: renderData.primaryContact,
            prompt: true,
          };
          // Make a call
          call(args).catch(console.error);
    }
    function DialSecondary(){
        const args = {
            number: renderData.secondaryContact,
            prompt: true,
          };
          // Make a call
          call(args).catch(console.error);

    }
    return (

      <Provider>
        <ScrollView>
        <SafeAreaView style={{flex: 1 , justifyContent: 'space-between'}}>
            <View style={styles.titleContainer}>
                <Text style={styles.screenTitle}>{"Contact Information"}</Text>
            </View>
            <Card style={{ marginTop:'10%',marginHorizontal: '5%', marginBottom:'10%',borderRadius: 10, alignItems: 'center'}}>
                <Card.Content>
                    <Text style={styles.userName}>{renderData.agencyName}</Text>
                    <Subheading style={{fontSize:12, textAlign: 'center'}}>{renderData.agencyArea} {renderData.agencyCity}</Subheading>
                    <Paragraph style={{textAlign: 'center'}}>{renderData.desc}</Paragraph>
                    <View style={{marginTop:'10%',flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginHorizontal:'5%', width:'90%'}}>
                      <Paragraph style={{fontSize: 15, fontWeight: 'bold'}}>Primary: {renderData.primaryContact}</Paragraph>
                      <Button mode="outlined" labelStyle={{fontSize:10}} style={{width: '5%',}} onPress={() =>{
                          Clipboard.setString(renderData.primaryContact);
                      } 
                      
                      }>Copy</Button>
                    </View>
                    
                    { 
                        renderData.secondaryContact === '0' ? null : <View style={{marginTop:'5%',flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginHorizontal:'5%'}}>
                        <Paragraph style={{fontSize: 15, fontWeight: 'bold'}}>Secondary: {renderData.secondaryContact}</Paragraph>
                        <Button mode="outlined" labelStyle={{fontSize:10}} style={{width: '5%',}} onPress={() => Clipboard.setString(renderData.secondaryContact)}>Copy</Button>
                      </View>
                    }
                    {/* {
                      renderData.whatsapp ? <Button icon="whatsapp" style={{backgroundColor: '#4FCE5D',marginTop:'10%'}} mode="contained" onPress={()=> {Linking.openURL(`https://wa.me/${renderData.primaryContact}`)}}>Message on Whatsapp</Button> : null
                    } */}
                    <Button icon="phone" style={{backgroundColor: '#29bb89',marginTop:'7%'}} mode="contained" onPress={()=> DialPrimary()}>Call Primary Number</Button>
                    
                    { 
                        renderData.secondaryContact === '0' ? null : <Button icon="phone" style={{backgroundColor: '#29bb89',marginTop:'5%'}} mode="contained" onPress={()=> DialSecondary()}>Call Secondary Number</Button>
                    }
                </Card.Content>
            </Card>
            <View style={{marginBottom: '15%',alignItems: 'center'}}>
            <Button icon={()=> (<Feather name="trash-2" size={22} color="white" />)} mode="contained" style={{width:'85%',backgroundColor: '#e84545'}} onPress={()=>{setVisibleAsk(true)}}>
              Report this Information False
            </Button>
            {
                <Portal>
                   {visibleAsk ? <VerifyDelete/>: <DeleteModal />}
                </Portal>
            }
            </View>

        </SafeAreaView>
        </ScrollView>
      </Provider>
    )
}

export default InformationScreen

const styles = StyleSheet.create({
    titleContainer:{
        alignItems: 'center',
        marginTop: '10%',
    },
    screenTitle:{
        fontFamily: 'VarelaRound_400Regular' , fontSize: 30
    },
    userName:{
        fontFamily: 'Inter_500Medium', 
        fontSize: 37,
        textAlign: 'center'
    }


})
