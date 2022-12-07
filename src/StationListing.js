import { useEffect, useState } from "react";
import { Link, useNavigate ,NavLink} from "react-router-dom";
import "./StationListing.css";
import { FaEdit, FaTrash, FaInfo } from "react-icons/fa";
import {motion} from 'framer-motion'


function StationListing() {
  const [data, dataChange] = useState([]);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/employee/" + id, {
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
  
  function rowClick(){
    return <Link to="Employees" > Employees</Link>

  }
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const newdata = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        dataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <motion.div 
    initial={{width:0}}
    animate={{width:"100%"}}
    exit={{x:window.innerWidth,transition :{duration:0.2}}}
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

              <Link to="employee/create" className="btn btn-success" id="station">
                Yeni İstasyon Ekle
              </Link>
            </div>
            <table className="table table-bordered table-striped">
              <thead className="bg-success text-white">
                <tr>
                  <td>#</td>
                  <td>İstasyon Adı</td>
                  <td>İl</td>
                  <td>İlçe</td>
                  <td>Adres</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {newdata.map((item) => (
                  <tr key={item.id} className="table-tr" onClick={rowClick}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.il}</td>
                    <td>{item.ilce}</td>
                    <td>{item.address}</td>
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
                      <a
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        <FaInfo />
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

export default StationListing;
