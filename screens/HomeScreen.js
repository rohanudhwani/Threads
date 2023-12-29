import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { UserType } from '../UserContext'

import "core-js/stable/atob";
import User from '../components/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    const fetchUsers = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);

    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})