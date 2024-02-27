import { StyleSheet, Text, View, Image, TextInputBase, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserType } from '../UserContext'
import axios from 'axios'

import { connect } from 'react-redux';


const ThreadsScreen = ({ipAddress}) => {

    const [content, setContent] = useState("")
    const {userId, setUserId} = useContext(UserType);

    const handlePostSubmit = () => {
        const postData = {
            userId, 
        }

        if(content) {
            postData.content = content;
        }

        axios.post(`${ipAddress}/create-post`, postData).then((response) => {
            setContent("")
        }).catch((err) => {
            console.log(err)
        })
    }

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

      <Button onPress={handlePostSubmit} title="Share Post"/>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  ipAddress: state.ipAddress,
});

export default connect(mapStateToProps) (ThreadsScreen)

const styles = StyleSheet.create({})