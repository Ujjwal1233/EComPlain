import { useNavigate } from "react-router-dom";
import { ComplainsDetail } from "../components/ComplainsDetails";
import { TopicsDetails } from "../components/TopicsDetails";
import { WordsDetails } from "../components/WordsDetails";
import { UserDetails } from "../components/UsersDetails";

export const AdminPage = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div>
        <div className="text-center font-medium text-5xl">Admin Dashboard</div>
        <div className="flex-col">
          <div>
            <ComplainsDetail />
          </div>
          <div>
            <TopicsDetails />
          </div>
          <div>
            <WordsDetails />
          </div>
          <div>
            <UserDetails />
          </div>
        </div>
      </div>
    </div>
  );
};
