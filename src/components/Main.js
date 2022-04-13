import Canvas from "./Canvas";
import "./Main.css";

function Main(props) {
  return (
    <main className="main">
      <div className="main_info">
        <p>Supply: {props.config.supply}</p>
        <p>Name: {props.config.name}</p>
        <p>Symbol: {props.config.symbol}</p>
        <p>Description: {props.config.description}</p>
      </div>
      <div className="main_cards">
        <div className="card">
          <Canvas folderNames={props.folderNames} />
        </div>
        <div className="card">
          <p className="card_tree_title">Tree</p>
          {props.folderNames.length > 0 ? (
            props.folderNames.map((item, index) => {
              return (
                <div key={index}>
                  <p className="card_tree_item">{item.name}</p>
                  {item.elements.map((element) => {
                    return (
                      <p className="card_tree_sub_item_title">
                        ---{element.name}
                        <sup>{element.weight}</sup>
                      </p>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <p className="card_tree_item">
              The tree is empty. Please set the configurations.
            </p>
          )}
        </div>
      </div>
      <div className="log_info">
        <p className="log_info_title">
          Progress: {props.progress}/{props.config.supply}
        </p>
        <progress
          style={{
            width: "100%",
            height: "20px",
            marginTop: 5,
            backgroundColor: "lightGreen",
          }}
          value={props.progress}
          max={props.config.supply}
        ></progress>
        <p className="log_info_title">Status:</p>
        <p
          className="log_info_text"
          style={{ color: props.status ? "red" : "lightGreen" }}
        >
          {props.status != "" ? props.status : "Everything look good"}
        </p>
      </div>
    </main>
  );
}

export default Main;
