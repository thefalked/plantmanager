import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import userImg from "../assets/thefalked.jpg";

export function Header() {
  const [userName, setUserName] = useState<string>();
  useEffect(() => {
    async function getUserName() {
      const name = await AsyncStorage.getItem("@plantmanager:user_name");

      setUserName(name || "Amiguinho");
    }

    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>{userName}</Text>
      </View>
      <Image style={styles.photo} source={userImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  name: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 30,
  },
});
