import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets ', href: '/tickets/new' },
    currentUser && { label: 'My Orders ', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="navbar-brand">{label}</a>
          </Link>
        </li>
      );
    });

  // [false, false, { label: 'Sign Out', href: '/augh/signout'}]
  // OR [{ label: 'Sign Up', href: '/augh/signup'}, { label: 'Sign In', href: '/augh/signin'}, false]

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end"></div>
      <ul className="nav d-flex align-items-center">{links}</ul>
    </nav>
  );
};
