import Topbar from "components/Topbar";
import React from "react";
import { Input } from "@/components/ui/input";
import { TextArea } from "components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MyCourses = () => {
  return (
    <>
      <Topbar heading={"Courses"} />
      <div className="container py-5 sm:text-left sm:m-[-12px]">My Courses</div>
      <div className="flex sm:flex-col border-2 border-[black] p-5 mx-10 md:mx-6 md:mt-6 mt-10 gap-5 sm:mb-8 sm:ml-4 sm:gap-0 justify-between rounded-[20px] sm:w-[90%] sm:p-3 sm:mx-5">
        <div className="w-[30%]">
          <div>
            <h1 className="text-start font-semibold mb-3">Courses</h1>
            <input
              type="text"
              className="flex mb-12 sm:mb-4 h-12 !bg-[#002D51] sm:w-[330%]  text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
          <div>
            <h1 className="text-start font-semibold mb-3">Subject</h1>
            <input
              type="text"
              className="flex h-12 sm:mb-4 !bg-[#002D51] sm:w-[330%] text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div>
            <h1 className="text-start font-semibold mb-3">Standard</h1>
            <input
              type="text"
              className="flex  mb-12 h-12 sm:mb-4 !bg-[#002D51] sm:w-[330%]  text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
          <div>
            <h1 className="text-start font-semibold mb-3">Module</h1>
            <input
              type="text"
              className="flex h-12 sm:mb-4 !bg-[#002D51] sm:w-[330%]  text-white-A700 !rounded-md border !border-slate-200 bg-white !px-3 !py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>
        <div className="w-[30%]">
          <div>
            <h1 className="text-start font-semibold mb-3">Description</h1>
            <TextArea
              name="Description"
              placeholder=""
              className="w-full sm:w-[330%] rounded-[0.375rem] font-medium h-[175px]"
            />
          </div>
        </div>
      </div>

      {/* <div className=" border-2 border-[black] p-5 mx-10 mb-10 gap-48 rounded-b-[20px]">
        <Table>
          <TableCaption className="text-black-900 font-semibold text-xl">Lessons</TableCaption>
          <TableHeader className="border-2 border-[black] ">
            <TableRow>
              <TableHead className="w-[100px] border-r-2 border-[black] text-black-900">No.</TableHead>
              <TableHead className="border-r-2 w-[100px] border-[black] text-black-900">Status</TableHead>
              <TableHead className="text-right "></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-2 border-[black]">
            <TableRow>
              <TableCell className="font-medium  border-r-2  border-[black] text-black-900"></TableCell>
              <TableCell className="border-r-2 border-[black] text-black-900"></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
    </>
  );
};

export default MyCourses;
