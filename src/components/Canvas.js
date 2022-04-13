import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const loadImage = (url) => {
    return new Promise((r) => {
      let i = new Image();
      i.onload = () => r(i);
      i.src = url;
    });
  };

  const updateCanvas = async (_ctx, _paths) => {
    _paths.forEach(async (path) => {
      let img = await loadImage(path);
      _ctx.drawImage(img, 0, 0, 300, 300);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let renderImages = props.folderNames.map((i) => {
      return encodeURI("file://" + i.elements[0].path);
    });

    ctx.clearRect(0, 0, 300, 300);
    updateCanvas(ctx, renderImages);
  }, [props.folderNames]);

  return <canvas ref={canvasRef} {...props} width={300} height={300} />;
};

export default Canvas;
