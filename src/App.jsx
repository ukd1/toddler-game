import React from 'react';
import logo from "./logo.svg";
import "./App.css";
import Konva from 'konva';
import { Stage, Layer, Circle } from 'react-konva';


function generateBalls() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    ref: React.createRef(),
    x: 30 + (Math.random() * (window.innerWidth - 60)),
    y: Math.random() * (window.innerHeight - 200),
    color: COLORS[i % 3],
    radius: 30,
    isDragging: false,
  }));
}

function generateBuckets() {
  return [...Array(3)].map((_, i) => ({
    id: i.toString(),
    ref: React.createRef(),
    x: 150 + (200 * i),
    y: window.innerHeight - 100,
    radius: 60,
    color: COLORS[i],
  }
  ));
}

function haveIntersection(r1, r2) {
  let distX = r1.x() - r2.x();
  let distY = r1.y() - r2.y();
  let distance = Math.sqrt((distX*distX) + (distY*distY))

  return (distance <= r1.radius() + r2.radius())
}

const COLORS = ['red', 'blue', 'green'];
const INITIAL_BALL_STATE = generateBalls();
const INITIAL_BUCKET_STATE = generateBuckets();

function App() {
  const [balls, setBalls] = React.useState(INITIAL_BALL_STATE);
  const [buckets, setBuckets] = React.useState(INITIAL_BUCKET_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setBalls(
      balls.map((ball) => {
        return {
          ...ball,
          isDragging: ball.id === id,
        };
      })
    );
  };

  const handleDragMove = (e) => {
    let id = e.target.id
    let _ball = e.target;

    buckets.forEach(function (bucket) {
      let _bucket = bucket.ref.current;

      if (_ball.attrs['fill'] == _bucket.attrs['fill']) {
        if (haveIntersection(_bucket, _ball)) {
          // console.log("Intersection with ", bucket.color, "bucket");
          _ball.destroy();
        }
      }
    });
  };

  const handleDragEnd = (e) => {
    setBalls(
      balls.map((ball) => {
        return {
          ...ball,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
      {buckets.map((bucket) => (
        <Circle
          ref={bucket.ref}
          key={bucket.id}
          id={bucket.id}
          x={bucket.x}
          y={bucket.y}
          radius={bucket.radius}
          fill={bucket.color}
          stroke="black"
          strokeWidth={1}
        />
      ))}
      {balls.map((ball) => (
        <Circle
          ref={ball.ref}
          key={ball.id}
          id={ball.id}
          x={ball.x}
          y={ball.y}
          radius={ball.radius}
          fill={ball.color}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={ball.isDragging ? 10 : 5}
          shadowOffsetY={ball.isDragging ? 10 : 5}
          scaleX={ball.isDragging ? 1.2 : 1}
          scaleY={ball.isDragging ? 1.2 : 1}
          draggable
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}

        />
      ))}
      </Layer>
    </Stage>
  );
}

export default App;
