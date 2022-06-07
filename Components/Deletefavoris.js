import { getDatabase, ref, set } from 'firebase/database';

export const deleteFavoris=(id_produit) =>{
   
  const db = getDatabase();
  const reference = ref(db, 'favoris/'+ id_produit);
  return set(reference, {
    id_produit:id_produit,
    id_user:id_user,
    id_favoris:id_favoris,
  });
}