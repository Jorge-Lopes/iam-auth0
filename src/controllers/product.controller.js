const createProduct = (req, res) => {
  res.status(200).json({ message: "Product created" });
};

const readProduct = (req, res) => {
  res.status(200).json({ message: "Product information" });
};

export { createProduct, readProduct };
