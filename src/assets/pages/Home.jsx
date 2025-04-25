import React, { useState } from "react";
import Navbar from "../components/layout/NavBar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import AddItemFloatingButton from "../components/AddItemFloatingButton";
import ModalForm from "../components/modais/ModalForm";
import ModalSuccess from "../components/modais/ModalSuccess";
import ModalConfirm from "../components/modais/ModalConfirm";
import ModalCode from "../components/modais/ModalCode";
import ItemDetailsModal from "../components/modais/ItemDetailsModal";
import ItemList from "../components/items/ItemList";
import { useItems } from "../hooks/useItems";
import { useModals } from "../hooks/useModals";

function Home() {
  //hooks
  const {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemByCode,
  } = useItems();

  const { modals, savedItemInfo } = useModals();

  // State local
  const [currentItem, setCurrentItem] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "Todos",
    category: "",
    location: "",
  });

  const handleSearch = (term) => {
    setFilters((prev) => ({ ...prev, search: term }));
  };

  const handleTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleFilterApply = (filters) => {
    setFilters((prev) => ({ ...prev, ...filters }));
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      category: "",
      location: "",
    }));
  };
  // Handlers
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    modals.details.open();
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    modals.edit.open();
  };

  const handleSaveItem = async (itemData) => {
    try {
      if (currentItem) {
        const response = await updateItem(currentItem.code, itemData);
        if (response.success) {
          modals.edit.close();
        }
      } else {
        const response = await addItem(itemData);
        if (response.success) {
          modals.success.open(response.data);
          modals.edit.close();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };

  const handleAccessCodeClick = () => {
    modals.code.open();
  };

  const handleAccessWithCode = async () => {
    try {
      const item = await getItemByCode(accessCode);

      if (item) {
        setCurrentItem(item);
        modals.edit.open();
        modals.code.close();
        setAccessCode("");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao buscar item:", error);
      return false;
    }
  };

  const handleDeleteItem = async (code) => {
    setItemToDelete({ code, name: currentItem?.name });
    modals.confirm.open();
  };

  const confirmDelete = async () => {
    try {
      await deleteItem(itemToDelete.code);
      modals.edit.close();
      modals.confirm.close();
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  };
  const filteredItems = items.filter((item) => {
    const statusMap = {
      Todos: null,
      Encontrados: "FOUND",
      Perdidos: "LOST",
    };
    const mappedStatus = statusMap[filters.type];

    return (
      (filters.type === "Todos" || item.status === mappedStatus) &&
      (!filters.search ||
        item.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.location ||
        item.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        filters={filters}
        onSearch={handleSearch}
        onTypeChange={handleTypeChange}
        onFilterApply={handleFilterApply}
        onClearFilters={handleClearFilters}
      />
      <main className="w-full m-auto p-5 mt-28 max-w-7xl">
        <Header />
        <div className="my-6 border-b border-gray-200"></div>
        <section className="relative w-full flex flex-col sm:flex-row justify-between items-center gap-6 mt-16">
          <button
            onClick={handleAddItem}
            className="hidden sm:inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-all cursor-pointer"
          >
            Registrar perda/achado
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
            <p className="text-gray-700 font-semibold">
              Já registrou algo? Acesse com seu código.
            </p>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
              onClick={handleAccessCodeClick}
            >
              Acessar registro
            </button>
          </div>

          <AddItemFloatingButton onClick={handleAddItem} />
        </section>

        <div className="mt-8">
          {loading ? (
            <p className="text-center">Carregando itens...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <ItemList items={filteredItems} onViewDetails={handleViewDetails} />
          )}
        </div>
      </main>
      <Footer />

      {modals.edit.isOpen && (
        <ModalForm
          onClose={modals.edit.close}
          onSave={handleSaveItem}
          onDelete={currentItem && handleDeleteItem}
          item={currentItem}
          isEditing={!!currentItem}
        />
      )}

      {modals.success.isOpen && (
        <ModalSuccess
          onClose={modals.success.close}
          title={savedItemInfo?.name}
          code={savedItemInfo?.code}
        />
      )}

      {modals.code.isOpen && (
        <ModalCode
          onClose={() => modals.code.close()}
          onAccess={handleAccessWithCode}
          code={accessCode}
          setCode={setAccessCode}
        />
      )}

      {modals.confirm.isOpen && (
        <ModalConfirm
          onClose={modals.confirm.close}
          onConfirm={confirmDelete}
          message={`Seu item ${itemToDelete?.name} será excluído`}
        />
      )}
      {modals.details.isOpen && (
        <>
          {console.log(selectedItem)}
          <ItemDetailsModal
            item={selectedItem}
            onClose={modals.details.close}
          />
        </>
      )}
    </div>
  );
}

export default Home;
