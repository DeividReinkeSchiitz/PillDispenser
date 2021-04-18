import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Icon from "../../assets/icons/Plus.svg";

export const Container = styled.View`
   position:absolute;
   width:70px;
   height:70px;

   elevation:10;
   z-index:4;


   justify-content:center;
   align-items:center;
   align-self:center;
   flex:1;

   background-color: ${Colors.primary};
   bottom:20px;
   border-radius: 50px;
`;

export const PlusIcon = styled(Icon)`
   width:35px;
   height:35px;
`;

export const NavigateButton = styled.TouchableOpacity`
   justify-content:center;
   align-items:center;
   align-self:center;
   width:60px;
   height:60px;
`;
