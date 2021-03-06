import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import userImg from "../assets/thefalked.jpg";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{title}</Text>
        <Text style={styles.name}>{subtitle}</Text>
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
    paddingVertical: 40,
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
