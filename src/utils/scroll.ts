export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
