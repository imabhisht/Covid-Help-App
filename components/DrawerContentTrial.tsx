import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { AntDesign , MaterialCommunityIcons,SimpleLineIcons, Ionicons, MaterialIcons} from '@expo/vector-icons';

import {
    Menu,
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Divider,
    TouchableRipple,
    Switch,
    Button,
    Provider
} from 'react-native-paper';

const DrawerContentTrial = (props) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
    return (
      <Provider>
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <Drawer.Section style ={styles.drawerSection}>
                <DrawerItem 
                        icon={({color, size}) => (
                            <AntDesign 
                            name="home" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.reset({
                          index: 0,
                          routes: [{ name: 'Welcome' }],
                        });}}
                    />
                    <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="diving-scuba-tank" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Explore 0xygen Availability"
                            onPress={() => {
                              props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                              });
                            }}
                        />
                      
                      <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="ios-medical-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Explore Plasma Availability"
                            onPress={() => {
                              props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home2' }],
                              });
                            }}
                        />
                    <Divider />
                    <DrawerItem 
                            icon={({color, size}) => (
                                <AntDesign 
                                name="medicinebox" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Help People / Provide Details"
                            onPress={() => {props.navigation.navigate('SupportFirst')}}
                        />

                      {/* <View style={{alignItems: 'center',marginTop:'10%'}}>
                        <View
                          style={{
                            paddingTop: 50,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button  icon="city" style={{width:'50%',backgroundColor:'#f8f5f1'}} labelStyle={{color:'gray'}} mode="contained"  onPress={openMenu}>Show menu</Button>}>
                            <Menu.Item onPress={() => {}} title="Item 1" />
                            <Menu.Item onPress={() => {}} title="Item 2" />
                            <Divider />
                            <Menu.Item onPress={() => {}} title="Item 3" />
                          </Menu>
                        </View>
                      </View> */}
                      
                </Drawer.Section>
                
                
            </DrawerContentScrollView>
            <DrawerItem 
                            style={{justifyContent: 'flex-end',marginBottom: '5%'}}
                            icon={({color, size}) => (
                                <SimpleLineIcons 
                                name="info" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="About this Project"
                            onPress={() => {props.navigation.navigate('About')}}
                />
                
        </View>
      </Provider>
    )
}

export default DrawerContentTrial

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
