import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaInfo } from "react-icons/fa";
import { myContext } from "./ContextProvider";

const StationDetail = () => {
  const { API } = useContext(myContext);

  const { empid } = useParams();

  const [data, dataChange] = useState([]);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const LoadEdit = (id) => {
    navigate("/device/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(API + "Device/delete/" + id, {
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
  const newdata = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    fetch(API +"Device/getbystation/" +empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        dataChange(resp);
        console.log(resp);
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
              <Link to="services" className="btn btn-success" id="station">
                Servisler
              </Link>
              <Link
                to="product/create"
                className="btn btn-success"
                id="station"
              >
                Yeni Cihaz Ekle
              </Link>
            </div>

            <table className="table table-bordered table-striped">
              <thead className="bg-success text-white">
                <tr>
                  <td>#</td>
                  <td>Cihaz Adı</td>
                  <td>Mac Address</td>
                  <td>Ip Address</td>
                  <td>Cihaz Durumu</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {newdata.map((item) => (
                  <tr key={item.id} className="table-tr">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.macAddress}</td>
                    <td>{item.ipAddress}</td>
                    <td>{item.status}</td>
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
};

export default StationDetail;
