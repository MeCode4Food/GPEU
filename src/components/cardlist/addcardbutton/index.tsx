import React from 'react';

interface AddCardButtonProps {
  onClick: () => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick }) => {
  return (
    <div className="add-card-button">
      <button onClick={onClick}>Add Card</button>
    </div>
  );
};

export default AddCardButton;
