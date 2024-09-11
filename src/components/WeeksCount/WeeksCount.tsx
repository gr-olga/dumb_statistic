import {getCurrentWeek} from '../../utilas/weeksCalculator';
import {ReactP5Wrapper} from 'react-p5-wrapper';
import p5 from 'p5';
import {useState} from 'react';
import styles from './weeksCount.module.scss';

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
  const currentWeek = getCurrentWeek();
  const [colorful, setColorful] = useState(false);

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
            if (colorful) {
              p.noFill();
            } else {
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
  };

  return (
      <div className={styles.weeks_count}>
        <p className={styles.weeks_count__info}>Do you want to see a average steps in live?</p>
        <button className={styles.weeks_count__info_button}
                onClick={() => setColorful(true)}>
          Yes
        </button>
        {colorful && <button className={styles.weeks_count__info_button}
                             onClick={() => setColorful(false)}>
          Hide
        </button>}
        <div>
          {colorful &&
              // <div className={styles.info_container}>
              //   <div className={styles.info_item}>
              //     <p className={styles.info_item__text}> Childhood: 0-6 years</p>
              //     <div
              //         style={{backgroundColor: `rgb(${CHILDHOOD_COLOR})`, width: '20px', height: '20px'}}></div>
              //   </div>
              //   <div>
              //     <p> School: 6-18 years</p>
              //     <div style={{backgroundColor: `rgb(${SCHOOL_COLOR})`, width: '20px', height: '20px'}}></div>
              //   </div>
              //   <div>
              //     <p> University: 18-23 years</p>
              //     <div style={{backgroundColor: `rgb(${UNIVERSITY_COLOR})`, width: '20px', height: '20px'}}></div>
              //   </div>
              //   <div>
              //     <p> Work: 23-60 years</p>
              //     <div style={{backgroundColor: `rgb(${WORK_COLOR})`, width: '20px', height: '20px'}}></div>
              //   </div>
              //   <div>
              //     <p>Retirement: 60+ years</p>
              //     <div style={{backgroundColor: `rgb(${RETIREMENT_COLOR})`, width: '20px', height: '20px'}}></div>
              //   </div>
              // </div>
              <div className={styles.info_container}>
                <div className={styles.info_item}>
                  <p className={styles.info_text}>Childhood: 0-6 years</p>
                  <div className={styles.color_square} style={{backgroundColor: `rgb(${CHILDHOOD_COLOR})`}}></div>
                </div>

                <div className={styles.info_item}>
                  <p className={styles.info_text}>School: 6-18 years</p>
                  <div className={styles.color_square} style={{backgroundColor: `rgb(${SCHOOL_COLOR})`}}></div>
                </div>

                <div className={styles.info_item}>
                  <p className={styles.info_text}>University: 18-23 years</p>
                  <div className={styles.color_square} style={{backgroundColor: `rgb(${UNIVERSITY_COLOR})`}}></div>
                </div>

                <div className={styles.info_item}>
                  <p className={styles.info_text}>Work: 23-60 years</p>
                  <div className={styles.color_square} style={{backgroundColor: `rgb(${WORK_COLOR})`}}></div>
                </div>

                <div className={styles.info_item}>
                  <p className={styles.info_text}>Retirement: 60+ years</p>
                  <div className={styles.color_square} style={{backgroundColor: `rgb(${RETIREMENT_COLOR})`}}></div>
                </div>
              </div>

          }
        </div>

        <h1 className={styles.weeks_count__title}>How many weeks you spent</h1>
        <ReactP5Wrapper sketch={sketch}/>
      </div>
  );
};
