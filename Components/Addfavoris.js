import { getDatabase, ref, set } from 'firebase/database';

export const addFavoris=(id,id_produit,id_user,id_favoris) =>{
   
  const db = getDatabase();
  const reference = ref(db, 'favoris/'+ id);
  return set(reference, {
    id_produit:id_produit,
    id_user:id_user,
    id_favoris:id_favoris,
  });
}