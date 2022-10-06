import { extendTheme } from "native-base";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: "Inter_100Thin",
      },
      200: {
        normal: "Inter_200ExtraLight",
      },
      300: {
        normal: "Inter_300Light",
      },
      400: {
        normal: "Inter_400Regular",
      },
      500: {
        normal: "Inter_500Medium",
      },
      600: {
        normal: "Inter_600SemiBold",
      },
      700: {
        normal: "Inter_700Bold",
      },
      800: {
        normal: "Inter_800ExtraBold",
      },
      900: {
        normal: "Inter_900Black",
      },
    },
  },
  config: {
    initialColorMode: "light",
  },
  colors: {
    primary: {
      100: "#F6FAF0",
      200: "#DAEAC2",
      300: "#99BA67",
      400: "#606C38",
      500: "#283618",
    },
  },
  components: {
    FormControlLabel: {
      baseStyle: {
        _light: {
          _text: {
            color: "primary.100",
          },
        },
      },
    },

    Input: {
      baseStyle: {
        _light: {
          placeholderTextColor: "primary.200",
          color: "primary.100",
          borderColor: "primary.100",
          _hover: {
            borderColor: "primary.200",
          },
          _focus: {
            borderColor: "primary.200",
            backgroundColor: "primary.300",
          },
        },
      },
    },
  },
});
