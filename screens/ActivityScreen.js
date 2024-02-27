import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { UserType } from '../UserContext'
import { connect } from 'react-redux';

import "core-js/stable/atob";
import User from '../components/User';

const ActivityScreen = ({ipAddress}) => {

    const [selectedButton, setSelectedButton] = useState("people")
    const [content, setContent] = useState("People Content")
    const [users, setUsers] = useState([])
    const { userId, setUserId } = useContext(UserType);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);

            axios
                .get(`${ipAddress}/user/${userId}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        };

        fetchUsers();
    }, []);


    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Activity</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
                    <TouchableOpacity onPress={() => handleButtonClick("people")} style={[
                        {
                            flex: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "white",
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 0.7,
                        },
                        selectedButton === "people" ? { backgroundColor: "black" } : null,
                    ]}
                    >
                        <Text style={[{ textAlign: 'center', fontWeight: "bold" }, selectedButton === "people" ? { color: "white" } : { color: "black" }]}>People</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleButtonClick("all")} style={[
                        {
                            flex: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "white",
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 0.7,
                        },
                        selectedButton === "all" ? { backgroundColor: "black" } : null,
                    ]}
                    >
                        <Text style={[{ textAlign: 'center', fontWeight: "bold" }, selectedButton === "all" ? { color: "white" } : { color: "black" }]}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleButtonClick("requests")} style={[
                        {
                            flex: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "white",
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 0.7,
                        },
                        selectedButton === "requests" ? { backgroundColor: "black" } : null,
                    ]}
                    >
                        <Text style={[{ textAlign: 'center', fontWeight: "bold" }, selectedButton === "requests" ? { color: "white" } : { color: "black" }]}>Requests</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {selectedButton === "people" && (
                        <View style={{marginTop:20, gap:15}}>
                            {users?.map((item, index) => (
                                <User key={index} item={item} ipAddress={ipAddress}/>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => ({
    ipAddress: state.ipAddress,
  });
  
  export default connect(mapStateToProps) (ActivityScreen)

const styles = StyleSheet.create({})