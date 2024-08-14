import { Editor } from "../components/Editor";

export const CreateComplain = () => {
  return (
    <div>
      <Editor
        label={"Create Complain"}
        url={"/complain/createcomplain"}
        navigateTo={"/complains"}
        buttonLabel={"Create Complain"}
      />
    </div>
  );
};
