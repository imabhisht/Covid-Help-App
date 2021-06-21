import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import {
  useFonts,
  Inter_900Black, Inter_500Medium 
} from '@expo-google-fonts/inter';  
import { Roboto_500Medium, Roboto_700Bold 
} from '@expo-google-fonts/roboto';
import { KronaOne_400Regular } from '@expo-google-fonts/krona-one';
import { VarelaRound_400Regular } from '@expo-google-fonts/varela-round';



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    Inter_500Medium, Roboto_500Medium, Roboto_700Bold,KronaOne_400Regular,VarelaRound_400Regular
  });

  if (!isLoadingComplete && !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
