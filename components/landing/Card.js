const Card = ({ num, title, content }) => {
  return (
    <div className="card bg-base-100 w-fit md:w-96 border-2 md:border-4 border-primary">
      <div className="card-body items-center text-center gap-4 md:gap-6">
        <div className="w-20 h-20 flex justify-center items-center rounded-full bg-primary text-base-100 text-4xl font-bold">
          {num}
        </div>
        <h1 className="card-title text-xl md:text-2xl">{title}</h1>
        <p className="text-sm md:text-base">{content}</p>
      </div>
    </div>
  );
};

export default Card;
