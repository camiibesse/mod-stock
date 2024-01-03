import TableBs from "react-bootstrap/Table";
import ItemTable from "../ItemTable/ItemTable";

const Table = ({ items }) => {
  return (
    <TableBs striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Productos</th>
          <th>Precio</th>
          <th>Stock</th>
          <th style={{textAlign: 'center'}}>Modificar</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <ItemTable item={item} key={i} />
        ))}        
      </tbody>
    </TableBs>
  );
};

export default Table;
