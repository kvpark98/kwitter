import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Detail</h1>
    </div>
  );
}

export default Detail;
