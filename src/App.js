import { useEffect , useState } from "react" ;
import { motion , AnimatePresence } from "framer-motion";
import './App.css';

function Filter({setActive, popular, setFiltred, active}) {

  useEffect(() => {
    if (active === 0)
    {
      setFiltred(popular)
      return ;
    }
    const filtred = popular.filter((movie) => movie.genre_ids.includes(active));
    setFiltred(filtred)
  }, [active]);

  return (
    <div className="filtercontainer">
      <button className={active === 0 ? "active" : ""} onClick={() => setActive(0)}>All</button>
      <button className={active === 35 ? "active" : ""} onClick={() => setActive(35)}>Comedy</button>
      <button className={active === 28 ? "active" : ""} onClick={() => setActive(28)}>Action </button>
    </div>
  )
}

function Movie({item}) {
  // console.log(item);
  return (
    <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{duration: 0.5}} >
      <h2>{item.original_title}</h2>
      <img src={"https://image.tmdb.org/t/p/w500" + item.backdrop_path} alt="Image Not Found"/>
    </motion.div>
  )
}

function App() {

  const [popular, setPopular] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [active, setActive] = useState(0); 

  useEffect(() => {
    fetchpopular();
  }, []);

  const fetchpopular = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=0ee14f679e94262ee9145d7bbe9aa4a3&language=en-US&page=1");
    const movies = await data.json();
    setPopular(movies.results);
    setFiltred(movies.results);
    // console.log(popular);
  }

  return (
    <div className='container'>
        <Filter popular={popular} setFiltred={setFiltred} active={active} setActive={setActive}/>
      <motion.div className="popularMovies" layout>
        <AnimatePresence>
          {filtred.map((item) => {
            return <Movie key={item.id} item={item}/>
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
