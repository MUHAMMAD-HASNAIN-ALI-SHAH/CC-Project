import Header from "./components/Header";
import InputComponent from "./components/InputComponent";
import OutputScreen from "./components/OutputScreen";
import { useFileStore } from "./store/store";

function App() {

  const {output} = useFileStore();

  return (
    <>
      <Header />
      <InputComponent />
      {output.totalLines !=0 && <OutputScreen />}
    </>
  );
}

export default App;