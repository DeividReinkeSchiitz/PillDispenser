import {useContext, useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import ContextIsDeleting from "../context/ContextIsDeleting";

const useTranslateY = () => {
  const {isDeleting} = useContext(ContextIsDeleting)!;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    if (isDeleting) {
      Animated.timing(translateY, {
        toValue: -80,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 500,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.linear,
        duration: 500,
      }).start();
    }
  }, [isDeleting]);

  return translateY;
};

export default useTranslateY;
