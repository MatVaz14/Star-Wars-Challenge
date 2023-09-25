export function deleteDuplicate(arr, prop) {
  const newArray = [];
  const valoresUnicos = new Set();

  for (const item of arr) {
    // Convierte el valor de la propiedad en una cadena para garantizar la unicidad
    const valorPropiedad = item[prop].toString();

    if (!valoresUnicos.has(valorPropiedad)) {
      valoresUnicos.add(valorPropiedad);
      newArray.push(item);
    }
  }

  return newArray;
}
