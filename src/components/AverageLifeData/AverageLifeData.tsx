import {
  CHILDHOOD_COLOR,
  RETIREMENT_COLOR,
  SCHOOL_COLOR,
  UNIVERSITY_COLOR,
  WORK_COLOR,
} from "../WeeksCount/WeeksCount";
import styles from "./averageLifeData.module.scss";

export const AverageLifeData = () => {
  return (
    <div className={styles.info_container}>
      <div className={styles.info_item}>
        <p className={styles.info_text}>
          Childhood:<span> 0-6 years</span>
        </p>
        <div
          className={styles.color_square}
          style={{ backgroundColor: `rgb(${CHILDHOOD_COLOR})` }}
        ></div>
      </div>

      <div className={styles.info_item}>
        <p className={styles.info_text}>School: 6-18 years</p>
        <div
          className={styles.color_square}
          style={{ backgroundColor: `rgb(${SCHOOL_COLOR})` }}
        ></div>
      </div>

      <div className={styles.info_item}>
        <p className={styles.info_text}>University: 18-23 years</p>
        <div
          className={styles.color_square}
          style={{ backgroundColor: `rgb(${UNIVERSITY_COLOR})` }}
        ></div>
      </div>

      <div className={styles.info_item}>
        <p className={styles.info_text}>Work: 23-60 years</p>
        <div
          className={styles.color_square}
          style={{ backgroundColor: `rgb(${WORK_COLOR})` }}
        ></div>
      </div>

      <div className={styles.info_item}>
        <p className={styles.info_text}>Retirement: 60+ years</p>
        <div
          className={styles.color_square}
          style={{ backgroundColor: `rgb(${RETIREMENT_COLOR})` }}
        ></div>
      </div>
    </div>
  );
};
