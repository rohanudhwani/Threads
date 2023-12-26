import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { cloneElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {MaterialIcons, AntDesign} from '@expo/vector-icons'

const LoginScreen = () => {
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
            <TextInput placeholderTextColor={"gray"} style={{color:"gray", marginVertical:10, width:300}} placeholder="Enter your email" />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{flexDirection:"row", alignItems:"center", gap:5, borderColor:"#D0D0D0", borderWidth:1, paddingVertical:5, borderRadius:5}}>
              <AntDesign style={{marginLeft:8}} name="lock" size={24} color="gray" />
              <TextInput placeholderTextColor={"gray"} style={{color:"gray", marginVertical:10, width:300}} placeholder="Enter your password" />
            </View>
          </View>

          <View>
            <Text style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between", marginTop:12}}>Keep me logged in</Text>
            <Text>Forgot Password?</Text>
          </View>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})