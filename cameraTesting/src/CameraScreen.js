import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Shutter from '../assets/shutter.png';

export default class CameraScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      pictures: [],
      visible: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible && (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={styles.capture}
                onPress={this.done.bind(this)}>
                <Text style={{fontSize: 30, color: 'red'}}> Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={{flex: 0, marginRight: 10}}>
                <Image source={Shutter} style={{height: 100, width: 100}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.capture}
                onPress={this.done.bind(this)}>
                <Text style={{fontSize: 30, color: 'red'}}> Done </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!this.state.visible && (
          <View
            style={{flex: 1, flexDirection: 'column', backgroundColor: 'pink'}}>
            <TouchableOpacity
              style={styles.capture}
              onPress={() => {
                this.openCamera();
              }}>
              <Text style={{fontSize: 14}}> openCamera </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: false};
      const data = await this.camera.takePictureAsync(options);
      this.setState({pictures: this.state.pictures.concat(data)});
      console.log(this.state.pictures);
    }
  };

  done = () => {
    this.setState({visible: false});
  };
  openCamera = () => {
    this.setState({visible: true});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    alignSelf: 'center',
    margin: 20,
  },
});
