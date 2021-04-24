import React, { useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import wateringImg from "../assets/watering.png";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  useEffect(() => {
    async function getUserName() {
      const name = await AsyncStorage.getItem("@plantmanager:user_name");

      if (name) return navigation.navigate("PlantSelect");
    }

    getUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>

        <Image source={wateringImg} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas{"\n"}
          plantas. Nós cuidamos de lembrar você{"\n"}
          sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPressOut={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
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
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 38,
  },
  image: {
    width: Dimensions.get("window").width * 0.7,
    height: 284,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.text,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    fontSize: 24,
    color: colors.white,
  },
});
