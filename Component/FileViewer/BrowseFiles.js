import React from "react";
import {StyleSheet, TouchableOpacity } from "react-native";
import Plus from "Hitract/assets/icons/plus.svg";
import {Type} from 'Hitract/Api';
import {color} from 'Hitract/UI';

const ui = StyleSheet.create({
    container: {
        width: 105,
        height: 106,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",

        shadowColor: color.black,
        backgroundColor: color.white,

        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6
    }
});

export default function BrowseFiles({ onPress }) {
  return (<TouchableOpacity style={ui.container} onPress={onPress}>
      <Plus width={30} height={30}/>
  </TouchableOpacity>);
}

BrowseFiles.propTypes = {
  onPress: Type.func.isRequired
};
