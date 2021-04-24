import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { formatDistance } from "date-fns/esm";
import { pt } from "date-fns/locale";

import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { TimePlantCard } from "../components/TimePlantCard";

import {
  loadPlants,
  PlantProps,
  removePlant,
  StoragePlantProps,
} from "../libs/storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterdropImg from "../assets/waterdrop.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏🏼",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            return ToastAndroid.showWithGravity(
              "Não foi possível remover 😥, tente novamente",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterd(`Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}`);

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas" />

      <View style={styles.wrapper}>
        <View style={styles.spotlight}>
          <Image source={waterdropImg} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWaterd}</Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próximas regadas</Text>
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TimePlantCard
                data={item}
                handleRemove={() => handleRemove(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 32,
  },
  spotlight: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.blue_light,
  },
  spotlightImage: {
    width: 56,
    height: 56,
    marginRight: 24,
  },
  spotlightText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: fonts.text,
    color: colors.blue,
  },
  plants: {
    flex: 1,
    marginTop: 40,
  },
  plantsTitle: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    marginBottom: 16,
  },
});
