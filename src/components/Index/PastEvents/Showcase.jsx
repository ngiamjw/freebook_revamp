// Showcase.jsx

const [activeCard, setActiveCard] = useState(null);

return (
  <div className="cards-wrapper">
    {cards.map((card) => (
      <ShowcaseCard
        key={card.id}
        card={card}
        active={activeCard === card.id}
        onHover={() => setActiveCard(card.id)}
      />
    ))}
  </div>
);