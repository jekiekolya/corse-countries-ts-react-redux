import { useSelector } from "react-redux";
import { setSearch } from "./controls-slice";
import { selectSearch } from "./controls-selector";
import { useAppDispatch } from "store";
import { ChangeEventHandler } from "react";

export const useSearch = (): [string, ChangeEventHandler<HTMLInputElement>] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [search, handleSearch];
};
