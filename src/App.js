import logo from './logo.svg';
import './App.css';
import Test from './test';
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({         //???? didn't work
  h1: {
      fontFamily: ["IMF"]
  },
  h6: {
      fontFamily: ["PtItalic"]
  },

})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
     <Test/>
     </ThemeProvider>
    </div>
  );
}

export default App;
