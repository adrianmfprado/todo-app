import { useParams, Link } from 'react-router-dom';

const User = () => {
  const { username, name } = useParams();
  return (
    <div>
      <h1>User Profile Page</h1>
      <h2>Username: { username }</h2>
      <h2>Nome: {name}</h2>

      <Link to='/'>Ir para a home</Link>
      <div>ou</div>
      <Link to='/login'>Ir para a login</Link>
    </div>
  );
};

export default User;
