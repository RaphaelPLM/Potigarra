import React, { forwardRef } from "react";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Paper from "@material-ui/core/Paper";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Button from "../../../components/Button";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        fontWeight: 600,
        letterSpacing: 0.5,
        fontSize: 14,
      },
    },
  },
});

export default function MemberTable(props) {
  console.log(props.members);

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          searchFieldStyle: {
            height: "32px",
            fontSize: "14px",
          },
          headerStyle: {
            fontSize: 15,
          },
          headerStyle: {
            fontFamily: "'Roboto'",
            letterSpacing: "1px",
            fontSize: "12px",
            fontWeight: "400",
            color: "rgb(40, 40, 40)",
            whiteSpace: "nowrap",
            backgroundColor: "#ff7f69",
          },
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          paginationType: "stepped",
        }}
        title="MEMBROS"
        localization={{
          body: {
            emptyDataSourceMessage: "Nenhum registro foi encontrado.",
          },
          pagination: {
            labelRowsSelect: "registros",
            labelDisplayedRows: "{from}-{to} de {count}",
          },
          toolbar: {
            searchTooltip: "Pesquisar",
            searchPlaceholder: "Pesquisar membros",
          },
        }}
        icons={tableIcons}
        columns={[
          { title: "ID", field: "id" },
          { title: "NOME", field: "username" },
          { title: "CPF", field: "cpf" },
          {
            title: "CELULAR",
            field: "phone_number",
          },
          {
            title: "MEMBRO DESDE",
            field: "created_at",
          },
          {
            render: (data) =>
              data.status !== "Active" ? (
                <Button color="success" title="Ativar" />
              ) : (
                <Button color="error" title="Desativar" />
              ),
          },
        ]}
        data={props.members}
      />
    </ThemeProvider>
  );
}
