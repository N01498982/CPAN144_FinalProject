import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../features/usersSlice';
//components
import User from './User';
import LogOut from '../component-login-logout/LogOut';
//css
import '../../styles/users.css';

export default function Users() {
  //redux-related
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);

  //searc states
  const [searchInput, setSeacrhInput] = React.useState('');
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  //useEffect
  React.useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers());
  }, [dispatch, status]);

  //filtering users [using an input]
  const returnFilteredUsers = () => {
    const filterUser = users?.filter((user) =>
      user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredUsers(filterUser);
  };

  //useEffect
  React.useEffect(() => {
    returnFilteredUsers();
  }, [searchInput, users]);

  //render logout
  const renderLogout = () => {
    return <LogOut />;
  };

  //rendering search bar
  const renderSearch = () => {
    return (
      <>
        <button disabled>search</button>
        <input
          type='text'
          value={searchInput}
          onChange={(e) => setSeacrhInput(e.target.value)}
          placeholder='e.g example@reqres.in'
        />
      </>
    );
  };

  //rendering users
  const renderUsers = () => {
    return !filteredUsers || filteredUsers.length === 0 ? (
      <h1 style={{ textAlign: 'center' }}>Users not found ...</h1>
    ) : (
      filteredUsers?.map((user, idx) => <User key={idx} {...user} />)
    );
  };

  return (
    <main className='users-container'>
      <section>
        <article>{renderLogout()}</article>
      </section>
      <section>
        <article className='render-search'>{renderSearch()}</article>
      </section>
      <section>
        <article className='render-users'>{renderUsers()}</article>
      </section>
    </main>
  );
}
