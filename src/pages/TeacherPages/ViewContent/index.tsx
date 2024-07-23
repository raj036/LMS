import Topbar from "components/Topbar";
import React, { useEffect, useState } from "react";
import axios from "helper/axios";
import { useAuthContext } from "hooks/useAuthContext";
import Swal from "sweetalert2";
import Loader from "components/Loader";
import { Helmet } from "react-helmet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ViewContent = () => {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [detailId, setDetailId] = useState(null);
  const { user }: any = useAuthContext();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const detailId = queryParams.get("detailId");

    if (detailId) setDetailId(detailId);

    if (detailId) {
      getCourseDetails(detailId);
    }
  }, []);

  const getCourseDetails = async (detailId: any) => {
    try {
      const response = await axios.get(`/api/course_contents/${detailId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data);
      setCourseData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container my-10">
            <div className="my-9 text-center text-[25px]">
              <h3>Course Details</h3>
            </div>
            {courseData && (
              <div className="mb-7">
                <div></div>
                <div className="flex justify-center">
                  <h3 className="p-[20px] border-2">
                    {courseData.course_name}
                  </h3>
                  <h3 className="p-[20px] border-2">
                    {courseData.subject_name}
                  </h3>
                  <h3 className="p-[20px] border-2">
                    {courseData.standard_name}
                  </h3>
                  <h3 className="p-[20px] border-2">
                    {courseData.module_name}
                  </h3>
                </div>
              </div>
            )}
            <div className="px-[200px]">
              {courseData && (
                <Table className="border-[1px] px-[100px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" bg-teal-900 text-white-A700">
                        Lesson
                      </TableHead>
                      <TableHead className="text-center bg-teal-900 text-white-A700">
                        Descripton
                      </TableHead>
                      <TableHead className="text-right bg-teal-900 text-white-A700">
                        Download
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseData.lessons.map((lesson) => (
                      <TableRow key={lesson.lesson_id}>
                        <TableCell className="">{lesson.title}</TableCell>
                        <TableCell className="text-center">
                          {lesson.content_info.map((content) => (
                            <div key={content.id}>{content.description}</div>
                          ))}
                        </TableCell>
                        <TableCell className="text-right">
                          {lesson.content_info.map((content) => (
                            <div key={content.id}>
                              {content.content_path.map((path, index) => (
                                <div key={index} className="flex justify-end">
                                  <a
                                    href={path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mr-2"
                                  >
                                    View {index + 1}
                                  </a>
                                  <a href={path} download className="ml-2">
                                    Download {index + 1}
                                  </a>
                                </div>
                              ))}
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewContent;
