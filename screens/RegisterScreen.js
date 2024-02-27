import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { connect } from 'react-redux';

const RegisterScreen = ({ipAddress}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  

  const navigation = useNavigation()

  const handleRegister = () => {
    const user = { name, email, password }
    axios.post(`${ipAddress}/register`, user).then((res) => {
      console.log(res.data);
      Alert.alert("User created successfully", "Please check your email for verification")
      setEmail("")
      setPassword("")
      setName("")
    }).catch((err) => {
      Alert.alert("Registration Failed", "An error occurred during registration")
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
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>Register to your Account</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
            <Ionicons style={{ marginLeft: 8 }} name="person" size={24} color="gray" />
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholderTextColor={"gray"} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder="Enter your Name" />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
              <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
              <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={"gray"} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder="Enter your Email" />
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
              <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />
              <TextInput secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor={"gray"} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder="Enter your Password" />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <Text>Keep me logged in</Text>
            <Text style={{ fontWeight: "500", color: "#007FFF" }}>Forgot Password?</Text>
          </View>
        </View>

        <View style={{ marginTop: 45 }} />

        <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "black", padding: 15, marginTop: 40, marginLeft: "auto", marginRight: "auto", borderRadius: 6 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>Already have an account? Sign In</Text>
        </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  ipAddress: state.ipAddress,
});

export default connect(mapStateToProps) (RegisterScreen)

const styles = StyleSheet.create({})