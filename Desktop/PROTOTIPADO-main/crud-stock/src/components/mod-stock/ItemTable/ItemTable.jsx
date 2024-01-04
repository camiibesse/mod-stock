import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { axiosInstance } from "../../../services/axios.config";
import { ItemsContext, UPLOAD_ITEMS } from "../../../Context/ItemsContext";


const ItemTable = ({ item }) => {
  const { name, price, stock, image, id } = item;
  const [modalShow, setModalShow] = useState(false);
  const {items, dispatch} = useContext(ItemsContext)

  const handleDelete = (id) =>{
    axiosInstance.delete(`/${id}`)
    .then(r => {
        if (r.status === 200) {
            const itemsUpload = items.filter(item => item.id !== r.data.id)
            console.log(itemsUpload)
            dispatch({type:UPLOAD_ITEMS, payload: itemsUpload})
        }
    })
  }

  return (
    <>
    <tr className="align-middle">
      <td style={{textAlign:'center'}}>{id}</td>
      <td style={{textAlign:'center'}}>{name}</td>
      <td style={{textAlign:'center'}}>{price}</td>
      <td style={{textAlign:'center'}}>{stock}</td>
      <td style={{textAlign:'center'}}><img src={image} alt={name} style={{width:'100px', height:'100px'}}/></td>      
      <td style={{textAlign:'center'}}>
        <i style={{ cursor: "pointer", margin:'10px'}} className="bi bi-trash3-fill"onClick={()=>handleDelete(id)} ></i>
        <i style={{ cursor: "pointer", margin:'10px' }} className="bi bi-pencil-square" onClick={() => setModalShow(true)} ></i>
      </td>
    </tr>
    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    item={item}    
    />
    </>
  );
};

export default ItemTable;
