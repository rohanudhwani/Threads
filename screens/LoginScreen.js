import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { cloneElement, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {MaterialIcons, AntDesign} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';

const LoginScreen = ({ipAddress}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try{
        const token = await AsyncStorage.getItem("authToken")
        if(token){
          navigation.replace("Main")
        }
      } catch(error){
        console.log(error);
      }
    }

    checkLoginStatus()
  }, [])
  
  const handleLogin = () => {
    const user = { email, password }
    axios.post(`${ipAddress}/login`, user).then((res) => {
      console.log(res.data);
      const token = res.data.token
      AsyncStorage.setItem("authToken", token)
      Alert.alert("User logged in successfully")
      setEmail("")
      setPassword("")
      navigation.navigate("Main")
    }).catch((err) => {
      Alert.alert("Login Failed", "An error occurred during login")
      console.log(err);
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: 'center' }} >
      <View style={{ marginTop: 50 }} >
        <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={{ uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png" }} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignContent: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>Login to your Account</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{flexDirection:"row", alignItems:"center", gap:5, borderColor:"#D0D0D0", borderWidth:1, paddingVertical:5, borderRadius:5}}>
            <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="gray" />
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={"gray"} style={{color:"gray", marginVertical:10, width:300, fontSize:password?16:16}} placeholder="Enter your email" />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{flexDirection:"row", alignItems:"center", gap:5, borderColor:"#D0D0D0", borderWidth:1, paddingVertical:5, borderRadius:5}}>
              <AntDesign style={{marginLeft:8}} name="lock" size={24} color="gray" />
              <TextInput secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor={"gray"} style={{color:"gray", marginVertical:10, width:300, fontSize:password?16:16}} placeholder="Enter your password" />
            </View>
          </View>

          <View style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between", marginTop:12}}>
            <Text>Keep me logged in</Text>
            <Text style={{fontWeight:"500", color:"#007FFF"}}>Forgot Password?</Text>
          </View>
        </View>

        <View style={{marginTop:45}}/>

        <Pressable onPress={handleLogin} style={{width:200, backgroundColor:"black", padding:15, marginTop:40, marginLeft:"auto", marginRight:"auto", borderRadius:6}}>
          <Text style={{textAlign:"center", fontWeight:"bold", fontSize:16, color:"white"}}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop:20}}>
          <Text style={{textAlign:"center", fontSize:16}}>Don't have an account? Sign Up</Text>
        </Pressable>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  ipAddress: state.ipAddress,
});

export default connect(mapStateToProps) (LoginScreen)

const styles = StyleSheet.create({})