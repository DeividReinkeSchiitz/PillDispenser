import {useContext, useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import ContextIsDeleting from "../context/ContextIsDeleting";
import {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

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

interface Props {
  duration?:number;
}

const useTranslateYTop = (props?:Props) => {
  const {isDeleting} = useContext(ContextIsDeleting)!;
  const Y = useSharedValue(0);


  useEffect(()=>{
    if (isDeleting) {
      Y.value = withTiming(-80, {
        duration: props?.duration || 300,
      });
    } else {
      Y.value = withTiming(0, {
        duration: props?.duration || 300,
      });
    }
  }, [isDeleting]);

  return Y;
};


export default useTranslateYTop;
