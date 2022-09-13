import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/livros.json");
  const data = await res.json();

  return {
    props: { livros: data },
  };
};

export default function Home({ livros }) {
  return (
    <>
      <section className={styles.container}>
        <h1>Bem vinda, Erica! 🌸 </h1>
        <h3>O que quer ler hoje?</h3>
        {livros.map((livro) => (
          <div key={livro.id}>
            <p>{livro.nome}</p>
            <a href={livro.link}>Ler</a>
          </div>
        ))}
      </section>
    </>
  );
}
