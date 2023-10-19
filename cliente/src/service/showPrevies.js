export const showPreview = (file, setImage, setPathImage, setInvalidImage) => {
    if (!file.type.includes("image")) {
      setInvalidImage("Invalid File");
      setPathImage(null);
      return;
    }
  
    setInvalidImage(null);
    setImage(file);
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function load() {
      setPathImage(reader.result);
    };
  };