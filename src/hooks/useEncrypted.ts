const useEncrypted = (param: string) => {
  const encryptedWord = window.btoa(param);

  return encryptedWord;
};

export default useEncrypted;
