import React from "react";
import {
  Text,
  Center,
  Icon,
  HStack,
  Pressable,
  Heading,
  Box,
  VStack,
} from "native-base";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {supabase} from "../supabase/initSupabase";
import {useUser} from "../components/userContextProvider";
import HomeComponent from "../components/homeComponent";
import OptionsScreen from "../components/optionsComponent";

const truncateLongText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + " ...";
  }
  return text;
};

const renderNav = (props) => {
  const {selected, handleSignOut} = props;
  switch (selected) {
    case 0: {
      return <HomeComponent handleSignOut={handleSignOut} />;
    }
    case 1: {
      return (
        <Box flex={1} justifyContent="start" bgColor="primary.300" safeArea>
          <VStack width="100%" space="2.5" mt="4" px={5}>
            <Heading>Logs Screen</Heading>
          </VStack>
        </Box>
      );
    }
    case 2: {
      return <OptionsScreen handleSignOut={handleSignOut} />;
    }
  }
};

const HomeScreen = () => {
  const {user, setRefresh, session} = useUser();
  const [selected, setSelected] = React.useState(0);
  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setRefresh(false);
  };

  return (
    <>
      {/* <Box flex={1} justifyContent="start" bgColor="primary.300" safeArea>
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
                Your current weight is 67kg
              </Text>
            </VStack>
          </Flex>
          <Box bgColor="primary.200" p={5} rounded="xl" mt={2}>
            <Heading size="md" color="primary.500">
              Calories left
            </Heading>
            <Heading size="2xl" mb={3}>
              1650 <Text fontSize="lg">cal</Text>
            </Heading>
            <Progress
              size="xl"
              bg="primary.100"
              _filledTrack={{bg: "primary.300"}}
              value={76}
            />
            <Flex flexDirection="row">
              <Box bgColor="primary.200" p={3} rounded="lg" width="33%">
                <Text fontSize="sm">Carbs</Text>
                <Heading size="md" mb={2}>
                  150 <Text>g</Text>
                </Heading>
                <Progress
                  size="md"
                  bg="primary.100"
                  _filledTrack={{bg: "primary.300"}}
                  value={80}
                />
              </Box>
              <Spacer />
              <Box bgColor="primary.200" p={3} rounded="lg" width="33%">
                <Text fontSize="sm">Protein</Text>
                <Heading size="md" mb={2}>
                  60 <Text>g</Text>
                </Heading>
                <Progress
                  size="md"
                  bg="primary.100"
                  _filledTrack={{bg: "primary.300"}}
                  value={66}
                />
              </Box>
              <Spacer />
              <Box bgColor="primary.200" p={3} rounded="lg" width="33%">
                <Text fontSize="sm">Fat</Text>
                <Heading size="md" mb={2}>
                  32 <Text>g</Text>
                </Heading>
                <Progress
                  size="md"
                  bg="primary.100"
                  _filledTrack={{bg: "primary.300"}}
                  value={26}
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
            <AddIcon size="md" color="white" />
          </Flex>
          <ScrollView width="100%" height="96">
            <Box bgColor="primary.200" p={5} rounded="xl" mb={3}>
              <Flex flexDirection="row">
                <Image
                  size="xl"
                  rounded="xl"
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FEdit%2F2022-10-Chicken-Adobo%2FChicken_Adobo",
                  }}
                  alt="chicken adobo"
                />
                <VStack ml={4} space={0}>
                  <Heading size="md" color="primary.500">
                    10:00 AM Meal
                  </Heading>
                  <Text>
                    {truncateLongText("Chicken adobo with 2 bananas", 20)}
                  </Text>
                  <Text fontSize="lg" fontWeight={700}>
                    200{" "}
                    <Text fontSize="md" fontWeight={300}>
                      cal
                    </Text>
                  </Text>
                  <Flex flexDirection="row" mt={2}>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        8g
                      </Text>
                      <Text fontSize="xs">Carbs</Text>
                    </Box>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        3g
                      </Text>
                      <Text fontSize="xs">Protein</Text>
                    </Box>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        10g
                      </Text>
                      <Text fontSize="xs">Fat</Text>
                    </Box>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
            <Box bgColor="primary.200" p={5} rounded="xl" mb={3}>
              <Flex flexDirection="row">
                <Image
                  size="xl"
                  rounded="xl"
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FEdit%2F2022-10-Chicken-Adobo%2FChicken_Adobo",
                  }}
                  alt="chicken adobo"
                />
                <VStack ml={4} space={0}>
                  <Heading size="md" color="primary.500">
                    10:00 AM Meal
                  </Heading>
                  <Text>Chicken Adobo with 2 ...</Text>
                  <Text fontSize="lg" fontWeight={700}>
                    200{" "}
                    <Text fontSize="md" fontWeight={300}>
                      cal
                    </Text>
                  </Text>
                  <Flex flexDirection="row" mt={2}>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        8g
                      </Text>
                      <Text fontSize="xs">Carbs</Text>
                    </Box>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        3g
                      </Text>
                      <Text fontSize="xs">Protein</Text>
                    </Box>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        10g
                      </Text>
                      <Text fontSize="xs">Fat</Text>
                    </Box>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
            <Box bgColor="primary.200" p={5} rounded="xl" mb={3}>
              <Flex flexDirection="row">
                <Image
                  size="xl"
                  rounded="xl"
                  resizeMode="cover"
                  source={{
                    uri: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FEdit%2F2022-10-Chicken-Adobo%2FChicken_Adobo",
                  }}
                  alt="chicken adobo"
                />
                <VStack ml={4} space={0}>
                  <Heading size="md" color="primary.500">
                    10:00 AM Meal
                  </Heading>
                  <Text>Chicken Adobo with 2 ...</Text>
                  <Text fontSize="lg" fontWeight={700}>
                    200{" "}
                    <Text fontSize="md" fontWeight={300}>
                      cal
                    </Text>
                  </Text>
                  <Flex flexDirection="row" mt={2}>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        8g
                      </Text>
                      <Text fontSize="xs">Carbs</Text>
                    </Box>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        3g
                      </Text>
                      <Text fontSize="xs">Protein</Text>
                    </Box>
                    <Box mr={5}>
                      <Text fontSize="sm" fontWeight={700}>
                        10g
                      </Text>
                      <Text fontSize="xs">Fat</Text>
                    </Box>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
          </ScrollView>
        </VStack>
      </Box> */}
      {renderNav({selected, handleSignOut})}
      <HStack bg="primary.400" alignItems="center" safeAreaBottom>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon as={Entypo} name="home" size="lg" color="white" />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(1)}
        >
          <Center>
            <Icon as={Entypo} name="list" size="lg" color="white" />
            <Text color="white" fontSize="12">
              Logs
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(2)}
        >
          <Center>
            <Icon as={AntDesign} name="user" size="lg" color="white" />
            <Text color="white" fontSize="12">
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </>
  );
};

export default HomeScreen;
