import RepositoryItem from "./RepositoryItem";
import useRepositoryView from "../hooks/useRepositoryView";

const RepositoryView = () => {
  const { repository } = useRepositoryView();

  return repository ? (
    <RepositoryItem {...repository} showUrlButton={true} />
  ) : null;
};

export default RepositoryView;
