const Card = ({ id, description, onMouseEnter, onMouseLeave, isSelected }) => (
    <div className={`background bg-${id}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={`hero_image img-${id} relative border-solid border-r-4`}>
        <div className='absolute w-full h-full bg-black opacity-60 cursor-pointer'></div>
      </div>
      <div className="number">{id}.</div>
      <div className={`description ${isSelected ? 'show' : ''}`}>{description}</div>
      <span className='letter'>{description.charAt(0)}</span>
    </div>
  );
  
  export default Card;
  