import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import FormBs from "react-bootstrap/Form";
import "./formulario.css";
import { axiosInstance } from "../../../services/axios.config";

const FormCreateProduct = () => {
  const initialValues = {
    name: "",
    description: "",
    image: "",
    stock: "",
    price: "",
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
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { isSubmitting }) => {
          console.log(values);
          axiosInstance
            .post("/", values)
            .then((r) => {
              if (r.status === 201) {
                console.log(r);
                isSubmitting(false);
              }else{
                throw new Error(`[${r.status}]error en la solicitud`)
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ values, isSubmitting, touched, errors }) => (
          <Form>
            <FormBs.Group className="mb-3">
              <label htmlFor="name">Nombre del producto</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Buzo"
                className="form-control field-input"
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
    </div>
  );
};

export default FormCreateProduct;
