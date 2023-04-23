import React from "react";
import {Box, VStack, Flex, Text, Heading, Image} from "native-base";
import moment from "moment";

const truncateLongText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + " ...";
  }
  return text;
};

export const HomeMealCard = ({
  name,
  calories,
  carbs,
  protein,
  fat,
  timestamp,
  uri,
}) => {
  return (
    <Box bgColor="primary.200" p={5} rounded="xl" mb={3}>
      <Flex flexDirection="row">
        <Image
          size="md"
          rounded="md"
          resizeMode="cover"
          fallbackSource={require("./img/placeholder.png")}
          src={uri}
          alt="chicken adobo"
        />
        <VStack ml={4} space={0}>
          <Heading size="md" color="primary.500">
            Meal @ {moment(timestamp).format("LT")}
          </Heading>
          <Text>{truncateLongText(name, 20)}</Text>

          <Flex flexDirection="row" alignItems="flex-end" mt={2}>
            <Box mr={5}>
              <Text fontSize="lg" fontWeight={700}>
                {calories}g
              </Text>
              <Text fontSize="xs">Calories</Text>
            </Box>
            <Box mr={5}>
              <Text fontSize="sm" fontWeight={700}>
                {carbs}g
              </Text>
              <Text fontSize="xs">Carbs</Text>
            </Box>
            <Box mr={5}>
              <Text fontSize="sm" fontWeight={700}>
                {protein}g
              </Text>
              <Text fontSize="xs">Protein</Text>
            </Box>
            <Box mr={5}>
              <Text fontSize="sm" fontWeight={700}>
                {fat}g
              </Text>
              <Text fontSize="xs">Fat</Text>
            </Box>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};
