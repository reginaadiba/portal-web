import { getCategories } from "../lib/category";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div style={{ padding: 20 }}>
      <h1>Categories</h1>

      <a href="/categories/new">➕ Add New</a>

      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>
            {c.name} — <a href={`/categories/${c.id}`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
