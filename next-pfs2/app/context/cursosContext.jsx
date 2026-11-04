'use client';

import { createContext, useState } from 'react';

const CursoContext = createContext(null);

export function CursoProvider({ children }) {
  const [cursos, setCursos] = useState([]);

  return (
    <CursoContext.Provider value={{ cursos, setCursos }}>
      {children}
    </CursoContext.Provider>
  );
}

export default CursoContext;
