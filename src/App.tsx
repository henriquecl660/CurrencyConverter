import './App.css'
import axios from 'axios';
import React, { useState, useEffect,ChangeEvent  } from 'react';


 const App = () => {


  const [isSelected, setSelected] = useState("1");
  const [inputValue, setInputValue] = useState({});
 
  
  interface ICurrency {
    code: string;
    rate : string;
    description: string;
    rate_float: number;
  }

  interface IPost {
    time: string[];
    disclaimer: string;
    bpi: Array<ICurrency>;
  }
  interface IPost2 {
    time: string[];
    disclaimer: string;
    bpi: Array<ICurrency>;
  }
  

   
  const [isSubmitted, setIsSubmitted] = useState(false)
  

  const defaultPosts:IPost[] = [];
  const defaultPosts2:IPost2[] = [];

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [posts2, setPosts2]: [IPost[], (posts2: IPost2[]) => void] = React.useState(defaultPosts2);
  


  const [ret_curr_symbol, set_ret_curr_symbol]: [string, (error: string) => void] = React.useState("");
  const [ret_curr_code, set_ret_curr_code]: [string, (error: string) => void] = React.useState("");


  const[ret_data_value, set_ret_data_value] : [string, (error: string) => void] = React.useState("");
  const[ret_result_value, set_ret_result_value] : [string, (error: string) => void] = React.useState("");

  const buttonHandler = () => {

      setIsSubmitted(current => !current)


  };

  function inputOnChangeFunctions(e: ChangeEvent<HTMLInputElement>){
    NumericCommaOnly(e),handleInputChange(e);
  };

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => { 
      setInputValue(e.target.value);




   };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => { 

    setSelected(e.target.value);

  };
   

  const NumericCommaOnly= (e: any) => { //angka only
    const reg =  /^[0-9,]+$/
    let preval=e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) return true
    else e.target.value = preval.substring(0,(preval.length-1))


  }


  


  const fetchData = async()=>{

    var strValueSelected = "BRL";
    var currencyCode = "USD"
    var currencySymbol = "$"

    if(isSelected == "1"){
      strValueSelected = "BRL"
      currencyCode = "USD"
      currencySymbol = "$"
    }
    else if(isSelected == "2"){
      strValueSelected = "EUR"
      currencyCode = "EUR"
      currencySymbol = "€"
    }
    else if(isSelected == "3"){
       strValueSelected = "GBP"
       currencyCode = "GBP"
       currencySymbol = "£"
    }
    else{
      strValueSelected = "BRL"
      currencyCode = "USD"
      currencySymbol = "$"
    }
   
   

   try{
    await axios
   .get<IPost[]>(`https://api.coindesk.com/v1/bpi/currentprice/BRL`, {
     headers: {
       "Content-Type": "application/json"
     },
     
   })
   .then(async response => {
     setPosts(response.data);


     
     //PEGANDO VALOR DO BRL
     var postsStringified = JSON.stringify(posts);
     var postsParsed = JSON.parse(postsStringified)
     var parsedTime = postsParsed.time
     var floatBRLRate =  postsParsed.bpi[`BRL`][`rate_float`];


    if(isSelected == "1" ){


     var floatUSDRate = postsParsed.bpi[`USD`][`rate_float`];

   
     var calcResultValue = (((floatUSDRate/floatBRLRate) * parseFloat(String(inputValue).replace(',','.')))).toFixed(2);
    
     set_ret_data_value(String(new Date(parsedTime[`updated`])))
     set_ret_result_value(String(calcResultValue))
    }

    if( isSelected == "2"){

      try{

      await axios
      .get<IPost2[]>(`https://api.coindesk.com/v1/bpi/currentprice/${strValueSelected}`, {
        headers: {
          "Content-Type": "application/json"
        },
        
      })
      .then(async response => {
        setPosts2(response.data);
      })   
 
    }catch(error){ 
      console.log(error)
      alert(error)
    }
  
          
  
      var postsStringified2 = JSON.stringify(posts2);

      var postsParsed2 = JSON.parse(postsStringified2)

      var parsedTime2 = postsParsed2.time

   
      var floatEURRate = postsParsed2.bpi[`EUR`][`rate_float`];

      var calcResultValue = (((floatEURRate/parseFloat(floatBRLRate)) * parseFloat(String(inputValue).replace(',','.')))).toFixed(2);
      set_ret_data_value(String(new Date(parsedTime2[`updated`])))
      set_ret_result_value(String(calcResultValue))
      
     }


     
    if( isSelected == "3"){


      try{

        await axios
        .get<IPost2[]>(`https://api.coindesk.com/v1/bpi/currentprice/${strValueSelected}`, {
          headers: {
            "Content-Type": "application/json"
          },
          
        })
        .then(response => {
          setPosts2(response.data);
        })   
   
      }catch(error){ 
        console.log(error)
        alert(error)
      }

    



      var postsStringified2 = JSON.stringify(posts2);
 
      var postsParsed2 = JSON.parse(postsStringified2)

      var parsedTime2 = postsParsed2.time
   
      var floatGBPRate = postsParsed2.bpi[`GBP`][`rate_float`];

      var calcResultValue = (((floatGBPRate/parseFloat(floatBRLRate)) * parseFloat(String(inputValue).replace(',','.')))).toFixed(2);



      set_ret_data_value(String(new Date(parsedTime[`updated`])))
      set_ret_result_value(String(calcResultValue))
      
     }
     set_ret_curr_code(currencyCode)
     set_ret_curr_symbol(currencySymbol)


   }
  )


  
  } catch(error){ 
    console.log(error)
    alert(error)
  }
}



   useEffect(() => {
      if(isSubmitted){

           fetchData();
         }
        
    
    
    },  [isSubmitted]);
    

  return (
    <>
     <div>
         <h1> Desafio XP </h1>     
      </div>




      <div className={"div_default"} >

        <table>
          <tr>
            Financeiro
          </tr>
          <tr>
            <label> R$ </label>
            <input  id='input_btl_val' typeof='text' placeholder='0,00' onChange={inputOnChangeFunctions}></input>
          </tr>
          <tr>
            <select name="currencies" id="ddl_currs" onChange={handleSelectChange} >
              <option value="1">USD/U.S Dólar</option>
              <option value="2">EUR/Euro</option>
              <option value="3">GBP/Libra Esterlina</option>
            </select>
          </tr>
          <tr>
            <button type='button' id='btn_converter' onClick={buttonHandler}>
                 Converter
            </button>
          </tr>
          <tr>
          <label htmlFor="" id='lbl_curr_ret_price'> {`${ret_curr_code}`} {`${ret_curr_symbol}`} {`${ret_result_value}`}</label>
          </tr>
          <tr>
            <label htmlFor="" id='lbl_datetime'>Data hora da última conversão:  {`${ret_data_value}`}</label>
          </tr>
          
        </table>

      </div> 





    </>

    
  )
}

export default App
