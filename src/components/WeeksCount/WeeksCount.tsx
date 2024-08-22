import {getCurrentWeek, weeksCalculator} from '../../utilas/weeksCalculator';
import {ReactP5Wrapper} from 'react-p5-wrapper';
import p5 from 'p5';

interface WeeksCountProps {
  birthData: number;
  currentDate: Date;
  lifeExpectancy: number;
}

// Define constants for colors representing life periods
const CHILDHOOD_COLOR = [163, 195, 131];
const SCHOOL_COLOR = [134, 178, 193];
const UNIVERSITY_COLOR = [217, 166, 197];
const WORK_COLOR = [210, 160, 130];
const RETIREMENT_COLOR = [143, 173, 178];
const TEXT_COLOR = [0, 0, 0];


export const WeeksCount = ({birthData, currentDate, lifeExpectancy}: WeeksCountProps) => {
  const currentAge = Math.floor((currentDate.getTime() - birthData) / 1000 / 60 / 60 / 24 / 365);
  const amountUserWeeks = weeksCalculator(birthData, currentDate);
  const currentWeek = getCurrentWeek();

  const years = lifeExpectancy;
  const weeksPerYear = 52;

  const sketch = (p: p5) => {
    const squareSize = 10;
    const xOffset = 60; // Increased to make space for year labels
    const yOffset = 40; // Increased to make space for week labels

    p.setup = () => {
      const canvasWidth = weeksPerYear * squareSize + xOffset * 2;
      const canvasHeight = years * squareSize + yOffset * 2;
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
    };

    p.draw = () => {
      p.background(207, 203, 186);
      p.noFill();
      p.textAlign(p.RIGHT, p.CENTER);
      p.textSize(12);
      p.fill(TEXT_COLOR);

      // Draw age labels every 5 years on the y-axis
      for (let y = 0; y < years; y += 5) {
        const yPos = yOffset + y * squareSize + squareSize / 2;
        p.text(y, xOffset - 10, yPos);
      }

      // Draw grid and fill squares with appropriate colors
      for (let y = 0; y < years; y++) {
        for (let w = 1; w <= weeksPerYear; w++) {
          const x = xOffset + w * squareSize;
          const yPos = yOffset + y * squareSize;

          // Determine the base color based on the age range
          if (y < 6) {
            p.fill(CHILDHOOD_COLOR);
          } else if (y < 18) {
            p.fill(SCHOOL_COLOR);
          } else if (y < 23) {
            p.fill(UNIVERSITY_COLOR);
          } else if (y < 60) {
            p.fill(WORK_COLOR);
          } else {
            p.fill(RETIREMENT_COLOR);
          }

          // Draw the base life period color
          p.rect(x, yPos, squareSize, squareSize);

          // Overlay the past weeks with transparency
          if (y < currentAge || (y === currentAge && w <= currentWeek)) {
            p.fill(92, 145, 146, 150); // Color for past weeks with transparency
            p.rect(x, yPos, squareSize, squareSize);
          }
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
