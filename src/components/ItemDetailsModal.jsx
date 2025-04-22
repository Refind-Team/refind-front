import React from 'react';

const ItemDetailsModal = ({ item, onClose }) => {
  if (!item) {
    return null;
  }

  const { nome, descricao, encontradoPor, categoria, localizacao, data, status, imageUrl } = item;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-color-body rounded-lg shadow-xl w-full max-w-md p-6">
        <button onClick={onClose} className="absolute top-2 right-2 text-color-text hover:text-ccolor-title-subtitle focus:outline-none">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-ccolor-title-subtitle">{nome}</h2>
        </div>

        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt={nome} className="rounded-md w-full h-auto object-cover max-h-60" />
          </div>
        )}

        <div className="mb-2">
          <h3 className="text-lg font-medium text-color-text">Descrição</h3>
          <p className="text-color-text">{descricao}</p>
        </div>

        <div className="mb-2">
          <h3 className="text-lg font-medium text-color-text">Encontrado por</h3>
          <p className="text-color-text">{encontradoPor || 'Não informado'}</p>
        </div>

        <div className="mb-2">
          <h3 className="text-lg font-medium text-color-text">Categoria</h3>
          <p className="text-color-text">{categoria}</p>
        </div>

        <div className="mb-2">
          <h3 className="text-lg font-medium text-color-text">Localização</h3>
          <p className="text-color-text">{localizacao || 'Não informada'}</p>
        </div>

        <div className="mb-2">
          <h3 className="text-lg font-medium text-color-text">Data</h3>
          <p className="text-color-text">{data}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-color-text">Status</h3>
          <p className="text-color-text">{status}</p>
        </div>

        <div className="mt-6">
          <button className="bg-ccolor-primary text-color-white-text py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Entrar em contato
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;