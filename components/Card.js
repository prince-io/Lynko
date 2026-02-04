const Card = ({ num, title, content }) => {
  return (
    <div className="card bg-base-100 md:w-96">
      <div className="card-body items-center text-center gap-6">
        <div className="w-20 h-20 flex justify-center items-center rounded-full bg-primary text-base-100 text-4xl font-bold">
          {num}
        </div>
        <h1 className="card-title text-2xl">{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card;
