import {weeksCalculator} from '../../utilas/weeksCalculator';
import {ReactP5Wrapper} from 'react-p5-wrapper';
import p5 from 'p5';

interface WeeksCountProps {
  age: number;
}

export const WeeksCount = ({age}: WeeksCountProps) => {
  const currentAge = age;
  const currentWeek = weeksCalculator(age);

  const years = 80;
  const weeksPerYear = 52;

  const sketch = (p: p5) => {
    const squareSize = 15;
    const xOffset = 20;
    const yOffset = 20;

    p.setup = () => {
      const canvasWidth = weeksPerYear * squareSize + xOffset * 2;
      const canvasHeight = years * squareSize + yOffset * 2;
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
    };

    p.draw = () => {
      p.background(255);
      p.noFill();
      p.stroke(0);

      for (let y = 0; y < years; y++) {
        for (let w = 0; w < weeksPerYear; w++) {
          const x = xOffset + w * squareSize;
          const yPos = yOffset + y * squareSize;

          if (y < currentAge || (y === currentAge && w <= currentWeek)) {
            p.fill(0);
          } else {
            p.noFill();
          }

          p.rect(x, yPos, squareSize, squareSize);
        }
      }
    };
  };

  return (
      <div>
        <h1>WeeksCount</h1>
        <ReactP5Wrapper sketch={sketch}/>
      </div>
  );
};