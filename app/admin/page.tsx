import AdminHeader from "@/components/admin/admin-header";
import ProductTable from "@/components/admin/product-table";
import LogoutButton from "@/components/admin/logout-button";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <AdminHeader />

      <ProductTable />
    </main>
  );
}