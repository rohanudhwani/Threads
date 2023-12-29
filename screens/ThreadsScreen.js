import { StyleSheet, Text, View, Image, TextInputBase, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ThreadsScreen = () => {

    const [content, setContent] = useState("")

  return (
    <SafeAreaView style={{padding:10}}>
      <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        
        <Text>Rohan Udhwani</Text>
      </View>

      <View style={{flexDirection:"row", marginLeft:10, marginTop:12}}>
        <TextInput value={content} onChangeText={(text) => {setContent(text)}} placeholder="Type your message..." placeholderTextColor={"black"} multiline />
      </View>

      <View style={{marginTop:20}} />

      <Button title="Share Post"/>
    </SafeAreaView>
  )
}

export default ThreadsScreen

const styles = StyleSheet.create({})