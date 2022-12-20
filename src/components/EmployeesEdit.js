import { useEffect, useState,useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion'
import { AiFillCloseCircle } from "react-icons/ai";
import "./EmployeesEdit.css"
import { myContext } from "../ContextProvider";

const EmployeesEdit = () => {
    const { empid } = useParams();
    const { API } = useContext(myContext);

    useEffect(() => {
        fetch(API+"Employee/getbyid/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idChange(resp.id);
            nameChange(resp.nameSurname);
            phoneChange(resp.phone);
            emailChange(resp.email)
            passwordChange(resp.password)
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idChange]=useState("");
    const[nameSurname,nameChange]=useState("");
    const[phone,phoneChange]=useState("");
    const[email,emailChange]=useState("");
    const[password,passwordChange]=useState("");
    const[validation,valChange]=useState(false);

    const status="offline"
    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,nameSurname,email,password,phone,status};
      

      fetch(API+"Employee/update",{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
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
                            <h2>Çalışan Edit</h2>
                            <Link to="/Employees" ><AiFillCloseCircle className="back" /></Link>

                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>İd</label>
                                        <input value={id} disabled="disabled" className="form-control" placeholder="#"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Ad</label>
                                        <input required value={nameSurname} onMouseDown={e=>valChange(true)} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                    {nameSurname.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Telefon</label>
                                        <input value={phone} onChange={e=>phoneChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>email</label>
                                        <input value={email} onChange={e=>emailChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>password</label>
                                        <input value={password} onChange={e=>passwordChange(e.target.value)} className="form-control"></input>
                                        <br></br>
                                    </div>
                                </div>
                
                                <div className="col-lg-12">
                                    <div className="form-group" id="save-button">
                                       <button className="btn btn-success" type="submit" id="button-save">Edit</button>
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
 
export default EmployeesEdit;