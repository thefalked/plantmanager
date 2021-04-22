import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { PlantCard } from "../components/PlantCard";
import { Load } from "../components/Load";

import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: number;
  name: string;
  photo: string;
  environments: [string];
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  function handleEnvironmentSelected(environment: EnvironmentProps) {
    setEnvironmentSelected(environment.key);

    if (environment.key === "all") {
      return setFilteredPlants(plants);
    } else {
      const filteredPlants = plants.filter((plant) =>
        plant.environments.includes(environment.key)
      );
      return setFilteredPlants(filteredPlants);
    }
  }

  function loadMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    getPlants();
  }

  async function getPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setLoadedAll(true);

    if (page > 1) {
      setPlants((oldData) => [...oldData, ...data]);
      setFilteredPlants((oldData) => [...oldData, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    async function getEnviroment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );

      setEnvironments([{ key: "all", title: "Todos" }, ...data]);
    }

    getEnviroment();
    getPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.wrapper}>
        <View style={styles.heading}>
          <Text style={styles.title}>Em qual hambiente</Text>
          <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
        </View>

        <View style={styles.environmentList}>
          <FlatList
            data={environments}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <EnvironmentButton
                key={item.key}
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item)}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.plantsList}>
        <FlatList
          data={filteredPlants}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => loadMore(distanceFromEnd)}
          renderItem={({ item, index }) => (
            <PlantCard key={item.id} left={index % 2} data={item} />
          )}
          ListFooterComponent={
            loadingMore && !loadedAll ? (
              <ActivityIndicator color={colors.green} />
            ) : (
              <></>
            )
          }
        />
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
    paddingHorizontal: 32,
  },
  heading: {
    marginTop: 30,
  },
  title: {
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subTitle: {
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  environmentList: {
    height: 40,
    marginTop: 24,
  },
  plantsList: {
    flex: 1,
    marginBottom: 40 - 16,
    marginTop: 40,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
