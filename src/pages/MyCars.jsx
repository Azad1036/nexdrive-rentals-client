import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import MyAllCars from "../components/MyAllCars";

const MyCars = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filterDate, setFilterDate] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  console.log(filterDate);

  // Get My Car List
  const { data: myCarList = [], isLoading } = useQuery({
    queryKey: ["myCars", user?.email, filterDate, sortPrice],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-carList/${
          user?.email
        }?filterDate=${filterDate}`
      );
      return data;
    },
  });

  // Delete Car
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/delete-myCar/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCars"] });
      Swal.fire("Deleted!", "Your car has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "There was a problem deleting your car.", "error");
    },
  });

  const handleDeleteMyCar = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this car?",
      text: "You won't be able to revert this!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await mutateAsync(id);
      } catch (error) {
        toast.error(error.message || "Try again");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Cars</h1>
        <Link
          to="/add-car"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Add New Car
        </Link>
      </div>

      {/* Sorting and Search UI */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        {/* Left side: Sorting by Date */}
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => setFilterDate(e.target.value)}
            value={filterDate}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={""}>Sort by Date</option>
            <option value="date-desc">Date Added (Newest First)</option>
            <option value="date-asc">Date Added (Oldest First)</option>
          </select>
        </div>

        {/* Right side: Sorting by Price */}
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => setSortPrice(e.target.value)}
            defaultValue="Sort by Price"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled>Sort by Price</option>
            <option value="price-asc">Price (Lowest First)</option>
            <option value="price-desc">Price (Highest First)</option>
          </select>
        </div>
      </div>

      {/* Table of My Cars */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Daily Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myCarList.map((carlist) => (
                <MyAllCars
                  key={carlist._id}
                  carlist={carlist}
                  handleDeleteMyCar={handleDeleteMyCar}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional: Empty state */}
      {myCarList.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-6">
          <i className="fas fa-car text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cars added yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first car to the platform
          </p>
          <Link
            to="/add-car"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <i className="fas fa-plus mr-2"></i> Add Car
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCars;
