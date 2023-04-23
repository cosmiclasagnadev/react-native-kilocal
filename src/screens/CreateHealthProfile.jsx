import React, {useState, useEffect} from "react";
import {View, Text, Alert} from "react-native";
import {supabase} from "../supabase/initSupabase";
import {
  Box,
  Heading,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  VStack,
  Spinner,
  Select,
  ChevronDownIcon,
  ChevronRightIcon,
  Skeleton,
} from "native-base";
import {useUser} from "../components/userContextProvider";

const calculateIdealWeight = (height) => {
  // ignore prettier formatting
  // prettier-ignore
  return ((height - 100) - (0.1 * (height - 100)));
};

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const CreateHealthProfile = ({navigation}) => {
  const {user, healthProfile, setRefresh, isLoading} = useUser();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [idealWeight, setIdealWeight] = useState("");
  const [formattedIdealWeightString, setFormattedIdealWeightString] =
    useState("");
  const [inputLoad, setInputLoad] = useState(false);
  const [userGoalWeight, setUserGoalWeight] = useState("");
  const debouncedHeightInput = useDebounce(height, 500);

  useEffect(() => {
    if (height > 60) {
      setInputLoad(true);
      const newValue = calculateIdealWeight(height);
      setIdealWeight(newValue);
      setFormattedIdealWeightString(`${newValue - 5} kg to ${newValue + 5} kg`);
      setInputLoad(false);
    }
  }, [debouncedHeightInput]);

  const handleCreateHealthProfile = async () => {
    const {error, data} = await supabase
      .from("healthProfiles")
      .insert([
        {
          user_id: user.id,
          height,
          weight,
          physicalActivity: lifestyle,
          goalWeight: userGoalWeight,
        },
      ])
      .select();
    if (error) {
      Alert.alert(error.message);
    }
    setRefresh(true);
  };

  const proceedToConfirm = () => {
    navigation.navigate("ConfirmStatsScreen", {
      height,
      weight,
      lifestyle,
      idealWeight,
      userGoalWeight,
      formattedIdealWeightString,
      handleCreateHealthProfile,
    });
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="start"
      bgColor="primary.300"
      px="5"
      safeArea
    >
      <VStack width="100%" alignItems="start" space="2.5" mt="4">
        {isLoading ? (
          <Spinner color={"primary.100"} size="lg" />
        ) : (
          <>
            <Heading size="xl" color="white">
              Create Health Profile
            </Heading>
            <Text fontSize="xl" style={{color: "white"}}>
              Please fill out the following information to create your health
              profile and start on your journey to a healthier you!
            </Text>
            <FormControl w="100%">
              <Stack>
                <FormControl.Label>Height</FormControl.Label>
                <Input
                  value={height}
                  onChangeText={(text) => setHeight(text)}
                  size="lg"
                  type="number"
                  placeholder="Enter your height (in cm)"
                />
              </Stack>
              <Stack>
                <FormControl.Label>Weight</FormControl.Label>
                <Input
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                  }}
                  size="lg"
                  type="number"
                  placeholder="Enter your weight (in kg)"
                />
              </Stack>
              <Stack>
                <FormControl.Label>Describe your lifestyle</FormControl.Label>
                <Select
                  size="lg"
                  placeholder="Lifestyle"
                  dropdownIcon={
                    <ChevronDownIcon size={3} m={2} color="white" />
                  }
                  onValueChange={(itemValue) => setLifestyle(itemValue)}
                  required
                >
                  <Select.Item label="Sedentary" value="sedentary" />
                  <Select.Item label="Light" value="light" />
                  <Select.Item label="Moderate" value="moderate" />
                  <Select.Item label="Very Active" value="active" />
                </Select>
              </Stack>
              {height > 60 && height < 245 && (
                <Stack mt={5}>
                  <Heading color="white">Your ideal weight is</Heading>
                  <Heading size="2xl" color="white">
                    {formattedIdealWeightString}
                  </Heading>
                  <Text style={{color: "white", marginTop: 8}}>
                    Your ideal weight is what you should target as your
                    desirable body weight.
                  </Text>
                  <Input
                    mt={3}
                    value={userGoalWeight}
                    onChangeText={(text) => setUserGoalWeight(text)}
                    size="lg"
                    type="number"
                    placeholder="Enter your goal weight (in kg)"
                  />
                </Stack>
              )}
            </FormControl>
            <Button
              backgroundColor="primary.100"
              _text={{color: "primary.300", fontWeight: "700"}}
              _pressed={{bg: "primary.200"}}
              // width="75%"
              size="md"
              mt={5}
              onPress={() => {
                proceedToConfirm();
              }}
              endIcon={<ChevronRightIcon color="primary.300" size={3} />}
            >
              Continue
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default CreateHealthProfile;
