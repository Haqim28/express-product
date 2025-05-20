import products from "../data/products.js";

export const getAllProducts = () => {
  return products;
};

export const addProduct = ({ name, price }) => {
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, { name, price }) => {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) return null;

  if (name !== undefined) products[productIndex].name = name;
  if (price !== undefined) products[productIndex].price = price;

  return products[productIndex];
};

export const deleteProduct = (id) => {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) return false;

  products.splice(productIndex, 1);
  return true;
};
