import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { cloneElement, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {MaterialIcons, AntDesign} from '@expo/vector-icons'

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
              <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor={"gray"} style={{color:"gray", marginVertical:10, width:300, fontSize:password?16:16}} placeholder="Enter your password" />
            </View>
          </View>

          <View style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between", marginTop:12}}>
            <Text style={{fontWeight:"500", color:"#007FFF"}}>Keep me logged in</Text>
            <Text>Forgot Password?</Text>
          </View>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})