const useDecrypt = (param: string) => {
  const encryptedWord = window.atob(param);

  return encryptedWord;
};

export default useDecrypt;
