'use client'; // Required for state, effects, and toast notifications

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import useAxiosPublic from "@/hooks/useAxiosPublic"; // Next.js alias path
import toast from "react-hot-toast";
import { renderStars } from "./RenderStars";

const ProductReviews = ({ productId, initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 0,
    comment: "",
    productId: productId,
  });
  
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Safety check just in case productId isn't ready yet
    if (!productId) return; 

    axiosPublic
      .get("/reviews")
      .then((res) => {
        const filterReviews = res.data.filter((i) => i.productId === productId);
        setReviews(filterReviews);
      })
      .catch((error) => {
        console.error("Failed to fetch reviews:", error);
      });
  }, [productId, axiosPublic]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.author && newReview.rating > 0 && newReview.comment) {
      const reviewData = {
        ...newReview,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      };

      const previousReviews = [...reviews];
      setReviews([reviewData, ...reviews]);

      // Reset form
      setNewReview({ author: "", rating: 0, comment: "", productId: productId });

      axiosPublic
        .post("/reviews", reviewData)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Review submitted successfully!");
          }
        })
        .catch((err) => {
          console.error("Error submitting review:", err);
          toast.error("Failed to submit review. Please try again.");
          setReviews(previousReviews); // Revert UI if backend fails
        });
    } else {
      toast.error("Please fill in all fields and provide a rating.");
    }
  };

  // Safe average calculation to prevent NaN errors
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / reviews.length
      : 0;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Customer Reviews
        </h2>

        {/* Overall Rating Summary */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
          <p className="text-5xl font-extrabold text-gray-900">
            {averageRating.toFixed(1)}
          </p>
          <div className="flex flex-col items-center">
            {/* Using the safe, globally imported renderStars here */}
            {renderStars(averageRating)}
            <p className="text-gray-600 text-sm mt-1">
              {reviews.length} total reviews
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Review Submission Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Write a Review
            </h3>
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={newReview.author}
                  onChange={handleReviewChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        newReview.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Review
                </label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  rows="4"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Existing Reviews Display */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              All Reviews ({reviews.length})
            </h3>
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">
                        {review.author}
                      </p>
                      <div className="flex items-center space-x-2">
                        {/* Using the safe, globally imported renderStars here */}
                        {renderStars(review.rating)}
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;