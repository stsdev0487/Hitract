import { useCallback, useState } from "react";
//import FileViewer from "react-native-file-viewer";
import DocumentPicker from "react-native-document-picker";

export default function  Document(){
  const [documents, setDocuments] = useState([]);

  const openFile = useCallback(async fileName => {
    try {
      await FileViewer.open(fileName);
    } catch (e) {
      console.log("Open files error:", e);
    }
  }, []);

  const browseFiles = useCallback(async () => {
    try {
      const document = await DocumentPicker.pick();
      const path = document.uri.replace("file://", "");
      const updatedDocuments = [...documents, { name: document.name, path }];

      setDocuments(updatedDocuments);
    } catch (e) {
      console.log("Browse files error:", e);
    }
  }, [documents]);

  return { documents, openFile, browseFiles };
};
