import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import start from '../assets/start.png';
import stop from '../assets/stop.png';
export default class ExampleApp extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      videos: [],
      isUploading: false,
      visible: true,
      recording: false,
      duration: 10,
      timer: null,
    };
  }

  updateTimer = () => {
    let timer = setInterval(() => {
      let {duration} = this.state;

      if (duration === 0) {
        clearInterval(timer);
      } else {
        this.setState({
          duration: duration - 1,
        });
      }
    }, 1000);
    this.setState({timer});
  };
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
              flashMode={RNCamera.Constants.FlashMode.on}
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
              captureAudio={true}
            />
            <View style={{flex: 0}}>
              <Text
                style={{
                  fontSize: 30,
                  color: 'green',
                  alignSelf: 'center',
                }}>{`00: ${
                this.state.duration.toString().length === 1
                  ? '0' + this.state.duration
                  : this.state.duration
              }`}</Text>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.takeVideo.bind(this)}>
                  {!this.state.recording ? (
                    <Image source={start} />
                  ) : (
                    <Image source={stop} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={this.done.bind(this)}>
                  <Text style={{fontSize: 14}}> Done </Text>
                </TouchableOpacity>
              </View>
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
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
    }
  };

  takeVideo = async () => {
    if (this.camera) {
      if (!this.state.recording) {
        this.setState({recording: true, duration: 10}, () => {
          console.log('in if start', this.state.recording);
          this.updateTimer();
          this.startRe();
        });
      } else {
        this.setState(
          {
            recording: false,
            duration: 0,
          },
          () => {
            console.log('in else stop', this.state.recording);
            clearInterval(this.state.timer);
            this.stopRe();
          },
        );
      }
    }
  };

  startRe = async () => {
    console.log('start');
    if (this.camera) {
      try {
        const options = {
          quality: 0.5,
          videoBitrate: 8000000,
          maxDuration: 10,
        };
        const data = await this.camera.recordAsync(options);
        if (data) {
          this.setState(
            {
              videos: this.state.videos.concat(data),
              recording: false,
              duration: 10,
            },
            () => {
              console.log(this.state.videos);
            },
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  stopRe = async () => {
    console.log('stop');
    await this.camera.stopRecording();
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
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 40,
    marginVertical: 10,
  },
});
