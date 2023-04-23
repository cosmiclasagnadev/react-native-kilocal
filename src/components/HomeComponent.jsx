import React from "react";
import {
  Box,
  VStack,
  Flex,
  Text,
  Heading,
  Avatar,
  Progress,
  Spacer,
  Pressable,
  AddIcon,
  ScrollView,
  Center,
} from "native-base";
import {useUser} from "./userContextProvider";
import {HomeMealCard} from "./HomeMealCard";

const HomeComponent = (props) => {
  const {handleSignOut, navigation} = props;
  const {
    healthProfile: {
      macroProtein,
      macroCarbs,
      macroFats,
      kcalLimitPerDay,
      weight,
    },
    healthStatsToday: {kcalToday, carbsToday, proteinToday, fatsToday},
    mealsToday,
  } = useUser();

  const navigateToAddMeal = () => {
    navigation.navigate("AddMealScreen");
  };

  return (
    <Box flex={1} justifyContent="start" bgColor="primary.300" safeArea>
      <VStack width="100%" space="2.5" mt="4" px={5}>
        <Flex
          minWidth="100%"
          justifyContent="flex-start"
          flexDirection="row"
          alignItems="center"
        >
          <Pressable onPress={handleSignOut}>
            <Avatar
              bg="primary.400"
              source={{
                uri: "https://avatars.githubusercontent.com/u/28593720?v=4",
              }}
            >
              AP
            </Avatar>
          </Pressable>
          <VStack space={0} ml={4}>
            <Text
              fontSize="md"
              style={{color: "white"}}
              fontWeight={700}
              mb={0}
            >
              Hi, Allen!
            </Text>
            <Text fontSize="md" style={{color: "white"}} fontWeight={400}>
              Your current weight is {weight}kg
            </Text>
          </VStack>
        </Flex>
        <Box bgColor="primary.200" p={5} rounded="xl" mt={2}>
          <Heading size="md" color="primary.500">
            Calories left
          </Heading>
          <Heading size="2xl" mb={3}>
            {kcalToday}{" "}
            <Text fontSize="lg">cal out of {kcalLimitPerDay} cal</Text>
          </Heading>
          <Progress
            size="xl"
            bg="primary.100"
            _filledTrack={{bg: "primary.300"}}
            value={(kcalToday / kcalLimitPerDay) * 100}
          />
          <Flex flexDirection="row">
            <Box bgColor="primary.200" p={3} rounded="lg" width="33%">
              <Text fontSize="sm">Carbs</Text>
              <Heading size="md" mb={2}>
                {carbsToday} <Text>g</Text>
              </Heading>
              <Progress
                size="md"
                bg="primary.100"
                _filledTrack={{bg: "primary.300"}}
                value={(carbsToday / macroCarbs) * 100}
              />
            </Box>
            <Spacer />
            <Box bgColor="primary.200" p={3} rounded="lg" width="33%">
              <Text fontSize="sm">Protein</Text>
              <Heading size="md" mb={2}>
                {proteinToday} <Text>g</Text>
              </Heading>
              <Progress
                size="md"
                bg="primary.100"
                _filledTrack={{bg: "primary.300"}}
                value={(proteinToday / macroProtein) * 100}
              />
            </Box>
            <Spacer />
            <Box bgColor="primary.200" p={3} rounded="lg" width="33%">
              <Text fontSize="sm">Fat</Text>
              <Heading size="md" mb={2}>
                {fatsToday} <Text>g</Text>
              </Heading>
              <Progress
                size="md"
                bg="primary.100"
                _filledTrack={{bg: "primary.300"}}
                value={(fatsToday / macroFats) * 100}
              />
            </Box>
          </Flex>
        </Box>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Heading color="white">Meal log</Heading>
          <Pressable opacity={1} py="3" onPress={navigateToAddMeal}>
            <AddIcon size="md" color="white" />
          </Pressable>
        </Flex>
        <ScrollView width="100%" height="96">
          {mealsToday.length > 0 &&
            mealsToday.map((meal) => (
              <HomeMealCard
                key={meal.id}
                name={meal.name}
                calories={meal.calories}
                carbs={meal.carbs}
                protein={meal.protein}
                fat={meal.fat}
                timestamp={meal.timestamp}
              />
            ))}
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default HomeComponent;
