import { Dispatch, SetStateAction } from "react";

const handleColor = (
  setShowColors: Dispatch<SetStateAction<boolean>>,
  showColors: boolean
) => {
  setShowColors(!showColors);
};

export default handleColor;
