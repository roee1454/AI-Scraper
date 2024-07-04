import RequestCard from "@/components/custom/RequestCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {

  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/requests");
      return response.data;
    },
    onError(err) {
      throw err;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[90vh] gap-y-2">
        <div className="font-bold text-xl">Loading Comperasion...</div>
        <BarLoader color="red" />
      </div>
    );
  }

  if (isError) {
    return <div>Error while loading data!</div>;
  }

  return (
    <div className="flex flex-col justify-start items-start py-12">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="text-md font-bold text-start">History of requests: </div>
        <Button onClick={() => navigate("/")}>
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
      <hr />
      <div className="grid grid-cols-2 justify-items-center content-center py-12 px-4 gap-20">
        {data.map((request: any) => {
          return <RequestCard key={request.id} request={request} />;
        })}
      </div>
    </div>
  );
}
