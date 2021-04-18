import styled from "styled-components/native";

import Animated from "react-native-reanimated";
import {MIN_CONTAINER_WIDTH} from "../constants";

interface propsC {
   height:number;
}

export const Container = styled(Animated.View)`
  flex:1;
  min-width: ${MIN_CONTAINER_WIDTH/3}px;
  height:${(props:propsC)=>props.height}px;
`;
