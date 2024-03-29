// {{base_url}}/api/product

import { IProductRequest } from "../../app/redux/slice/Admin/AddProduct/AddProductSlice";
import { IApiResponse, IProduct, IResponseApi } from "../../data/interfaces";
import { adminServer } from "../server";

export const postCreateProduct = (file: File, data: IProductRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", data.name!);
  formData.append("price", data.price!.toString());
  formData.append("stock", data.stock!.toString());
  formData.append("branchId", data.branchId!.toString()!);
  formData.append("weight", data.weight!.toString()!);
  formData.append("desc", data.desc!);
  formData.append("categoryId", data.categoryId!.toString()!);
  return adminServer.post(`api/product`, formData, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// {{base_url}}/api/product?page=1&limit=10&name&categoryId=

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  }
  return "";
};

interface IQuery {
  [key: string]: string | number | null | undefined;
}

export const fetchAdminProductPage = (query: IQuery) => {
  return adminServer.get(`api/product`, {
    params: query,
    headers: {
      Authorization: getToken(),
    },
  });
};
// {{base_url}}/api/product/:id

export const updateProduct = (id: number, data: Partial<IProductRequest>) => {
  return adminServer.put(`api/product/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// {{base_url}}/api/product/:id

export const deleteProduct = (id: number) => {
  return adminServer.delete(`api/product/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

//get product by id

export const fetchProductById = (id: number) => {
  return adminServer.get<IResponseApi<IProduct>>(`api/product/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const fetchAllProductByBranch = () => {
  return adminServer.get<IApiResponse<IProduct[]>>("api/product", {});
};
//PUT {{base_url}}/api/product/image/:id

export const updateProductWithImage = (
  id: number,
  file: File,
  data: Partial<IProductRequest>
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", data.name!);
  formData.append("price", data.price!.toString());
  formData.append("stock", data.stock!.toString());
  formData.append("branchId", data.branchId!.toString()!);
  formData.append("weight", data.weight!.toString()!);
  formData.append("desc", data.desc!);
  formData.append("categoryId", data.categoryId!.toString()!);

  return adminServer.put(`api/product/image/${id}`, formData, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const findDuplicateProduct = (name: string) => {
  return adminServer.get(`api/product/find-duplicate?name=${name}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};
