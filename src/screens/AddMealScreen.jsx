import {Text, Box, VStack, Heading, Select, Button} from "native-base";
import React from "react";
import {useUser} from "../components/userContextProvider";
const mockFood = [
  {
    name: "Chicken",
    calories: 200,
    carbs: 10,
    protein: 10,
    fat: 10,
  },
  {
    name: "Rice",
    calories: 150,
    carbs: 6,
    protein: 8,
    fat: 0,
  },
];

const AddMealScreen = ({navigation}) => {
  const {handleLogMeal} = useUser();
  const [selectedFood, setSelectedFood] = React.useState(null);
  const currentTimestamp = new Date().getTime();
  return (
    <Box flex={1} justifyContent="start" bgColor="primary.300" safeArea>
      <VStack width="100%" space="2.5" mt="4" px={5}>
        <Heading color="white">Log your meal</Heading>
        <Select
          onValueChange={(itemValue) => {
            //   set the state to the object matching itemValue on mockFood
            setSelectedFood(mockFood.find((food) => food.name === itemValue));
          }}
        >
          {mockFood.map((food) => (
            <Select.Item key={food.name} label={food.name} value={food.name} />
          ))}
        </Select>
        {!!selectedFood && (
          <Box>
            <Text color="white">
              {selectedFood.name} has {selectedFood.calories} calories
            </Text>
            <Text color="white">{selectedFood.carbs}g of carbs</Text>
            <Text color="white">{selectedFood.protein}g of protein</Text>
            <Text color="white">{selectedFood.fat}g of fat</Text>
          </Box>
        )}
        <Button
          backgroundColor="primary.100"
          _text={{color: "primary.300", fontWeight: "700"}}
          _pressed={{bg: "primary.200"}}
          // width="75%"
          size="md"
          mt={5}
          onPress={() => {
            handleLogMeal({...selectedFood, timestamp: currentTimestamp});
            navigation.navigate("HomeScreen");
          }}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default AddMealScreen;
