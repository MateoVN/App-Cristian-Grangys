export const toggleUnderWay = (setUnderWay) => {
    setUnderWay((prev) => {
      const newValue = !prev;
      setUnderWay(newValue);
      return newValue;
    });
  };