import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IdMoneda } from '../tipos/monedas';

type EstadoFavoritos = {
  favoritos: IdMoneda[];
  alternarFavorito: (id: IdMoneda) => void;
};

export const usarFavoritos = create<EstadoFavoritos>()(
  persist((set) => ({
    favoritos: [],
    alternarFavorito: (id) => set((estado) => ({
      favoritos: estado.favoritos.includes(id)
        ? estado.favoritos.filter((moneda) => moneda !== id)
        : [...estado.favoritos, id],
    })),
  }), { name: 'pulso-abierto-favoritos' })
);
