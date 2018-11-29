import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Star } from "react-konva";
import KonvaContextMenu from "./KonvaContextMenu";

class App extends Component {
  handleClick = e => {
    //  Left click only, Right click = 2
    if (e.evt.button === 0) {
      console.log("left click");
    }
  };
  test1 = x => {
    console.log("hello 1");
  };
  test2 = x => {
    console.log("hello 2");
  };
  handleContextMenu = e => {
    e.evt.preventDefault(true); // NB!!!! Remember the ***TRUE***
    const options = [
      { callback: this.test1, text: "very fancy option 1, click now!!!" },
      { callback: this.test2, text: "normal option 2" }
    ];
    KonvaContextMenu(e, options);
  };
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Star
            key="123"
            x={200}
            y={200}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            onclick={this.handleClick}
            onContextMenu={this.handleContextMenu}
          />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById("root"));
