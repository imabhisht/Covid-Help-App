import React from 'react'
import { StyleSheet, Text, View, ScrollView , FlatList,LogBox, ActivityIndicator} from 'react-native'
import ItemElement from '../components/ItemElement'
import dataTest from '../testData/data1';
import {db} from '../firebase';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Caption , Button } from 'react-native-paper';




export default function HomePage2({navigation, route}) { 
    LogBox.ignoreLogs(['Setting a timer','Each child in a list should have a unique "key" prop']);
    const [data, setData] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [notShowData,setNotShowData] = React.useState(0);
    const [indexArray,setIndex] = React.useState([]);
    const fetchData = async () => {
        const selectedCity = await AsyncStorage.getItem('@selectedCity')
        setLoading(true);
        let notShownCount = 0;
        let dataArray = []
        let dataIndex = []
        await db.collection(selectedCity).where('help', '==', 'Plasma').get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                dataArray.push(doc.data())
                doc.data().toBeShown ? null : notShownCount++
                dataIndex.push(doc.id)
            })
        })
        setNotShowData(notShownCount);
        setData(dataArray);
        setIndex(dataIndex);
        setLoading(false);
    }
    React.useEffect(() => {
        fetchData();        
    }, [])

    const DispalyNothing = () => {

        return (
            <View style={{alignItems: 'center', paddingTop: '5%'}}>
                <Caption style={{fontSize: 13}}>Data Unavailable for the selected Location!</Caption>
                <Button icon="city" mode="outlined" onPress={() => {navigation.reset({
                          index: 0,
                          routes: [{ name: 'Welcome' }],
                        });}} style={{marginTop:'5%'}}>Change City?</Button>
            </View>
        )
    }
    
    const DispalyData = () => {

        return (
            <View>
                {data.length == 0 || data.length == notShowData ? <DispalyNothing /> : <DataItem />}
            </View>
        )
    }
    const DataItem = () => {
        return(
            <View>
                {
                    data.map((item,index)=>{
                        return(
                            item.toBeShown ? <ItemElement navigation={navigation} renderData={item} itemID={indexArray[index]}/> : null        
                        )
                    })
                }
            </View>
            
        )
    }

    const LoadingScreen = () => {
        return(
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center',}}>
                <ActivityIndicator  size="large" color="#0000ff" />
            </View>
            
        )
    }



    return (
        <ScrollView>
        <View style={styles.container}>
            {/* <FlatList
                    data={data}
                    renderItem={ ({item}) => <ItemElement renderData={item} />}
                    keyExtractor={item=> item.id}
            />  */}
            {
               loading ? <LoadingScreen /> : <DispalyData/>
            }
            
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})
