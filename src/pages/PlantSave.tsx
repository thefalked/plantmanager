import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/core";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { Button } from "../components/Button";

import { PlantProps, savePlant } from "../libs/storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterdropImg from "../assets/waterdrop.png";

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const navigation = useNavigation();

  const route = useRoute();
  const { plant } = route.params as Params;

  const [selectedDatetime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePiker] = useState(Platform.OS === "ios");

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePiker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return ToastAndroid.showWithGravity(
        "Digite uma hora no futuro! ⏰",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (dateTime) return setSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePiker((oldState) => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDatetime });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle: `Fique tranquilo que sempre vamos
        lembrar você de cuidar da sua plantinha
        com bastante amor.`,
        icon: "hug",
        buttonTitle: "Muito obrigado :D",
        nextScreen: "MyPlants",
      });
    } catch (error) {
      return ToastAndroid.showWithGravity(
        "Não foi possível salver 😥, tente novamente",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}>{plant.name}</Text>

        <Text style={styles.plantDescription}>{plant.about}</Text>
      </View>
      <View style={styles.controllers}>
        <View style={styles.tipContainer}>
          <Image source={waterdropImg} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Ecolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDatetime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDatetime, "HH:mm")}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button
          title="Cadastrar Planta"
          style={styles.savePlant}
          onPress={handleSavePlant}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plantInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.shape,
    paddingHorizontal: 32,
    paddingTop: 30,
  },
  plantName: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginBottom: 16,
  },
  plantDescription: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: "center",
    marginBottom: 72,
  },
  controllers: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginBottom: getStatusBarHeight() || 20,
  },
  tipContainer: {
    position: "relative",
    bottom: "13%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.blue_light,
  },
  tipImage: {
    width: 56,
    height: 56,
    marginRight: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: fonts.text,
    color: colors.blue,
  },
  alertLabel: {
    fontSize: 13,
    lineHeight: 23,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: "center",
  },
  savePlant: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 56,
    width: "100%",
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 23,
    lineHeight: 32,
    fontFamily: fonts.text,
  },
});
