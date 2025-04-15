import '../app/Loader.css';
const Loader = () => {
  return (
    <section className='loader-container'>
      <div className='loader'>
        <span className='loader-text'>Loading</span>
        <span className='load'></span>
      </div>
    </section>
  );
};
export default Loader;
