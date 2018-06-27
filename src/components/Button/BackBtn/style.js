/**
 * Created by lintong on 2018/6/26.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../index'
// {
//     backgroundColor: 'white',
//         width: (width - 50) / 3,
//         height: width / 3 * 1.3,
//         marginTop: 10,
//         marginHorizontal: 5,
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowColor: "#000000",
//         shadowOpacity: 0.2,
//         shadowRadius: 1,
//         shadowOffset: {
//         height: 3,
//             width: 2,
//     },
//     elevation: 10,
//         justifyContent: 'center'
// }


export const StyledContent = styled(Button)`
    background-color: white;
    justify-content: center;
    align-items: center;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 1px 3px;   
    elevation: 10;
    padding:15px;
    
    align-self: flex-start;
    flex-direction: row;
    margin:7.5px 5px 7.5px 0px;
`

export const StyledText = styled.Text`
  font-size: 15px;
`
