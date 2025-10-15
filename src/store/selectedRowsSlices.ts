import { createSlice} from "@reduxjs/toolkit";
import type  { PayloadAction } from "@reduxjs/toolkit";

interface SelectedRowsState {
  selectedIds: number[];
}

const initialState: SelectedRowsState = {
  selectedIds: [],
};

const selectedRowsSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    setSelectedIds(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },
    clearSelectedIds(state) {
      state.selectedIds = [];
    }
  }
});

export const { setSelectedIds, clearSelectedIds } = selectedRowsSlice.actions;
export default selectedRowsSlice.reducer;
