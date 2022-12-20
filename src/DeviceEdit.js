import { useEffect, useState ,useContext} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion'
import { AiFillCloseCircle } from "react-icons/ai";
import "./DeviceEdit.css"
import { myContext } from "./ContextProvider";


const DeviceEdit = () => {
    const { empid } = useParams();
    const {API}=useContext(myContext)


    useEffect(() => {
        fetch(API+"Device/getbyid/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            statusChange(resp.status)
            macAddressChange(resp.macAddress)
            ipAddressChange(resp.ipAddress)
            stationIdValChange(resp.stationId)
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    const[stationIdVal,stationIdValChange]=useState("")
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[status,statusChange]=useState("");
    const[macAddress,macAddressChange]=useState("");
    const[ipAddress,ipAddressChange]=useState("");



    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,name};
      console.log(empid,stationIdVal,macAddress,ipAddress,status)


      

      fetch(API+"Device/update",{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            id:empid,
            name:name,
            macAddress:macAddress,
            ipAddress:ipAddress,
            stationId:stationIdVal,
            status:status

        })
      }).then((res)=>{
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <motion.div 
        initial={{width:0}}
        animate={{width:"100%"}}
        exit={{x:window.innerWidth,transition :{duration:0.2}}}
        >

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Cihaz Edit</h2>
                            <Link to="/" ><AiFillCloseCircle className="back" /></Link>

                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Cihaz İd</label>
                                        <input value={id} disabled="disabled" className="form-control" placeholder="#"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Cihaz Adı</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>Cihaz MacAdress</label>

                                            <input placeholder="Mac Address" value={macAddress} onChange={e=>macAddressChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Cihaz IpAddress</label>

                                            <input placeholder="Ip Adress" value={ipAddress} onChange={e=>ipAddressChange(e.target.value)} className="form-control"></input>

                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label >Cihaz Durumu</label>
                                            <input placeholder="Status" value={status} onChange={e=>statusChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>

                                <div className="col-lg-12">
                                    <div className="form-group" id="save-button">
                                       <button className="btn btn-success" type="submit" id="button-save">Chiaz Edit</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </motion.div>
     );
}
 
export default DeviceEdit;