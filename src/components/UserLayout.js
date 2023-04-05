import Header from './Header';
import NavSidebar from './NavSidebar';

export default function UserLayout(props) {
  const removeLayer = () => {
    document.getElementById('root').classNameList.remove('dash-main-className-add');
  };

  return (
    <>
      <Header />
      <NavSidebar />
      {props.children}
      <div className="overlay toggle-icon-main" onClick={removeLayer}></div>
    </>
  );
}
