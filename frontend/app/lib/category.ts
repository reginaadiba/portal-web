import { Category } from "@/types/category";

export async function getLastPost(): Promise<Category[]> {
  const res = await fetch("http://localhost:3001/categories?_limit=5");
  const posts = await res.json();
  return posts;
}


export async function getDetailCategory(id: number): Promise<Category> {
  const res = await fetch(`http://localhost:3001/categories/${id}`);
  const post = await res.json();
  return post;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:3001/categories");
  const posts = await res.json();
  return posts;
}