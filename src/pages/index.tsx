/**
 * Homepage
 */
import { useEffect } from "react";

const HomePage: React.FC = () => {
  useEffect(() => {
    console.log("test fsdf");
  }, []);

  return (
    <main>
      <h1>Hello, SrfGroup</h1>
    </main>
  );
};

export default HomePage;
