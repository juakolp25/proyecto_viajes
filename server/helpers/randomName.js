export const randomName = () => {
    const possible =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    let randomString = "";
  
    for (let i = 0; i < 6; i++) {
      randomString += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
  
    return randomString;
  };