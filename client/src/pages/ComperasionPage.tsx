import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ComparasionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/request/${id}`);
      return response.data;
    },
    onError(err) {
      throw err;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while getting data! try again please</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-start items-start">
      <div className="flex flex-col justify-start items-start gap-y-4 py-10">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="text-md font-bold text-start">Question: </div>
          <Button onClick={() => navigate("/")}><ArrowRight className="w-6 h-6" /></Button>
        </div>
        <p className="w-full text-md font-normal text-start text-wrap">
          {data.requestDescription}
        </p>
        <div className="text-md font-bold text-start">Urls: </div>
        {data.urls.map((url: any, index: number) => {
            return <Link key={index} className="text-start line-clamp-1 underline" target="_blank" to={url.value}>Product {index + 1}</Link>
        })}
      </div>
      <hr className="bg-gray-400 w-full" />
      <ReactMarkdown className={"text-start py-10"}>
        {data.result}
      </ReactMarkdown>
    </div>
  );
}
