import React, { useState, useEffect } from "react";
import server from "../../services/api";
import ProductThumbnail from "../../components/ProductThumbnail";

const Recommendation = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await server.get(
          `/products/${productId}/recommendations`
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [productId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recommendations.map((product) => (
          <ProductThumbnail key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
