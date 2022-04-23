import React from 'react';
//css
import '../../styles/user.css';

export default function User(user) {
  const { avatar, first_name: fn, last_name: ln, email } = user;

  const renderAvatar = () => (
    <img className='user-image' src={avatar} alt={`${ln}, ${fn}`} />
  );
  const renderFullName = () => <small> {`${ln}, ${fn}`} </small>;
  const renderEmail = () => <small>{email}</small>;

  return (
    <main className='user-container'>
      <section className='user-inner-container'>
        <article>{renderAvatar()}</article>
        <article style={{ paddingTop: '1rem' }}>{renderFullName()}</article>
        <article>{renderEmail()}</article>
      </section>
    </main>
  );
}
