import Topbar from "components/Topbar";
import React from "react";

const Courses = () => {
  return (
    <>
      <Topbar heading={"Courses"} />
      <div className="container py-5">
        <div className="grid grid-cols-4 gap-1 rounded">
          <div className="flex flex-col items-center justify-center rounded p-2">
            <h1 className="text-2xl font-bold">Courses</h1>
          </div>
          {/* <div className="flex flex-col items-center justify-center border-2 rounded p-2">
            <h1 className="text-2xl font-bold">Standard</h1>
          </div>
          <div className="flex flex-col items-center justify-center border-2 rounded p-2">
            <h1 className="text-2xl font-bold">Subject</h1>
          </div>
          <div className="flex flex-col items-center justify-center border-2 rounded p-2">
            <h1 className="text-2xl font-bold">Module</h1>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Courses;
