import React, { useState, useEffect } from 'react';
function App() {
  const [informacao, setInformacao] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  



  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(informacao => {
      setInformacao(informacao)
      setIsLoading(false);
      console.log(`informacao: ${JSON.stringify(informacao)}`)
    })
    .catch(error => {
      alert(`Error fetching data: ${error}`)
      console.error(`Error fetching data: ${error}`);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } return (
    <div>
      <h1>Data List</h1>
      <ul>
       {/*JSON.stringify(informacao)*/}
       {informacao.map(item => (
        <li key={item.id [item.id] }>{item.body  }</li>
      ))}
      </ul>
    </div>
  );
}

export default App;

/*

Resolvi na seguinte ordem:
2 - Digitei o comando shift + alt + F no VSCODE para identar o código
1 - Conectei o app em uma  API real fora da minha rede
    Setei os parametros de mepeamento de acordo com a api que chamei
3- Utilizei um método de impressao mais recente 

*/