import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Confirmation() {
  const navigation = useNavigation();

  function handleConfirmation() {
    navigation.navigate("PlantSelect");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das suas{"\n"}
          plantinhas com muito cuidado.
        </Text>
        <Button title="Começar" onPressOut={handleConfirmation} />
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
