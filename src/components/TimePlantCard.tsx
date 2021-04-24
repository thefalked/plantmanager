import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface TimePlantCardProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export function TimePlantCard({
  data,
  handleRemove,
  ...rest
}: TimePlantCardProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={24} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.button} {...rest}>
        <SvgFromUri uri={data.photo} width={55} height={65} />
        <Text style={styles.text}>{data.name}</Text>
        <View style={styles.buttonInfo}>
          <Text style={styles.buttonInfoText}>Regar às</Text>
          <Text style={styles.buttonInfoTime}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  buttonRemove: {
    width: 120,
    height: 96,
    backgroundColor: colors.red,
    marginTop: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 25,
    marginRight: -25,
    paddingLeft: 20,
  },
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
