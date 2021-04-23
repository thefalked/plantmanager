import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardProps extends RectButtonProps {
  left: number;
  data: {
    name: string;
    photo: string;
  };
}

export function PlantCard({ data, left, ...rest }: PlantCardProps) {
  return (
    <RectButton style={[styles.button, !!left && styles.leftButton]} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 16,
  },
  leftButton: {
    marginRight: 0,
    marginLeft: 8,
  },
  text: {
    fontSize: 13,
    lineHeight: 23,
    fontFamily: fonts.heading,
    color: colors.heading,
    paddingTop: 10,
  },
});
