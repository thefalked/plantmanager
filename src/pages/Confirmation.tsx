import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  smile: "😁",
  hug: "🤗",
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handleConfirmation() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
        <Button title={buttonTitle} onPressOut={handleConfirmation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 96,
    marginBottom: 64,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.text,
    textAlign: "center",
    color: colors.heading,
    marginBottom: 40,
  },
});
