import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./dashboard.module.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function Dashboard({ OwnerName, urlApi }) {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [newBookData, setNewBookData] = useState({
    name: "",
    author: "",
  });
  const [editBookData, setEditBookData] = useState({
    name: "",
    author: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    axios
      .get(`${urlApi}/api/v1/books`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, [setData, urlApi]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalEdit = (item) => {
    setIsModalEditOpen(true);
    setEditData(item);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBookData({
      ...newBookData,
      [name]: value,
    });
  };

  const handleInputChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditBookData({
      ...editBookData,
      [name]: value,
    });
  };

  const handleCreateBook = () => {
    setLoading(true);
    axios
      .post(`${urlApi}/api/v1/books`, newBookData)
      .then((response) => {
        setLoading(false);
        const newBook = response.data.data;
        setData([...data, newBook]);
        closeModal();
        fetchData();
      })
      .catch((error) => {
        closeModal();
        setLoading(false);
        console.error("Error creating book:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
      });
  };

  const handleEditBook = () => {
    axios
      .put(`${urlApi}/api/v1/books/${editData?._id}`, editBookData)
      .then((response) => {
        const newBook = response.data.data;
        console.log(newBook);
        closeModalEdit();
        fetchData();
      })
      .catch((error) => {
        closeModalEdit();
        console.error("Error creating book:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
      });
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`${urlApi}/api/v1/books/${itemId}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error creating book:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
      });
  };

  if (error) return <div>Error While Fetching Data...</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        {OwnerName}
        {"'s"} Fav Book
      </h1>
      <h2>Endpoint : {urlApi}</h2>
      <Button variant="contained" color="primary" onClick={openModal}>
        Create Book
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        href="/"
      >
        Go Back
      </Button>
      {data ? (
        data.map((item) => (
          <div key={item._id} className="book-item">
            <div>ID: {item._id}</div>
            <div>Book name: {item.name}</div>
            <div>Author: {item.author}</div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => openModalEdit(item)}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </Button>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}

      {/* Add Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Create a New Book</h2>
          <TextField
            label="Book Name"
            variant="outlined"
            name="name"
            value={newBookData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            variant="outlined"
            name="author"
            value={newBookData.author}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateBook}
          >
            Create
          </Button>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isModalEditOpen} onClose={closeModalEdit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Edit Book</h2>
          <TextField
            label="Book Name"
            variant="outlined"
            name="name"
            value={editBookData.name || editData?.name}
            onChange={handleInputChangeEdit}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            variant="outlined"
            name="author"
            value={editBookData.author || editData?.author}
            onChange={handleInputChangeEdit}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleEditBook}>
            Edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  OwnerName: PropTypes.string.isRequired,
  urlApi: PropTypes.string.isRequired,
};
