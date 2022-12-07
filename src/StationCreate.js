import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import { AiFillCloseCircle } from "react-icons/ai";
import "./StationCreate.css"

const StationCreate = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[il,ilChange]=useState("");
    const[ilce,ilceChange]=useState("");
    const[adres,adresChange]=useState("");
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={name,il,ilce,adres};
      

      fetch("http://localhost:8000/employee",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
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
                                <h2>İstasyon Create</h2>
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
                                            <input placeholder="Name"  required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        <br></br>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="İl" value={il} onChange={e=>ilChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="İlçe" value={ilce} onChange={e=>ilceChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Adres" value={adres} onChange={e=>adresChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>

                             
                                    <div className="col-lg-12">
                                        <div className="form-group" id="save-button">
                                           <button className="btn btn-success" type="submit" id="button-save">İstasyon Kaydet</button>
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

export default StationCreate;