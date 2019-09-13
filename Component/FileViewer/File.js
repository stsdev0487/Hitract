import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Type} from 'Hitract/Api';
import {align, color, font, letting} from 'Hitract/UI';
import FileIcon from 'Hitract/assets/icons/file.svg';

const ui = StyleSheet.create({
  container: {
    alignItems: align.center,
    width: 105,
    height: 106,
    borderRadius: 14,
    padding: letting.half,

    justifyContent: align.center,

    shadowColor: color.black,
    backgroundColor: color.white,

    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6
  },
  text: {
    marginTop: letting.half,
    color: color.cream,
    fontSize: font.single,
    textAlign: align.center
  }
});

export default function File({ documentName, path, openFile }) {
  return (<TouchableOpacity style={ui.container} onPress={() => openFile(path)}>
      <FileIcon width={120} height={40} />
      <Text numberOfLines={1} style={ui.text}>{documentName}</Text>
    </TouchableOpacity>);
}

File.propTypes = {
  documentName: Type.string.isRequired,
  openFile: Type.func.isRequired,
  path: Type.string.isRequired
};
