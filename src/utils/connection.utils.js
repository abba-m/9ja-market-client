export const generateId = () => Number((Math.random() * 100).toFixed(0));

export const sendRequest = async (promise) => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};
