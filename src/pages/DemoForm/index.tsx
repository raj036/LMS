import React, { useState, useEffect } from "react";
import Topbar from "components/Topbar";
import { DataTable } from "./d-table";
import { columns } from "./columns";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";
import Swal from "sweetalert2";
import Loader from "components/Loader";
import { Helmet } from "react-helmet";

const Enquiry = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user }: any = useAuthContext();

  useEffect(() => {
    fetchEnquiry();
  }, [user]);

  const fetchEnquiry = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/demoformfill/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = response.data;
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error, "Error fetching Users Data");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.detail,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Demo</title>
      </Helmet>
      <Topbar heading={"Demo Enquiries"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="mx-auto">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Enquiry;