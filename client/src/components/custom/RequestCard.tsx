import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom"

export default function RequestCard({ request }: { request: any }) {

    const navigate = useNavigate();

    return <Card onClick={() => navigate(`/result/${request.id}`)} className="text-start transition hover:opacity-75">
        <CardContent>
            <CardHeader className="text-start">
                <CardTitle className="line-clamp-4 text-md text-start">
                    {request.requestDescription}
                </CardTitle>
            </CardHeader>
        </CardContent>
    </Card>
}