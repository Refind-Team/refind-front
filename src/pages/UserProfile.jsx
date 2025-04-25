import { useAuth } from "@/contexts/AuthContext";
import ItemCard from "@/components/ItemCard";

function UserProfile() {
  const { user, items, fetchItems } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Meus Itens</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            showActions={true}
            onUpdated={fetchItems}
            onDeleted={fetchItems}
          />
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
