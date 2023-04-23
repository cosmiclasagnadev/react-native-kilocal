import {View, Alert} from "react-native";
import {supabase} from "../supabase/initSupabase";
import {useUser} from "../components/userContextProvider";
import {computeTERAndMacro} from "../helpers";
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  ChevronRightIcon,
} from "native-base";
import React from "react";

const ConfirmStatsScreen = ({route}) => {
  const {
    height,
    weight,
    gender,
    lifestyle,
    idealWeight,
    userGoalWeight,
    formattedIdealWeightString,
  } = route.params;

  const {user, healthProfile, setRefresh, setHealthStatsToday} = useUser();

  const handleCreateHealthProfile = async () => {
    const {finalTER, finalCarbs, finalProtein, finalFat} = computeTERAndMacro(
      height,
      weight,
      gender,
      lifestyle
    );
    const {error, data} = await supabase
      .from("healthProfiles")
      .insert([
        {
          user_id: user.id,
          height,
          weight,
          gender,
          physicalActivity: lifestyle,
          goalWeight: userGoalWeight,
          kcalLimitPerDay: finalTER,
          macroCarbs: finalCarbs,
          macroProtein: finalProtein,
          macroFats: finalFat,
        },
      ])
      .select();
    if (error) {
      Alert.alert(error.message);
    }
    setHealthStatsToday({
      kcalToday: 0,
      carbsToday: 0,
      proteinToday: 0,
      fatsToday: 0,
    });
    setRefresh(true);
  };

  return (
    <Box
      flex={1}
      justifyContent="starts"
      alignItems="start"
      bgColor="primary.300"
      px="5"
      safeArea
    >
      <Heading size="xl" color="white">
        Confirmation
      </Heading>
      <Text fontSize="xl" style={{color: "white"}}>
        Please confirm your information below to get started:
      </Text>
      <VStack mt={8}>
        <Text fontWeight={700} color="white" fontSize="2xl">
          Height: {height}
        </Text>
        <Text fontWeight={700} color="white" fontSize="2xl">
          Weight: {weight}
        </Text>
        <Text fontWeight={700} color="white" fontSize="2xl">
          Biological sex: {gender}
        </Text>
        <Text
          fontWeight={700}
          color="white"
          fontSize="2xl"
          textTransform="capitalize"
        >
          Lifestyle: {lifestyle}
        </Text>
        <Text fontWeight={700} color="white" fontSize="2xl">
          Your chosen goal weight is: {userGoalWeight}
        </Text>
        <Box
          p="4"
          backgroundColor="amber.500"
          width="100%"
          borderRadius="md"
          my="5"
          shadow="5"
        >
          <Text fontWeight={700} color="white" fontSize="lg">
            Please note that your ideal weight is
          </Text>
          <Text fontWeight={700} color="white" fontSize="3xl">
            {formattedIdealWeightString}
          </Text>
          <Text fontWeight={700} color="white" fontSize="md">
            Please confirm that you would like to set your goal weight to this
          </Text>
        </Box>
        <Button
          backgroundColor="primary.100"
          _text={{color: "primary.300", fontWeight: "700"}}
          _pressed={{bg: "primary.200"}}
          size="md"
          mt={5}
          onPress={handleCreateHealthProfile}
          endIcon={<ChevronRightIcon color="primary.300" size={3} />}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default ConfirmStatsScreen;
