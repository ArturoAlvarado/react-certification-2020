import React, { useContext, createContext, useEffect } from 'react';
import useFavorites from '../../utils/hooks/useFavorites';
import { storage } from '../../utils/storage';

const FavoriteContext = createContext(null);

function useFavoriteVideos() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(`Can't use "useFavoriteVideos" without a FavoriteVideosProvider!`);
  }
  return context;
}

function FavoriteVideosProvider({ children }) {
  const [favoriteVideos, changeFavorites] = useFavorites();

  useEffect(() => {
    const savedVideos = storage.get('FAVS');
    console.log(savedVideos);
    if (savedVideos) {
      changeFavorites({ type: 'init', payload: savedVideos });
    }
  }, [changeFavorites]);

  return (
    <FavoriteContext.Provider value={{ favoriteVideos, changeFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export { useFavoriteVideos };
export default FavoriteVideosProvider;
