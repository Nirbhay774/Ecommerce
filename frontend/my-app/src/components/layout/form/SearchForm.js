import {React , useEffect }from 'react'
import axios from "axios";


import { SearchProvider } from '../../../contex/searchContex';
import { useSearch } from '../../../contex/searchContex';
import { useNavigate  } from 'react-router-dom';


const SearchForm = () => {


    const [values, setValues] = useSearch();
    
    console.log("values" , values)
    
  
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const { data } = await axios.get(
    //         `http://localhost:3500/api/v1/product/search/${values.keyword}`
    //       );
    //       setValues({ ...values, results: data });
    //       navigate("/search");
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
//use effect

    // useEffect(() => {
   
    // const getData = setTimeout(() => {
    //     axios
    //     .get(`http://localhost:3500/api/v1/product/search/${values.keyword}`)
        
    //     .then((response) => {
    //       setValues({ ...values, results: response.data });
    //       navigate("/search");
    //       console.log("consfnsjnf" ,response.data);
    //     });
    //   },2000)
    //   return () => clearTimeout(getData)
    
    // }, [values])


    useEffect(() => {
      let getData = null;
    
      if (values.keyword) {
        getData = setTimeout(() => {
          axios
            .get(`http://localhost:3500/api/v1/product/search/${values.keyword}`)
            .then((response) => {
              setValues({ ...values, results: response.data });
              navigate("/search");
              console.log("consfnsjnf", response.data);
            });
        }, 1000);

       
      }
  //     else{
  //  navigate('/')
  //     }
    
 else if (!values.keyword) {



  // navigate("/");
}
      return () => {
        if (getData) {
          clearTimeout(getData);
        }
      };
    }, [values.keyword]);
    
    


      
  return (
 
      
      <div>
      <form
        className="d-flex search-form"
        role="search"
    
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}

      
        
        />
 
      </form>
    </div>
 
  )
}

export default SearchForm
