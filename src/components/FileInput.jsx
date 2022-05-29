import readInputFile from "../services/inputReaderService";

const FileInput = ({ setPackages }) => {
  return (
    <input
      type="file"
      className="input"
      onChange={(e) => readInputFile(e, setPackages)}
    />
  );
};

export default FileInput;
