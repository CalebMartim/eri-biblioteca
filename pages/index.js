import React from "react";

import Head from "next/head";

import styles from "../styles/Home.module.css";
// import { loadGetInitialProps } from "next/dist/shared/lib/utils";
// Pequeno teste

export const getStaticProps = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/CalebMartim/eri-biblioteca/main/public/livros.json"
  );
  const data = await res.json();

  return {
    props: { livros: data },
  };
};


export default function Home({ livros }) {
  let espectroLivros = [];

  livros.map((livro) => {
    let lista = [livro.id, livro.espectograma];
    espectroLivros.push(lista);
  })
  
  const [mostrar, setMostrar] = React.useState(livros);

  function mudarProcura(e){
    const palavra = e.target.value.toLowerCase();
    let espectograma = [];

    for(let i = 0; i < palavra.length; i++){
      if(palavra[i] != " "){
        if(!(espectograma.includes(palavra[i]))){
          espectograma.push(palavra[i]);
        }
      }
    }
    
    if(palavra){
      let novosLivros = livros;
      for(let i = 0; i < espectograma.length; i++){
        for(let k = 0; k < espectroLivros.length; k++){
          if(!(espectroLivros[k][1].includes(espectograma[i]))){
            novosLivros = novosLivros.filter(livro => livro.id != espectroLivros[k][0]);
          }        
        }
      }
      setMostrar(novosLivros);
    }else{
      setMostrar(livros)
    }
  }
  
  
  return (
    <>
      <Head>
        <title>🌻 Bem vinda, Erica!</title>
      </Head>
      <section className={styles.main}>
        <h1 className={styles.title}>Bem vinda, Erica! 🌸 </h1>
        <h3>Tenha uma boa leitura!</h3>
        <input className={styles.input} type="text" placeholder="🔎 O que quer ler hoje?" onChange={(e) => mudarProcura(e)}></input>        
        {
          mostrar.map((livro) => (
            <div className={styles.card} key={livro.id}>
              <div className={styles.cardInterior}>
                <div>
                  <p className={styles.name}>{livro.nome}</p>
                  <p className={styles.autor}>{livro.autor}</p>
                  <p className={styles.ano}>{livro.ano}</p>
                </div>
                <div className={styles.botaoDiv}>
                  <a href={livro.link}>Ler</a>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </>
  );
}
