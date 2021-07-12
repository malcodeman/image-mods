import { useTable } from "react-table";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

type props = {
  columns: any;
  data: any;
};

function Table(props: props) {
  const { columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
    footerGroups,
  } = useTable({
    columns,
    data,
  });

  return (
    <ChakraTable size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((group) => (
          // eslint-disable-next-line react/jsx-key
          <Tr {...group.getHeaderGroupProps()}>
            {group.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                // eslint-disable-next-line react/jsx-key
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
        {footerGroups.map((group) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <Td {...column.getFooterProps()}>{column.render("Footer")}</Td>
              ))}
            </Tr>
          );
        })}
      </Tfoot>
    </ChakraTable>
  );
}

export default Table;
