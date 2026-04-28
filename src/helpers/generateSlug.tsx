const generateSlug = (title: string): string => {
  const from =
    "àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

  const newTitle = title
    .toLowerCase()
    .split("")
    .map((char) => {
      const i = from.indexOf(char);
      return i !== -1 ? to[i] : char;
    })
    .join("");

  return newTitle.replace(/ /g, "-").replace(/[^\w-]+/g, "");
};
export default generateSlug;
