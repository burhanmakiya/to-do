import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

const myCustomLightTheme = {
  dark: false,
  colors: {
    myDunkelBlau: "#001D3D",
    myBlau: "#003566",
    myGelb: "#FFC300",
    myBlack: "#000814",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});
