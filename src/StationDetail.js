import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StationDetail = () => {
  const { empid } = useParams();

  const [data, dataChange] = useState([]);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");


  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const newdata = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    fetch("http://localhost:8000/employee/"+empid)
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
                  <tr key={item.id} className="table-tr" >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.il}</td>
                    <td>{item.ilce}</td>
                    <td>{item.address}</td>
   
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
