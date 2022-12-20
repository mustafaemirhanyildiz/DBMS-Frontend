import { useEffect, useState,useContext} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaInfo } from "react-icons/fa";
import { myContext } from "../ContextProvider";

function Service() {
    const {API}=useContext(myContext)

    const { empid } = useParams();

    const [data, dataChange] = useState([]);
  
    const navigate = useNavigate();
  
    const [searchInput, setSearchInput] = useState("");
  
  
    const handleChange = (e) => {
      setSearchInput(e.target.value);
    };
  

  
    const Removefunction = (id) => {
      if (window.confirm("Do you want to remove?")) {
        fetch(API+"Service/delete/"+id, {
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
    
  
  
    useEffect(() => {
      fetch(API+"Service/getall")
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          dataChange(resp);
          console.log(resp)
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
 


          
              </div>

              <table className="table table-bordered table-striped">
              <thead className="bg-success text-white">
                <tr>
                  <td>#</td>
                  <td>Servis Başlığı</td>
                  <td>Servis Açıklaması</td>
                  <td>Cihaz Durumu</td>
                  <td>Zaman</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
              {data.map((item) => (
                  <tr key={item.id} className="table-tr" >
                    <td>{item.id}</td>
                    <td>{item.serviceTitle}</td>
                    <td>{item.serviceDesc}</td>
                    <td>{item.deviceStatus}</td>
                    <td>{item.time}</td>
                    <td id="crud">
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
  )
}

export default Service
