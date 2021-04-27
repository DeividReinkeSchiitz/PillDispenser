import React, {useState} from "react";

import "moment/locale/pt-br";
import "./config/statusBarConfig";

import {SafeAreaProvider} from "react-native-safe-area-context";

import Constants from "expo-constants";
import firebase from "./config/firebaseConfig";
import Navigation from "./navigation";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import useFirebaseUid from "./hooks/useFirebaseUid";


import ContextUserUid from "./context/ContextUserUid";
import ContextIsDeleting from "./context/ContextIsDeleting";
import ContextAllAlarmIsSelected from "./context/ContextAllAlarmIsSelected";
import ContextSubmited from "./context/ContextSubmited";

import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const uid = useFirebaseUid();

  const [isDeleting, setIsDeleting] = useState(false);
  const [allAlarmIsSelected, setAllAlarmIsSelected] = useState(false);
  const [submited, setSubmited] = useState(false);

  const changeAllAlarmsIsSelected = (value?:boolean) => {
    setAllAlarmIsSelected((state)=> value || !state);
  };

  const changeIsDeleting = (value?:boolean) =>{
    setIsDeleting((state)=>value || !state);
  };

  const changeSubmited = (value?:boolean) => {
    setSubmited((state)=> value || !state);
  };

  if (!isLoadingComplete || !uid) {
    return (
      <AppLoading
        onError={console.warn}
        autoHideSplash
        onFinish={()=>{
          SplashScreen.hideAsync();
        }}
      />
    );
  } else {
    return (
      <ContextUserUid.Provider value={uid || ""} >
        <ContextIsDeleting.Provider value={{isDeleting, changeIsDeleting}}>
          <ContextAllAlarmIsSelected.Provider value={{allAlarmIsSelected, changeAllAlarmsIsSelected}}>
            <ContextSubmited.Provider value={{submited, changeSubmited}}>

              <SafeAreaProvider style={{marginTop: Constants.statusBarHeight}}>
                <Navigation />
              </SafeAreaProvider>

            </ContextSubmited.Provider>
          </ContextAllAlarmIsSelected.Provider>
        </ContextIsDeleting.Provider>
      </ContextUserUid.Provider >
    );
  }
}
