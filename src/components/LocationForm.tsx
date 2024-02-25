import {FC, Dispatch, SetStateAction} from "react";
import styles from './LocationForm.module.css';

interface LocationFormProps {
  onSubmit: (location: string | number) => void;
  location: string | number;
  setLocation: Dispatch<SetStateAction<string | number>>;
}

export const LocationForm: FC<LocationFormProps> = ({onSubmit, location, setLocation}) => {
  return <form onSubmit={(e) => {
    e.preventDefault()
    onSubmit(location)
  }}
               className={styles.locationForm}>
    <input required type={'text'} aria-label={'Enter a location'} placeholder={'Enter a location'}
           onChange={e => setLocation(e.target.value)} value={location}/>
  </form>
}