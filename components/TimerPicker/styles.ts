import styled, {css} from "styled-components/native";
import Colors from "../../constants/Colors";

interface propsI {
   height:number;
}

import {MIN_CONTAINER_WIDTH, ITEM_HEIGHT} from "./constants";

export const Container = styled.View`
   flex-direction:row;
   height:${(props:propsI)=>props.height}px;
   width:${MIN_CONTAINER_WIDTH}px;
   margin-top:10px;

   align-self:center;
`;

const borderViewCss = css`
   height: 1px;
   width: ${MIN_CONTAINER_WIDTH}px;
   position: absolute;

   background-color:${Colors.grey};
`;

export const BorderViewTop = styled.View`
   ${borderViewCss};
   top: ${ITEM_HEIGHT -3}px;
`;

export const BorderViewBottom = styled.View`
   ${borderViewCss};
   top: ${2*ITEM_HEIGHT-3}px;
`;

