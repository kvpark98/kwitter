import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { propTypes } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/Detail" className="text-decoration-none">
        <h1 className={styles.title}>Learn-Korean-Well</h1>
      </Link>
    </div>
  );
}

export default Home;
