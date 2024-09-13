import {getCurrentYearWeek, weeksCalculator} from '../../utilas/weeksCalculator';
import {ReactP5Wrapper} from 'react-p5-wrapper';
import p5 from 'p5';
import {useRef} from 'react';
import styles from './weeksCount.module.scss';

interface WeeksCountProps {
  birthData: number;
  currentDate: Date;
  lifeExpectancy: number;
  colorful: boolean;
  name: string;
}

// Define constants for colors representing life periods
export const CHILDHOOD_COLOR = [163, 195, 131];
export const SCHOOL_COLOR = [134, 178, 193];
export const UNIVERSITY_COLOR = [217, 166, 197];
export const WORK_COLOR = [210, 160, 130];
export const RETIREMENT_COLOR = [143, 173, 178];
const TEXT_COLOR = [0, 0, 0];


export const WeeksCount = ({birthData, currentDate, lifeExpectancy, colorful, name}: WeeksCountProps) => {
  const currentAge = Math.floor((currentDate.getTime() - birthData) / 1000 / 60 / 60 / 24 / 365);
  const currentWeek = getCurrentYearWeek();


  const years = lifeExpectancy;
  const weeksPerYear = 52;

  // Step 1: Use a ref to store the p5 instance
  const p5Ref = useRef<p5 | null>(null);

  const sketch = (p: p5) => {
    let squareSize: number;
    let canvasWidth: number;
    let canvasHeight: number;
    const xOffset = 90;
    const yOffset = 70;

    p.setup = () => {
      // Set the square size dynamically based on window width
      squareSize = p.map(p.windowWidth, 320, 1920, 5, 10);
      canvasWidth = weeksPerYear * squareSize + xOffset * 2;
      canvasHeight = years * squareSize + yOffset * 2;

      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
    };

    p.windowResized = () => {
      // Recalculate canvas size when window is resized
      squareSize = p.map(p.windowWidth, 320, 1920, 5, 10);
      canvasWidth = weeksPerYear * squareSize + xOffset * 2;
      canvasHeight = years * squareSize + yOffset * 2;

      p.resizeCanvas(canvasWidth, canvasHeight);
      p.redraw();
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
        for (let w = 0; w <= weeksPerYear; w++) {
          const x = xOffset + w * squareSize;
          const yPos = yOffset + y * squareSize;

          // Set the default stroke for all squares
          p.stroke(0); // Black border for the squares
          p.strokeWeight(1); // Normal border width

          if (colorful) {
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
          }
          // Draw the base life period color
          p.rect(x, yPos, squareSize, squareSize);

          // Overlay the past weeks with transparency
          if (y < currentAge || (y === currentAge && w <= currentWeek)) {
            if (!colorful) {
              p.fill(92, 145, 146, 150); // Color for past weeks with transparency
            }
            p.rect(x, yPos, squareSize, squareSize);
          }

          // Highlight the current age and week square with a distinct border
          if (y === currentAge && w === currentWeek) {
            p.fill(255, 0, 0); // Red fill for the current age and week square
            p.rect(x, yPos, squareSize, squareSize); // Draw the border around the current age/week square
            // Restore stroke to default after drawing the current week's square
            p.noFill();
            p.stroke(0); // Reset to black border for the remaining squares
            p.strokeWeight(1); // Reset to normal border width
          }
        }
      }
    };

    // Assign the p5 instance to the ref
    p5Ref.current = p;
  };

  // Step 2: Use the ref to trigger the save function
  const downloadImage = () => {
    if (p5Ref.current) {
      p5Ref.current.saveCanvas('life-grid', 'png');
    }
  };

  const allLifeWeeks = weeksCalculator(birthData, currentDate);

  return (
      <div className={styles.weeks_count}>
        <h1 className={styles.weeks_count__title}>{name} you have already lived {allLifeWeeks} weeks</h1>
        <ReactP5Wrapper sketch={sketch}/>
        <button onClick={downloadImage} className={styles.download_button}>Download as Image</button>
      </div>
  );
};
