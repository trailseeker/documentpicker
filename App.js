/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>


            <Button title="Open Document Picker" onPress={async () => {


              console.log("test click!");


              // Pick a single file
              try {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                });
                console.log(
                  res.uri,
                  res.type, // mime type
                  res.name,
                  res.size
                );
              } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                  throw err;
                }
              }

              // Pick multiple files
              try {
                const results = await DocumentPicker.pickMultiple({
                  type: [DocumentPicker.types.images],
                });
                for (const res of results) {
                  console.log(
                    res.uri,
                    res.type, // mime type
                    res.name,
                    res.size
                  );
                }
              } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                  throw err;
                }
              }



            }} />



            <Button title="Image Picker" onPress={async () => {





              // More info on all the options is below in the API Reference... just some common use cases shown here
              const options = {
                title: 'Your Attachment',
                
                storageOptions: {
                  skipBackup: true,
                  path: 'images',
                },
              };

              /**
               * The first arg is the options object for customization (it can also be null or omitted for default options),
               * The second arg is the callback which sends object: response (more info in the API Reference)
               */
              ImagePicker.showImagePicker(options, async (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  const source = { uri: response.uri };
                  const path = response.uri;
                  // You can also display the image using data:
                  // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                  console.log("source",source);
  
                  // create a native bridge function on IOS, which will compress the image quality (60%)  
                  const base64 = await RNFS.readFile(path, 'base64');

                  console.log("source",path);
                  console.log("update the base64 to microservice",base64);


                  // this.setState({
                  //   avatarSource: source,
                  // });
                }
              })

            }} />


          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
