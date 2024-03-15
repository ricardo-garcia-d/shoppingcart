import React, { useContext, useState } from 'react'; // Added useState here
import { CartContext } from '../context/Context';
import SingleProduct from './SingleProduct'; 

const Home = () => {
  const { state: { products, productFilter }, updateProductFilter } = useContext(CartContext);
  const categories = ["All", ...new Set(products.map(product => product.category))];
  const [selectedCategory, setSelectedCategory] = useState(productFilter);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateProductFilter(category);
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <>
      <div className="filter-container">
        <select onChange={handleCategoryChange} value={selectedCategory}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => ( // Make sure to use filteredProducts here
          <SingleProduct key={product.id} prod={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
