import * as productService from "../services/productService.js";

export const getProducts = (req, res) => {
  const allProducts = productService.getAllProducts();
  res.json(allProducts);
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name dan price wajib diisi" });
  }

  const newProduct = productService.addProduct({ name, price });
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  if (name === undefined && price === undefined) {
    return res.status(400).json({ message: "Minimal satu atribut harus diupdate" });
  }

  const updated = productService.updateProduct(id, { name, price });
  if (!updated) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  res.json(updated);
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = productService.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  return res.status(200).json({ message: "Produk berhasil dihapus" });
};
