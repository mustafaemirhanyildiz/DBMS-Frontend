import { useState ,useContext} from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import {motion} from 'framer-motion'
import { AiFillCloseCircle } from "react-icons/ai";
import "./ProductCreate.css"
import { myContext } from "../ContextProvider";

const ProductCreate = () => {
    const {API}=useContext(myContext)

    const { empid } = useParams();

    const[id,idChange]=useState("");
    const[name,nameChange]=useState("");
    const[status,statusChange]=useState("");
    const[macAddress,macAddressChange]=useState("");
    const[ipAddress,ipAddressChange]=useState("");


    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={name,macAddress,ipAddress,empid,status};
      

      fetch(API+"Device/add",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            name:name,
            macAddress:macAddress,
            ipAddress:ipAddress,
            stationId:empid,
            status:status
        })
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/employee/detail/'+empid);
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
                                <h2>Cihaz Create</h2>
                                <Link to="/" ><AiFillCloseCircle className="back" /></Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input value={id} disabled="disabled" className="form-control" placeholder="#"></input>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Ad"  required value={name} onMouseDown={e=>valchange(true)} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                        {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        <br></br>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Mac Address" value={macAddress} onChange={e=>macAddressChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Ip Adress" value={ipAddress} onChange={e=>ipAddressChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Status" value={status} onChange={e=>statusChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>


                             
                                    <div className="col-lg-12">
                                        <div className="form-group" id="save-button">
                                           <button className="btn btn-success" type="submit" id="button-save">Kaydet</button>
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

export default ProductCreate;