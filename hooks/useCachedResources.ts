import {Ionicons} from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Promise.all([
          Font.loadAsync({
            // ...
          }),
          Font.loadAsync({
            ...Ionicons.font,
            "MontserratBold": require("../assets/fonts/MontserratBold.ttf"),
            "MontserratRegular": require("../assets/fonts/MontserratRegular.ttf"),
            "MontserratMedium": require("../assets/fonts/MontserratMedium.ttf"),
          }),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
