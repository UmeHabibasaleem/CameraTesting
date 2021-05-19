/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
const RNFS = require('react-native-fs');

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-customized-image-picker';
import ExampleApp from './src/VideoCapture';
import CameraScreen from './src/CameraScreen';


const openPicker = () => {
  ImagePicker.openPicker({
    multiple: true,
    openCameraOnStart: true,
    multipleShot: true,
  //  isSelectBoth: true,
  //  isCamera: true,
  //  maxSize: 15,
  //  returnAfterShot: true,
 //   compressQuality: 50,
  //  minCompressSize: 200,
  }).then(images => {
    console.log(images);
    clearData();
    //deleteImageFile(images[0].path)
  });
};

const openVideoPicker = () => {
  ImagePicker.openPicker({
    multiple: true,
    isVideo: true,
    openCameraOnStart: true,
    isHidePreview: true,
    isHideVideoPreview: true,
    videoQuality: 0,
  })
    .then(images => {
      console.log(images);
      deleteImageFile(images[0].path);
    })
    .catch(error => {
      console.log(error);
    });
};

const openCameraForVideo = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    isVideo: true,
  }).then(image => {
    console.log(image);
  });
};

const openCameraForImage = () => {
  ImagePicker.openCamera({
    returnAfterShot: true,
  }).then(image => {
    console.log(image);
  });
};

const clearData = () => {
  ImagePicker.clean()
    .then(() => {
      console.log("removed all tmp images from tmp directory");
    })
    .catch(e => {
      console.log('error of clean', e);
    });
}

const deleteImageFile = (filepath)=> {
  // const filepath = `${dirPicutures}/${filename}`;
  RNFS.exists(filepath)
    .then( (result) => {
      console.log("file exists: ", result);

      if(result){
        RNFS.unlink(filepath)
          .then(() => {
            RNFS.scanFile(filepath);
            console.log('FILE DELETED');
          })
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch((err) => {
            console.log(err.message);
          });
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
}
const App: () => Node = () => {

/*  return (
    <View style={{justifyContent:"space-around", flex: 1}}>
      <Button onPress={openPicker} title="open camera picker" color="#841584" />
      <Button onPress={openVideoPicker} title="open video picker" color="#f194ff" />
      <Button
        onPress={openCameraForVideo}
        title="open camera for video"
        color="#841584"
      />
      <Button
        onPress={openCameraForImage}
        title="open camera for Image"
        color="#f194ff"
      />

      <Button
        onPress={clearData}
        title="clear data"
        color="#841584"
      />

    </View>
  ); */
  return(
    <CameraScreen/>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
