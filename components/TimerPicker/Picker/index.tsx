import React, {useContext, useEffect, useRef, useState} from "react";
import {View} from "react-native";
import {PanGestureHandler} from "react-native-gesture-handler";

import {Container} from "./styles";
import MaskedView from "@react-native-community/masked-view";
import {LinearGradient} from "expo-linear-gradient";

import Animated, {useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler, Easing, useDerivedValue, runOnJS, cancelAnimation, sub} from "react-native-reanimated";
import {CONTAINER_HEIGHT, ITEM_HEIGHT} from "../constants";
import ContextSubmited from "../../../context/ContextSubmited";


const perspective = 850;
const z = 50;
interface PropsI {
   items: (number | string)[];
   initialIndex?:number;
   speed?:number;
   onValueChange:(v:string)=>void;
}

function Picker(props:PropsI) {
  const Y = useSharedValue(-ITEM_HEIGHT*props?.initialIndex! || 0);
  const count = useSharedValue(props?.initialIndex!*-1 || 0);
  const rotateX = useSharedValue(40);
  const rotateXN = useSharedValue(0);
  const {submited} = useContext(ContextSubmited)!;

  const first = useRef(true);

  const config:Animated.WithTimingConfig = {
    duration: props.speed,
  };


  useEffect(()=>{
    if (first.current) {
      first.current = false;
      return;
    }
    const item = props.items[count.value*-1 +1];
    props.onValueChange(item.toString());
  }, [submited]);

  const eventHandler = useAnimatedGestureHandler({
    onFinish: (event)=>{
      cancelAnimation(Y);
      cancelAnimation(rotateX);
      cancelAnimation(rotateXN);
      const newYvalue = Y.value + event.translationY;
      const countBackUp = count.value;

      if (newYvalue > Y.value) {
        count.value = count.value+1;
      } else {
        count.value = count.value-1;
      }

      if (count.value < -(props.items.length-2) || count.value > 0 ) {
        count.value = countBackUp;
        return;
      };

      Y.value = count.value * ITEM_HEIGHT;

      rotateX.value = withTiming(40, config);
      rotateXN.value = withTiming(0, config);
    },
  });


  const MaskElement = () => (
    <Animated.View style={[
      useAnimatedStyle(()=>({
        transform: [{translateY: withTiming(Y.value, {
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          ...config,
        })}],
      })), {width: "100%", margin: -2}]} >
      {props.items.map((v, i)=>(
        <Animated.Text style={[
          useAnimatedStyle(()=>({
            transform: [
              {perspective},
              {scale: (Math.abs(count.value)+1 ==i)? withTiming(perspective/(perspective-z), config): withTiming(1, config)},
              {translateX: (Math.abs(count.value)+1 ==i)? withTiming(-5, {duration: 200}): withTiming(0, {duration: 200})},
              {rotateX: `${(Math.abs(count.value)+1 ==i)? rotateXN.value:rotateX.value }deg`},
            ],
          })),
          {
            color: "black",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            height: ITEM_HEIGHT,
            width: "100%",
          },

        ]} key={i}> {v} </Animated.Text>
      ))}
    </Animated.View>
  );

  return (
    <View style={{flex: 1, width: "100%"}} >
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Container height={CONTAINER_HEIGHT}>
          <MaskedView
            style={{flex: 1, width: "100%", height: "100%", position: "relative"}}
            maskElement={
              <MaskElement/>
            }
          >
            <LinearGradient
              colors={["transparent", "#2F2F2F"]}
              style={{flex: 1}}
            />
            <View style={{flex: 0.5, backgroundColor: "#2F2F2F"}}/>
            <LinearGradient
              colors={["#2F2F2F", "transparent"]}
              style={{flex: 1}}
            />

          </MaskedView>
        </Container>
      </PanGestureHandler>
    </View>
  );
};

export default Picker;
