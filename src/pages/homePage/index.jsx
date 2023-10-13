import { Button } from "@mui/material";
import "./homepage.module.css";

function Homepage() {
  return (
    <>
      <div className="homepage-container" id="homepage">
        <h1>Booklist App</h1>
        <p>
          This app is designed to test CORS, protect against Clickjacking, and
          prevent XSS attacks.
        </p>
        <Button variant="contained" href="/avicena" style={{ margin: "10px" }}>
          Avicena{"'s"} Book
        </Button>
        <Button variant="contained" href="/najmy" style={{ margin: "10px" }}>
          Najmy{"'s"} Book
        </Button>
        <Button variant="contained" href="/deffi" style={{ margin: "10px" }}>
          Deffi{"'s"} Book
        </Button>
      </div>
      <footer>© 2023 Muhammad Avicena. All Rights Reserved. </footer>
    </>
  );
}

export default Homepage;
