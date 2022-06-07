import { getDatabase, ref, set } from 'firebase/database';

export const addUser=(uid,email,password,nom,prenom,sexe,adresse,telephone,codePostal,numeroCompte,ville,pays) =>{
  const db = getDatabase();
  const reference = ref(db, 'users/' + uid);
  return set(reference, {
    email:email,
    password:password,
    nom:nom,
    prenom:prenom,
    sexe:sexe,
    adresse:adresse,
    telephone:telephone,
    codePostal:codePostal,
    numeroCompte:numeroCompte,
    ville:ville,
    pays:pays,
  });
}















