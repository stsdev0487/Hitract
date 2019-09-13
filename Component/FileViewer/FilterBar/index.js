import React from "react";
import {StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import {color} from 'Hitract/UI';


const ui = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        padding: 4,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: color.black,
        backgroundColor: color.white
    },
    input: {
        //fontFamily: "Roboto",
        fontSize: 20,

        marginRight: 10,
        width: "65%"
    },
    button: {
        backgroundColor: color.transparentShade,
        borderRadius: 25,

        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: "25%"
    },
    buttonText: {
        color: color.transparentBright,
        fontSize: 12,
        textAlign: "center",
        //fontFamily: "Roboto"
    }
});

export default function FilterBar() {
  return (<View style={ui.container}>
      <TextInput
          style={ui.input}
          placeholder={'Delat kursmaterial'}
          placeholderTextColor={color.cream}
      />
      <TouchableOpacity style={ui.button}>
          <Text style={ui.buttonText}>Se alla filer</Text>
      </TouchableOpacity>
  </View>);
}
