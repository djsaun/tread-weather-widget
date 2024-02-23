import {FC, Dispatch, SetStateAction} from 'react';
import styles from './UnitToggle.module.css';

interface UnitToggleProps {
  isImperial: boolean;
  setIsImperial: Dispatch<SetStateAction<boolean>>;
}

export const UnitToggle: FC<UnitToggleProps> = ({isImperial, setIsImperial}) => {
  return (
    <div className={styles.toggleContainer}>
      <input checked={isImperial} onChange={() => setIsImperial(true)} type='radio' id='imperial' name='unit-selector' value='imperial' className={styles.toggleInput} />
      <label htmlFor={'imperial'} className={styles.toggleLabel}>F</label>
      <input checked={!isImperial} onChange={() => setIsImperial(false)} type='radio' id='metric' name='unit-selector' value='metric' className={styles.toggleInput} />
      <label htmlFor={'metric'} className={styles.toggleLabel}>C</label>
    </div>
  )
}