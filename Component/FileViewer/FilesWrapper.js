import React,{Fragment} from "react";
import {StyleSheet, View, SafeAreaView, Text , ScrollView} from "react-native";
import {Type} from 'Hitract/Api';
import {align, color, font, letting,viewport} from 'Hitract/UI';
import File from "./File";
import BrowseFiles from "./BrowseFiles";
import Document from "./Document";
import {Space} from '../Design';

const ui = StyleSheet.create({
    container: {
        width: viewport.width,
        paddingBottom: letting.double,
        flexWrap: align.wrap,
        flexDirection: align.row
    },
    scrollView:{
        overflow:'visible'
    },
    text: {
        ...font.variant.medium,
        //fontFamily: "Roboto-Medium",
        fontSize: font.medium,
        color: color.black,
        marginBottom: letting.medium
    }
});

export default function FilesWrapper({ title }) {
  const { documents, openFile, browseFiles } = Document();
  return (<SafeAreaView style={{marginBottom: letting.prime}}>
      <Text style={ui.text}>{title}</Text>
      <ScrollView style={ui.scrollView} horizontal containerViewStyle={ui.container}>
          {documents.map((document, key)=>{
              return <Fragment>
                  <File
                      key={key}
                      openFile={openFile}
                      path={document.path}
                      documentName={document.name}
                  />
                  <Space />
              </Fragment>;
          })}
          <BrowseFiles onPress={browseFiles}/>
      </ScrollView>

    </SafeAreaView>);
}

FilesWrapper.propTypes = {
  title: Type.string.isRequired
};
