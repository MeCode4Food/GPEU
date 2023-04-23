import React from 'react';

interface CardProps {
  id: string;
  value: string;
  title: string;
  onClick: (id: string) => void;
  onRemove: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, value, title, onClick, onRemove }) => {
  return (
    <div className="bg-white mx-2 my-2 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex justify-end">
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 mr-2 whitespace-nowrap text-white font-bold py-2 px-4 rounded"
          onClick={() => onClick(value)}
        >
          Go To Project
        </button>
        <button
          className="mt-2 bg-red-500 hover:bg-red-600 whitespace-nowrap text-white font-bold py-2 px-4 rounded"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Card;
