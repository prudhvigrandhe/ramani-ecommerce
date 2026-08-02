import { Category } from "@/lib/types";

type Props = {
  categories: Category[];
  defaultValue?: string;
};

export default function CategorySelect({
  categories,
  defaultValue,
}: Props) {
  return (
    <select
      name="category"
      defaultValue={defaultValue}
      required
      className="w-full rounded-xl border p-3"
    >
      <option value="">Select Category</option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}