export const getLocalStorageItem = (key) =>{
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key, value) =>{
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
};

export const LOCAL_STORAGE_KEYS = {
  UNDERWAY: "underWay",
  ID_HOJA_USER: "idHojaUser",
  USER_INFO: "userInfo",
};

export const validateUserData = () => {
  const idHoja = getLocalStorageItem(LOCAL_STORAGE_KEYS.ID_HOJA_USER);
  const userInfo = getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_INFO);
  const idCarga = userInfo?.carga;

  if (!idHoja || !idCarga) {
    alert("Debes tener un vehículo y pedidos asignados.");
    return null;
  }

  return {id_hoja:idHoja,  id_carga:idCarga };
};