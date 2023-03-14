import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country, Extra, Status } from "types";

export const loadCountryByName = createAsyncThunk<
  { data: Country[] },
  string,
  {
    extra: Extra;
    rejectValue: string;
  }
>("@@details/load-country-by-name", (name, { extra: { client, api } }) => {
  return client.get(api.searchByCountry(name));
});
export const loadNeighborsByBorder = createAsyncThunk<
  { data: Country[] },
  string[],
  {
    extra: Extra;
    rejectValue: string;
  }
>("@@details/load-neighbors", (borders, { extra: { client, api } }) => {
  return client.get(api.filterByCode(borders));
});

type DetailsSlice = {
  currentCountry: null | Country;
  neighbors: string[];
  status: Status;
  error: null | string;
};

const initialState: DetailsSlice = {
  currentCountry: null,
  neighbors: [],
  status: "idle",
  error: null,
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Can not get data!";
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
