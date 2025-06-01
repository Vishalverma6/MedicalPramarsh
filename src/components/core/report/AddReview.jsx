import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addReview } from '../../../services/operations/reportAPI';
// import { submitReview } from '../../../services/operations/reviewAPI';

const AddReview = () => {
  const { reportId } = useParams();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting review for:", reportId, data);

      await addReview(reportId, data, token, navigate );

      toast.success("Review submitted successfully");
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  if (user?.accountType !== "Expert") {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        Only experts can add reviews.
      </div>
    );
  }

  return (
    <div className="md:min-w-[450px] max-w-xl shadow-2xl shadow-violet-300 mx-auto p-6 bg-white  rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Add Review</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review
          </label>
          <textarea
            rows={5}
            placeholder="Write your review here..."
            {...register("review", { required: "Review is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
