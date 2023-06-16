import React, { useState } from 'react';
import {TouchableOpacity,Image, View, StyleSheet, Text } from 'react-native';
import { useLogin } from '../context/LoginProvider';
import { signOut } from '../api/user';

const UserProfile = () => {

  const imagen = require('../../assets/perfil.jpg');

 
  const [profileImage, setProfileImage] = useState('');
 const { setIsLoggedIn, profile,setLoadingPending  } = useLogin();


 const openImageLibrary = async ({navigation}) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }

  if (status === 'granted') {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!response.cancelled) {
      setProfileImage(response.uri);
    }
  }
};



const uploadProfileImage = async () => {
  const formData = new FormData();
  formData.append('profile', {
    name: new Date() + '_profile',
    uri: profileImage,
    type: 'image/png',
  });

  try {
    const res = await client.post('/upload-profile', formData, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        authorization: `JWT ${token}`,
      },
    });

    // if (res.data.success) {
    //   navigation.dispatch(StackActions.replace('UserProfile'));
    // }
  } catch (error) {
    console.log(error.message);
  }
};



  return (
    <View>
      <View>
        <Text>User profile</Text>
      </View>
    <View style={styles.container}
      onPress={uploadProfileImage}
    >
   <TouchableOpacity>
   <Image
        onPress={openImageLibrary}
       source={{
         uri:
           profile.avatar ||
           imagen,
       }}
       style={styles.profilePicture}
     />
   </TouchableOpacity>
 <Text style={styles.profileName}>User Name {profile.fullname} </Text>
 <Text style={styles.profileBio}>Email {profile.email} </Text>
 <View style={styles.profileDetails}>
 </View>
 <TouchableOpacity
   style={{
    marginTop:10
   }}
   // salir de la app
   onPress={ async () => { 
    console.log('salir')
     setLoadingPending(true)
     const isLoggedOut = await signOut()
     if ( isLoggedOut ) {
          setIsLoggedIn(false)
     }
     setLoadingPending(false)
   }}
 >
   <Text>Log Out</Text>
 </TouchableOpacity>
</View>
</View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileBio: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  profileDetails: {
    marginTop: 20,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
});
export default UserProfile;
