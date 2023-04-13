const Rank = ({ user }) => {
  const { name, entries } = user;
  return (
    <div>
      <p className="white f3">{`${name}, your current entry count is...`}</p>
      <p className="white f1">{`#${entries}`}</p>
    </div>
  );
};

export default Rank;
