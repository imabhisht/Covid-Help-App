import React from 'react'
import { StyleSheet, Text, View , TouchableOpacity, LogBox,Linking} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import navigation from '../../navigation';
import {HelperText, Button, Menu, Divider, Provider,Portal,Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../firebase';


const WelcomeScreen = ({ navigation , routes }) => {
    LogBox.ignoreLogs(['Setting a timer']);
    function toHome(){
        navigation.replace('Root', { screen: 'Home' })
    }

    const [update,setUpdate] = React.useState(false)
    const [modalVisible, setModeVisible] = React.useState(false);
    const showModal = () => setModeVisible(true);
    const hideModal = () => setModeVisible(false);
    const [link,setLink] = React.useState('');
    const [cities, setcities] = React.useState([])
    const [visible, setVisible] = React.useState(false);
    const [selectedCity,setSelectedCity] = React.useState('Select the City');
    const [oxygenEnable,setOxygenEnable] = React.useState(false);
    const [plasmaEnable,setPlasmaEnable] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    const loadavailableCities = async () => {
        const doc = await db.collection('data').doc('available').get()
        let result = doc.data()["cities"]
        setcities(result);
        console.log(cities)
    }

    const loadCurrentVerion = async () => {
        const docVersion = await db.collection('data').doc('currentVersion').get()
        let fetchedlink = docVersion.data()["urlToDownload"]
        setLink(fetchedlink)
        if(docVersion.data()["info"] > 1){
            setUpdate(true)
            setModeVisible(true);
            
            console.log("Updated Available")
        }
    }

    React.useEffect(() => {
        loadavailableCities();
        loadCurrentVerion();
        
    }, [])



    const OXYbuttonPressed = async () => {
        console.log(selectedCity);
        if(selectedCity === 'Select the City'){
            setOxygenEnable(true);
        }else{
            try {
                await AsyncStorage.setItem('@selectedCity', selectedCity)
              } catch (e) {
                console.log(e)
              }
            navigation.replace('Root', { screen: 'Home'})
        }
    }

    const PLAbuttonPressed = () => {
        console.log(selectedCity);
        if(selectedCity === 'Select the City'){
            setPlasmaEnable(true);
        }else{
            navigation.replace('Root', { screen: 'Home2'})
        }
    }


    const LoadCities = ({CityName}) => {
        return(
            <Menu.Item onPress={ () => {
                setSelectedCity(CityName);
                setVisible(false);
                setOxygenEnable(false);
                setPlasmaEnable(false);
    
              }} title={CityName} />
        )
    }



    const ModalShowUpdate = () => {
        return(
        <Modal dismissable visible={modalVisible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', borderRadius: 10 ,padding: 20,marginHorizontal:'10%'}}>
          <View style={{alignItems: 'center',justifyContent:'space-around'}}>
          <Text style={{fontSize: 24}}>New Version Available</Text>
          <Text style={{fontSize: 14, textAlign:'center',marginTop:'5%'}}>We have made some bugs fixes and improvements. Please Update the App as soon as Possible!!</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',width: '80%',marginTop:'10%'}}>
            <Button style={{backgroundColor: '#55e332', paddingHorizontal: '10%'}} mode={"contained"} onPress={() => {Linking.openURL(link);setModeVisible(false);}}>Yes</Button>
            <Button style={{backgroundColor: '#f03c3c',paddingHorizontal: '10%'}}mode={"contained"} onPress={() => {setModeVisible(false)} }>NO</Button>
        </View>

        </View>
        </Modal>
  
        )
    }

    return (
        <Provider>
            
        <SafeAreaView style={{flex:1 , backgroundColor: 'white'}}>
		<View style={[tailwind('items-center'),{marginTop: '20%'}]}>
                <Text style={styles.mainTitle}>
                 {"Covid Help"} 
                </Text>
		</View>
        

        <View style={{ paddingTop: 50,flexDirection: 'row',justifyContent: 'center',marginTop:"15%"}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button style={{ width:"100%",backgroundColor: 'white'}} labelStyle={{color:"#283655"}} onPress={openMenu} mode={'contained'}>{selectedCity}</Button>}>
          {
              cities.map((item,index)=>{
                return(
                    <Menu.Item onPress={ () => {
                        setSelectedCity(item);
                        setVisible(false);
                        setOxygenEnable(false);
                        setPlasmaEnable(false);
            
                      }} title={item} />   
                )
            })
          }
          <Divider />
          <Menu.Item onPress={() => {}} title="Reaching more Cities" />
        </Menu>
      </View>
      <Portal>
        {update ? <ModalShowUpdate /> : null}
    </Portal>

        <View style={{marginTop: '5%',alignItems: 'center'}}>
            <Button icon="" contentStyle={{paddingVertical:'3%',}} style={{backgroundColor:'#283655', width:"80%",borderColor:'gray'}} mode="contained" onPress={OXYbuttonPressed}>
                Oxygen Availability
            </Button>
            <HelperText style={{marginBottom: '2%', }} type="error" visible={oxygenEnable}>
                Please Select the City
            </HelperText>

            <Button icon="" contentStyle={{paddingVertical:'3%',}} style={{backgroundColor:'#283655', width:"80%",borderColor:'gray'}} mode="contained" onPress={PLAbuttonPressed}>
                Plasma Availability
            </Button>
            <HelperText style={{marginBottom: '5%'}} type="error" visible={plasmaEnable}>
                Please Select the City
            </HelperText>

            
        </View>

        <View style={{marginTop: '15%',alignItems: 'center'}}>
            <Button icon="" contentStyle={{paddingVertical:'1%',}} style={{marginBottom: '5%', width:"45%",borderColor:'gray'}} mode="contained" onPress={() => navigation.navigate('Root', { screen: 'SupportFirst'})}>
                    Want to Help ?
            </Button>
        </View>
        
        
	</SafeAreaView>
    
    

    </Provider>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({

    mainTitle:{
         fontFamily: 'VarelaRound_400Regular',
         fontSize: 55, 
         textAlign: 'center',
         letterSpacing: 0.25,
         color: '#393e46'  
    },

    btn:{
        marginTop:'10%',

        borderWidth: 1,
        width: '85%',
        paddingVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,        
    },
    btnText:{
        fontFamily: 'Roboto_500Medium',
        fontSize: 15,
        textTransform: 'uppercase'
    },


    btnA:{
        marginTop:'10%',
        width: '50%',
        paddingVertical: '2.75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,        
    },
    btnTextA:{
        fontFamily: 'Roboto_500Medium',
        fontSize: 15,
        textTransform: 'uppercase'
    }


    

})
