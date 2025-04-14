import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Tooltip,
} from "recharts";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BookingChart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: rechartUse = [], isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/my-all-booking/${user?.email}`
      );
      // console.log("Fetched data:", data); // Optional: Debugging
      return data;
    },
  });

  if (isLoading || !user) return <Loading />;

  const chartData = rechartUse.map((item) => ({
    product_title: item.carModel || "Unknown",
    price: item.dailyRentalPrice || 0,
  }));

  return (
    <div>
      {/* Header */}
      <div className="bg-[#9538E2] md:p-10">
        <div className="flex justify-center items-center md:gap-3 gap-2 flex-col text-white">
          <h1 className="font-bold text-2xl">Booking Car Chart</h1>
          <p className="lg:w-4xl text-center">Your Booking Chart List</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-[90%] mx-auto mb-10">
        {chartData.length > 0 ? (
          <div className="shadow-2xl rounded-2xl p-5 bg-white">
            <ResponsiveContainer width="100%" height={600}>
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="product_title" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Area dataKey="price" fill="#9538E226" stroke="#9538E2" />
                <Bar dataKey="price" barSize={20} fill="#9538E2" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="font-black text-4xl h-80">
            <p className="flex justify-center h-full items-center">
              Data is not available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingChart;
