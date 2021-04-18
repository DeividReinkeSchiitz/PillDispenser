import styled from "styled-components/native";
import Trash from "../../assets/icons/Trash.svg";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {Animated} from "react-native";

export const Container = styled(Animated.View)`
   position:absolute;
   bottom:0;
   height:80px;
   width:100%;

   justify-content:center;
   align-items:center;
   background-color:${Colors.dark};
`;
export const DeleteButton = styled.TouchableOpacity`
`;

export const DeleteText = styled.Text`
   color:white;
   font-family:${Fonts.text}
`;

export const TrashIcon = styled(Trash)``;
