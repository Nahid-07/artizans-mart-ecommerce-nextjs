import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

export const renderStars = (rating) => {
  // Safely parse the rating, defaulting to 0 if anything goes wrong
  const validRating = Number(rating) || 0;
  const safeRating = Math.max(0, Math.min(5, validRating));

  // A fixed array of 5 slots. We literally cannot get an array length error here.
  const starSlots = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center text-yellow-400">
      {starSlots.map((index) => {
        // 1. Full Star
        if (safeRating >= index) {
          return <StarIconSolid key={index} className="w-5 h-5" />;
        } 
        // 2. Half Star (e.g., rating is 3.5, and index is 4)
        else if (safeRating >= index - 0.5) {
          return (
            <div key={index} className="relative w-5 h-5">
               <StarIconOutline className="absolute w-5 h-5 text-gray-300" />
               <div className="absolute w-[50%] h-5 overflow-hidden">
                 <StarIconSolid className="w-5 h-5 text-yellow-400" />
               </div>
            </div>
          );
        } 
        // 3. Empty Star
        else {
          return <StarIconOutline key={index} className="w-5 h-5 text-gray-300" />;
        }
      })}
    </div>
  );
};