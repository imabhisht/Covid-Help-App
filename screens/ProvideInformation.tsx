import React from 'react'
import { StyleSheet, Text, View, ScrollView , LogBox, ActivityIndicator } from 'react-native'
import {SafeAreaView} from  'react-native-safe-area-context';
import {Modal,HelperText,Portal, TextInput , Title ,Caption, Subheading, Button, Menu, Divider, Provider} from 'react-native-paper';
import fireabase from 'firebase';
import {db} from '../firebase';

const ProvideInformation = (props) => {
    LogBox.ignoreLogs(['Setting a timer']);
    const [cities, setcities] = React.useState([])
    const {help} = props.route.params;
    const [city,setCity] = React.useState("Select City")
    const [state,setState] = React.useState("Select State")
    const [cityVisible, setCityVisible] = React.useState(false);
    const [stateVisible, setStateVisible] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const openMenuCity = () => setCityVisible(true);
    const closeMenuCity = () => setCityVisible(false);
    const openMenuState = () => setStateVisible(true);
    const closeMenuState = () => setStateVisible(false);
    const [text, setText] = React.useState('');
    const [name,setName] = React.useState('');
    const [agency,setAgency] = React.useState('');
    const [area,setArea] = React.useState('');
    const [primary,setPrimary] = React.useState('');
    const [secondary,setSecondary] = React.useState('');
    const [modalText, setModalText] = React.useState('');
    const [modalNormal,setModalNormal] = React.useState(true);
    const loadavailableCities = async () => {
        let citiesAva = []
        const doc = await db.collection('data').doc('helped').get()
        const result = doc.data()["cities"]
        setcities(result);
        console.log(cities)
    }

    React.useEffect(() => {
        loadavailableCities();
        
    }, [])
    const hasErrors = () => {
        return !primary.includes('@');
      };

    function checkNumberPrimary(){
        if(primary.length > 0){
            return !(/^\d+$/.test(primary))
        }
        return false
    }

    function checkNumberSecondary(){
        if(secondary.length > 0){
            return !(/^\d+$/.test(secondary))
        }
        return false
    }

    

    async function submitToDatabase(){
        if((secondary.length > 0 && (/^\d+$/.test(secondary)))||(secondary.length === 0)){
            if(name.length > 0 && agency.length > 0 && city.length > 0 && area.length > 0 && primary.length > 0 && (/^\d+$/.test(primary))){
                if(secondary.length === 0){
                    try{
                        setModalText("Submitting Information...")
                        setModalNormal(false);
                        setVisible(true);
                        await db.collection(city).add({
                            agencyArea: area,
                            agencyCity: city,
                            agencyName: agency,
                            userName: name,
                            primaryContact: primary,
                            secondaryContact: '0',
                            help: help,
                            toBeShown: true
                        });
                        console.log(name,area,agency,primary,secondary,city);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });
                        setVisible(false);
                    } catch(e){
                        setModalNormal(true);
                        setVisible(false);
                        console.log(e);
                        setVisible(true);
                        setModalText("Error Occurred. Please Check your Internet Connection or Try again after sometime.")
                    }  
                }
                else{
                    try{
                        setModalText("Submitting Information...")
                        setModalNormal(false);
                        setVisible(true);
                        await db.collection(city).add({
                            agencyArea: area,
                            agencyCity: city,
                            agencyName: agency,
                            userName: name,
                            primaryContact: primary,
                            secondaryContact: secondary,
                            help: help,
                            toBeShown: true
                        });
                        console.log(name,area,agency,primary,secondary,city);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });
                        setVisible(false);
                    } catch(e){
                        setModalNormal(true);
                        setVisible(false);
                        console.log(e);
                        setVisible(true);
                        setModalText("Error Occurred. Please Check your Internet Connection or Try again after sometime.")
                    }  

                }   
            }
        }
        
        else{
            setVisible(true);
            setModalText("Check all the Information before Procedding. All Fields are Mandatory.")
        }

    } 

    const NoramlModal = () => {
        return(
            <Modal  visible={visible} onDismiss={hideModal} contentContainerStyle={{borderRadius: 5,backgroundColor: 'white', padding: 20, marginHorizontal: '10%'}} >
                <Subheading>{modalText}</Subheading>
            </Modal>
        )
    }

    const LoadingModal = () =>{
        return(
            <Modal dismissable={false} visible={visible} onDismiss={hideModal} contentContainerStyle={{borderRadius: 5,backgroundColor: 'white', padding: 25, marginHorizontal: '15%'}} >
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Subheading>{modalText}</Subheading>
                </View>       
            </Modal>
        )
    }


    return (
        <Provider>
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
            <View style={{alignItems: 'center',marginTop:'10%'}}>
                <Text style={styles.title}>Information for Help</Text>
            </View>

            <View style={{marginTop:"15%",marginHorizontal:"5%"}}>
                <TextInput
                    style={{width: '100%',height: 50}}
                    mode={"flat"} label="Your Name" placeholder={"Your Name"} value={name} onChangeText={text => setName(text)} />
                
                <TextInput
                    style={{width: '100%',height: 50, marginTop:"5%" }}
                    mode={"flat"} label="Provider / Agency Name" value={agency} onChangeText={text => setAgency(text)} />
                
                <View style={{flexDirection: 'row',  marginTop: '5%',marginLeft:'0%'}}>
                    {/* <View style={{paddingTop: 10,flexDirection: 'row',justifyContent: 'center',}}>
                        <Menu visible={stateVisible} onDismiss={closeMenuState} anchor={
                            <Button mode={"outlined"}style={{backgroundColor: "whitesmoke"}} labelStyle={{color:"gray"}} onPress={openMenuState} >{state}</Button>}>
                            <Menu.Item onPress={() => {setState("Gujarat");closeMenuState();}} title="Gujarat" />
                            <Menu.Item onPress={() => {}} disabled title="Madhya Pradesh" titleStyle={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} />
                            <Divider />
                            <Menu.Item onPress={() => {}} title="Maharashtra" disabled titleStyle={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} />
                        </Menu>
                    </View>   */}

                </View>
                <View style={{paddingTop: 5,flexDirection: 'row'}}>
                        <View>
                            <Menu visible={cityVisible} onDismiss={closeMenuCity} anchor={
                                <Button mode={"outlined"} style={{backgroundColor: "whitesmoke",width:"140%",paddingVertical: '7%'}} labelStyle={{color:"gray",textAlignVertical:'center'}} onPress={openMenuCity} >{city}</Button>}>
                                {
                                    cities.map((item,index)=>{
                                        return(
                                            <Menu.Item onPress={() => {setCity(item); closeMenuCity();}} title={item} />   
                                        )
                                    })
                                }
                                </Menu>
                        </View>    
                        <TextInput
                            style={{width: '50%',height: 50, marginLeft:"15%" }}
                            mode={"flat"} label="Area or District" value={area} onChangeText={text => setArea(text)} />
                </View> 

                <View style={{marginTop:'5%'}}>
                    <TextInput
                        style={{width: '100%',height: 50 }}
                        mode={"flat"} label="Primary Contact Number [Ex: Whatsapp]" value={primary} onChangeText={text => setPrimary(text)} />
                     <HelperText type="error" visible={checkNumberPrimary()}>
                        Invalid Phone Number.
                    </HelperText>
                    <TextInput
                        style={{width: '100%',height: 50, marginTop:'1%'}}
                        mode={"flat"} label="Secondary Contact Number [Optional]" value={secondary} onChangeText={text => setSecondary(text)} />
                    <HelperText type="error" visible={checkNumberSecondary()}>
                        Invalid Phone Number.
                    </HelperText>
               </View>
                <Button style={{marginTop:'3%',paddingVertical:5,backgroundColor:'#29bb89'}} icon="" mode="contained" onPress={submitToDatabase}>
                 Submit
            </Button>
            </View>
            </ScrollView>

            <Portal>
                { modalNormal ? <NoramlModal /> : <LoadingModal />}
            </Portal>

     
        </SafeAreaView>
        
        </Provider>
    )
}

export default ProvideInformation

const styles = StyleSheet.create({

    title:{
        fontFamily: 'VarelaRound_400Regular',
        fontSize: 23,
        marginHorizontal: '5%',
        textAlign: 'center',
    },
})
