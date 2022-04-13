import { useEffect, useState } from "react";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

const { app } = window.require("@electron/remote");
const fs = window.require("fs");
const path = window.require("path");

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [config, setConfig] = useState({
    supply: 5,
    name: "HashLips NFT",
    symbol: "HNFT",
    description: "This is a collection about...",
    width: 1024,
    height: 1024,
    baseUri: "ipfs://ReplaceCID",
    inputPath: app.getAppPath(),
    outputPath: app.getAppPath(),
  });
  const [folderNames, setFolderNames] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const handleConfigChange = (event) => {
    console.log(event.target.name);
    setConfig({ ...config, [event.target.name]: event.target.value });
    console.log(config);
  };

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const getRarityWeight = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = Number(nameWithoutExtension.split("$").pop());
    if (isNaN(nameWithoutWeight)) {
      nameWithoutWeight = 1;
    }
    return nameWithoutWeight;
  };

  const cleanName = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = nameWithoutExtension.split("$").shift();
    return nameWithoutWeight;
  };

  const getElements = (_path) => {
    return fs
      .readdirSync(_path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i, index) => {
        if (i.includes("-")) {
          setStatus(`Layer name can not contain dashes, please fix: ${i}`);
          throw new Error(
            `Layer name can not contain dashes, please fix: ${i}`
          );
        }
        return {
          id: index,
          name: cleanName(i),
          filename: i,
          path: `${_path}/${i}`,
          weight: getRarityWeight(i),
        };
      });
  };

  const getFolders = async () => {
    fs.readdir(config.inputPath, (err, files) => {
      if (err) {
        setStatus("Unable to load the folder set");
        return;
      }
      let newFiles = files
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((file, index) => {
          return {
            id: index + 1,
            elements: getElements(path.join(config.inputPath, file)),
            name: file,
          };
        });
      setFolderNames(newFiles);
    });
  };

  console.log(status);

  useEffect(() => {
    setStatus("");
  }, [config, folderNames]);

  return (
    <div className="grid-container">
      <Header toggleSideBar={toggleSideBar} />
      <Aside
        toggleSideBar={toggleSideBar}
        sideBarOpen={sideBarOpen}
        config={config}
        setConfig={setConfig}
        handleConfigChange={handleConfigChange}
        getFolders={getFolders}
        folderNames={folderNames}
        setFolderNames={setFolderNames}
        setProgress={setProgress}
        setStatus={setStatus}
      />
      <Main
        config={config}
        folderNames={folderNames}
        progress={progress}
        status={status}
      />
      <Footer />
    </div>
  );
}

export default App;
