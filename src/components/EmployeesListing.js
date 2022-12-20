import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./EmployeesListing.css";
import { FaEdit, FaTrash, FaInfo } from "react-icons/fa";
import { motion } from "framer-motion";
import { myContext } from "../ContextProvider";

function EmployeesListing() {
  const { API } = useContext(myContext);

  const [data, dataChange] = useState([]);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const LoadEdit = (id) => {
    navigate("/Employees/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(API+"Employee/delete/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
   
 
  useEffect(() => {
    fetch(API + "Employee/getall")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        dataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);



  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <div className="nav"></div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="divbtn">
              <input
                className="form-control form-control-sm ml-3 w-75"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              />

              <Link
                to="employee/create"
                className="btn btn-success"
                id="employee"
              >
                Yeni Personel Ekle
              </Link>
            </div>
            <table className="table table-bordered table-striped">
              <thead className="bg-success text-white">
                <tr>
                  <td>#</td>
                  <td>Ad-Soyad</td>
                  <td>Telefon</td>
                  <td>Mail</td>
                  <td>Şifre</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="table-tr">
                    <td>{item.id}</td>
                    <td>{item.nameSurname}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td id="crud">
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        <FaEdit />
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        <FaTrash />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EmployeesListing;
