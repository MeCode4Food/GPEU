import React from 'react';
import Card from './card';

interface CardListProps {
  cards: { id: string; title: string, value: string }[];
  onClick: (value: string) => void;
  onRemove: (id: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onClick, onRemove }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-auto gap-3 card-list">
      {cards.map((card) => (
          <Card 
            key={card.id} id={card.id} value={card.value}
            title={card.title} onClick={onClick}
            onRemove={onRemove} 
          />
      ))}
    </div>
  );
};

export default CardList;
