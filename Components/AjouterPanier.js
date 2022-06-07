import { getDatabase, ref, set } from 'firebase/database';

export const AjouterPanier=(id,id_produit,id_user,id_cart,quantite,prix_total) =>{
  const db = getDatabase();
  const reference = ref(db, 'panier/'+ id);
  return set(reference, {
    id_produit:id_produit,
    id_user:id_user,
    id_cart:id_cart,
    quantite:quantite,
    prix_total:prix_total,
  });
}