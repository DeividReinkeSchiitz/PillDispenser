import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import NoData from "../../assets/icons/NoData.svg";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export const NoDataContainer = styled.View`
   flex:1;
   align-items:center;
   justify-content:center;
`;

export const NoDataIcon = styled(NoData)`
   width:400px;
   height:400px;
`;

export const NoDataText = styled.Text`
   font-size:20px;
   font-family:${Fonts.text};
   text-align:center;
   margin:30px 40px;
`;

export const ContainerData = styled(Animated.ScrollView)`
   flex:1;
   padding-left:15px;
   padding-right:15px;
`;

export const Loading = styled.ActivityIndicator`
   margin-top:40px;
`;
