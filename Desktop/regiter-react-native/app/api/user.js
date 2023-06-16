
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";


export const signIn = async (email,password) => {
    try {
        const signInRes = await client.post('/sign-in', {
            email,
            password,
         })
         if( signInRes.data.success ) {
              const token = signInRes.data.token
             await AsyncStorage.setItem('token',token)
         }
         return signInRes
         } catch (error) {
                console.log(error.message);
        }
    }

    // logout

    export const signOut = async () => {
        try {
           const token = await AsyncStorage.getItem('token')
            if (token !== null ) {
                 const resp = await client.get('/sign-out',{
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
            if ( resp.data.success) {
                    await AsyncStorage.removeItem('token')
                    return true;
            }
         }
            return false;
        } catch (error) {
            console.log(error.message);
            return false
        }
    }