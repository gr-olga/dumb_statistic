import {getCurrentWeek, weeksCalculator} from '../../utilas/weeksCalculator';
import {ReactP5Wrapper} from 'react-p5-wrapper';
import p5 from 'p5';

interface WeeksCountProps {
  birthData: number;
  currentDate: Date;
  lifeExpectancy: number;
}

export const WeeksCount = ({birthData, currentDate, lifeExpectancy}: WeeksCountProps) => {
  const currentAge = Math.floor((currentDate.getTime() - birthData) / 1000 / 60 / 60 / 24 / 365);
  const amountUserWeeks = weeksCalculator(birthData, currentDate);
  const currentWeek = getCurrentWeek();

  const years = lifeExpectancy;
  const weeksPerYear = 52;

  const sketch = (p: p5) => {
    const squareSize = 15;
    const xOffset = 40; // Increased to make space for year labels
    const yOffset = 40; // Increased to make space for week labels

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
      p.textSize(10);
      p.textAlign(p.CENTER, p.CENTER);

      //Draw grid and fill squares
      for (let y = 0; y < years; y++) {
        for (let w = 1; w <= weeksPerYear; w++) {
          const x = xOffset + w * squareSize;
          const yPos = yOffset + y * squareSize;

          if (y < currentAge) {
            p.fill(173, 216, 230); // Color for past weeks in previous years
          } else if (y === currentAge && w <= currentWeek) {
            p.fill(173, 216, 230); // Color for past weeks in the current year
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