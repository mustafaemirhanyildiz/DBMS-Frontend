import { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import { AiFillCloseCircle } from "react-icons/ai";
import "./EmployeesCreate.css"
import { myContext } from "../ContextProvider";


const EmployeesCreate = () => {

    const { API } = useContext(myContext);


    const[id,idChange]=useState("");
    const[nameSurname,nameChange]=useState("");
    const[phone,phoneChange]=useState("");
    const[mail,mailChange]=useState("");
    const[password,passwordChange]=useState("");
    const[validation,valchange]=useState(false);
    


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,nameSurname,phone,mail,password};
    
      fetch(API+"Employee/add",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            nameSurname:nameSurname,
            email:mail,
            password:password,
            phone:phone,
            status:"offline"
        })
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/Employees');
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
                                <h2>Employee Create</h2>
                                <Link to="/Employees" ><AiFillCloseCircle className="back" /></Link>
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
                                            <input placeholder="Ad Soyad"  required value={nameSurname} onMouseDown={e=>valchange(true)} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                        {nameSurname.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        <br></br>

                                        </div>
                                    </div>
                               

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Phone" value={phone} onChange={e=>phoneChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="Mail" value={mail} onChange={e=>mailChange(e.target.value)} className="form-control"></input>
                                            <br></br>

                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input placeholder="password" value={password} onChange={e=>passwordChange(e.target.value)} className="form-control"></input>
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

export default EmployeesCreate;