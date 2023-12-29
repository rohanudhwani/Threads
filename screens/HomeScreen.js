import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { UserType } from '../UserContext'

import "core-js/stable/atob";
import User from '../components/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {

  const { userId, setUserId } = useContext(UserType);

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://192.168.1.106:3000/get-posts")

      setPosts(response.data)

    } catch (err) {
      console.log("error fetching posts", err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPosts()
    }, [])
  )

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://192.168.1.106:3000/posts/${postId}/${userId}/like`, { postId, userId })

      const updatedPost = response.data
      const updatedPosts = posts.map((post) => post?._id === updatedPost?._id ? updatedPost : post)

      setPosts(updatedPosts)
    } catch (err) {
      console.log("error liking post", err)
    }
  }

  return (
    <ScrollView style={{ marginTop: 25, flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{ width: 60, height: 40, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        {posts?.map((post) => (
          <View style={{ padding: 15, backgroundColor: "#D0D0D0", borderTopWidth: 1, flexDirection: "row", gap: 10, marginVertical: 10 }}>
            <View>
              <Image style={{ width: 40, height: 40, borderRadius: 20, resizeMode: "contain", }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png" }} />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}>{post?.user?.name}</Text>
              <Text>{post?.content}</Text>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 15 }}>

              {post?.likes?.includes(userId) ? (
                <AntDesign onPress={() => handleLike(post?._id)} name="heart" size={20} color="red" />
              ) : (
                <AntDesign onPress={() => handleLike(post?._id)} name="hearto" size={20} color="black" />
              )}
                

                <FontAwesome name="comment-o" size={20} color="black" />

                <Ionicons name="share-social-outline" size={20} color="black" />
              </View>

              <Text style={{ marginTop: 7, color: "gray" }}>{post?.likes.length} likes • {post?.replies.length} reply</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})