import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/core";
import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  async function handleSubmit() {
    if (!name) {
      return ToastAndroid.showWithGravity(
        "Me diz como posso te chamar 😥",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }

    try {
      await AsyncStorage.setItem("@plantmanager:user_name", name);

      navigation.navigate("Confirmation");
    } catch (e) {
      return ToastAndroid.showWithGravity(
        `Algo deu errado 😥, tente novamente`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>
              <Text style={styles.title}>
                Como podemos{"\n"}
                chamar você?
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <Button title="Confirmar" onPressOut={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 54,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  input: {
    width: "100%",
    fontSize: 18,
    textAlign: "center",
    padding: 12,
    marginVertical: 40,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
  },
});
