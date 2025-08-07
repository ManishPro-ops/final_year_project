import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaids, toggleShowAll } from "../store/maidSlice";
import MaidCard from "./MaidCard";

const MaidList = () => {
  const dispatch = useDispatch();
  const { data: maids, status, showAll, error } = useSelector((state) => state.maids);

  useEffect(() => {
    if (status === "idle") dispatch(fetchMaids());
  }, [status, dispatch]);

  const visibleMaids = showAll ? maids : maids.slice(0, 6);

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Available Maids</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleMaids.map((maid) => (
          <MaidCard key={maid._id} maid={maid} />
        ))}
      </div>

      {maids.length > 6 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => dispatch(toggleShowAll())}
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-150 ease-in-out"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MaidList;
