import Button from "react-bootstrap/Button";
import ModalBs from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormBs from "react-bootstrap/Form";
import { useContext } from "react";
import { ItemsContext, UPLOAD_ITEMS } from "../../../Context/ItemsContext";
import { axiosInstance } from "../../../services/axios.config";

const Modal = (props) => {
    const { items, dispatch } = useContext(ItemsContext)

    const initialValues = {
        name: props.item.name || '',
        description: props.item.description || '',
        image: props.item.image || '',
        stock: props.item.stock || '',
        price: props.item.price || '',
      };
    
      const validationSchema = Yup.object().shape({
        name: Yup.string()
          .min(4, "Nombre demasiado corto")
          .max(20, "Nombre demasiado largo")
          .required("El campo es obligatorio"),
        description: Yup.string()
          .min(10, "Descripción demasiado corta")
          .max(150, "Descripción demasiado larga")
          .required("El campo es obligatorio"),
        image: Yup.string().required("El campo es obligatorio"),
        stock: Yup.number().required("El campo es obligatorio"),
        price: Yup.number().required("El campo es obligatorio"),
      });

  return (
    <ModalBs
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBs.Header closeButton className="bg-dark">
        <ModalBs.Title id="contained-modal-title-vcenter">
          Modal heading
        </ModalBs.Title>
      </ModalBs.Header>
      <ModalBs.Body className="bg-dark">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ async (values, { setSubmitting }) => {
          console.log(values);
        //   
        axiosInstance.put(`/${props.item.id}`, values)
        .then(r =>{
            if (r.status === 200) {
                const itemsUpload = items.map(item =>{
                    if(item.id === r.data.id){
                        return r.data
                    }
                    return item
                }) 
                dispatch({type:UPLOAD_ITEMS, payload: itemsUpload})
                setSubmitting(false)              
            }else{
                throw new Error(`[ERROR ${r.status}] Error en la solicitud`)
            }                  
        })
        .catch(err => console.log(err))
        props.onHide()
        }}
      >
        {({ values, isSubmitting, touched, errors, handleChange }) => (
          <Form>
            <FormBs.Group className="mb-3">
              <label htmlFor="name">Nombre del producto</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Buzo"
                className="form-control field-input"
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <ErrorMessage name="name" component="div"></ErrorMessage>
              )}
            </FormBs.Group>
            <FormBs.Group className="mb-3">
              <label htmlFor="description">Descripción</label>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="Descripción del producto"
                className="form-control field-input"
                onChange={handleChange}
              />
              {errors.description && touched.description && (
                <ErrorMessage name="description" component="div"></ErrorMessage>
              )}
            </FormBs.Group>
            <FormBs.Group className="mb-3">
              <label htmlFor="image">Imagen</label>
              <Field
                type="text"
                id="image"
                name="image"
                placeholder="Imagen"
                className="form-control field-input"
                onChange={handleChange}
              />
              {errors.image && touched.image && (
                <ErrorMessage name="image" component="div"></ErrorMessage>
              )}
            </FormBs.Group>
            <FormBs.Group className="mb-3">
              <label htmlFor="stock">Stock</label>
              <Field
                type="text"
                id="stock"
                name="stock"
                placeholder="stock"
                className="form-control field-input"
                onChange={handleChange}
              />
              {errors.stock && touched.stock && (
                <ErrorMessage name="stock" component="div"></ErrorMessage>
              )}
            </FormBs.Group>
            <FormBs.Group className="mb-3">
              <label htmlFor="price">Precio</label>
              <Field
                type="text"
                id="price"
                name="price"
                placeholder="price"
                className="form-control field-input"
                onChange={handleChange}
              />
              {errors.price && touched.price && (
                <ErrorMessage name="price" component="div"></ErrorMessage>
              )}
            </FormBs.Group>
            <Button className="btn btn-primary" type="submit">
              Cargar producto
            </Button>
            {isSubmitting ? <p>Enviando nuevo producto</p> : null}
          </Form>
        )}
      </Formik>        
      </ModalBs.Body>
      <ModalBs.Footer className="bg-dark">
        <Button onClick={props.onHide}>Close</Button>
      </ModalBs.Footer>
    </ModalBs>
  );
};

export default Modal;
