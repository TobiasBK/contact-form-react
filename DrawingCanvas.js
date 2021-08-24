//A simple drawing canvas
import React, { useEffect, useRef, useState } from 'react';

function DrawingCanvas() {
  
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2; //double px density for retina screens
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d") //the context defined for drawing
    context.scale(2,2);
    context.lineCap = "square";
    context.strokeStyle = "red";
    context.lineWidth = 10;

    contextRef.current = context;
  }, [])

  const startDraw = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX,offsetY);
    setIsDrawing(true);
  }

  const doneDraw = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){  //this style avoids nesting...
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  return (
    <>
      <canvas 
        onMouseDown = {startDraw}
        onMouseUp = {doneDraw}
        onMouseMove = {draw}
        ref = {canvasRef}
      /> 
    </>
  );
}
export default DrawingCanvas;
