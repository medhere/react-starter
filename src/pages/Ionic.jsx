
import { useState } from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonItemDivider } from '@ionic/react';

export const IonicPage = () => {

  const [gender, setGender] = useState();
  const [hairColor, setHairColor] = useState('brown');

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>
          Single Selection
        </IonLabel>
      </IonListHeader>

      <IonItem>
        <IonLabel>Gender</IonLabel>
        <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
          <IonSelectOption value="female">Female</IonSelectOption>
          <IonSelectOption value="male">Male</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Hair Color</IonLabel>
        <IonSelect value={hairColor} okText="Okay" cancelText="Dismiss" onIonChange={e => setHairColor(e.detail.value)}>
          <IonSelectOption value="brown">Brown</IonSelectOption>
          <IonSelectOption value="blonde">Blonde</IonSelectOption>
          <IonSelectOption value="black">Black</IonSelectOption>
          <IonSelectOption value="red">Red</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItemDivider>Your Selections</IonItemDivider>
      <IonItem>Gender: {gender ?? '(none selected)'}</IonItem>
      <IonItem>Hair Color: {hairColor}</IonItem>
    </IonList>  
  );
};