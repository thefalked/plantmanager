import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface TimePlantCardProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export function TimePlantCard({ data, ...rest }: TimePlantCardProps) {
  return (
    <RectButton style={styles.button} {...rest}>
      <SvgFromUri uri={data.photo} width={55} height={65} />
      <Text style={styles.text}>{data.name}</Text>
      <View style={styles.buttonInfo}>
        <Text style={styles.buttonInfoText}>Regar às</Text>
        <Text style={styles.buttonInfoTime}>{data.hour}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginLeft: 25,
  },
  buttonInfo: {
    marginLeft: "auto",
  },
  buttonInfoText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.body_light,
    fontFamily: fonts.text,
  },
  buttonInfoTime: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
});
