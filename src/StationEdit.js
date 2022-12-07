import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion'
import { AiFillCloseCircle } from "react-icons/ai";
import "./StationEdit.css"


const StationEdit = () => {
    const { empid } = useParams();

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            ilchange(resp.il);
            ilcechange(resp.ilce);
            addressChange(resp.address)
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[il,ilchange]=useState("");
    const[ilce,ilcechange]=useState("");
    const[address,addressChange]=useState("");

    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,name,il,ilce,address};
      

      fetch("http://localhost:8000/employee/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
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
                            <h2>İstasyon Edit</h2>
                            <Link to="/" ><AiFillCloseCircle className="back" /></Link>

                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>İstasyon İd</label>
                                        <input value={id} disabled="disabled" className="form-control" placeholder="#"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>İstasyon Adı</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>İl</label>
                                        <input value={il} onChange={e=>ilchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>İlçe</label>
                                        <input value={ilce} onChange={e=>ilcechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input value={address} onChange={e=>addressChange(e.target.value)} className="form-control"></input>
                                        <br></br>
                                    </div>
                                </div>

                
                                <div className="col-lg-12">
                                    <div className="form-group" id="save-button">
                                       <button className="btn btn-success" type="submit" id="button-save">İstasyon Edit</button>
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
 
export default StationEdit;