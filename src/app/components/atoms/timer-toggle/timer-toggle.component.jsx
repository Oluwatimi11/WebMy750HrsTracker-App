import styles from "./timer-toggle.module.scss";

function TimerToggle({ onChange, checked }) {
  return (
    <center className={styles["timer-toggle"]} >
      <input type="checkbox" id="timer-switch" className={styles["timer-checkbox"]} />
      <label htmlFor="timer-switch" className={styles["timer-toggle-label"]}>
      </label>
      <h4>Timer</h4>
    </center>
  );
}
export default TimerToggle;
