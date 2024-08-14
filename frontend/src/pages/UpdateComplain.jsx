import { Editor1 } from "../components/Editor1";
import { useParams } from "react-router-dom";

export const UpdateComplain = () => {
  const { id } = useParams();

  return (
    <div>
      <Editor1
        label={"Update Complain"}
        url={"/complain/updatecomplain"}
        navigateTo={"/complains"}
        buttonLabel={"Update Complain"}
        complainId={id}
      />
    </div>
  );
};
