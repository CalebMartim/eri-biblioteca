import styles from "../styles/Home.module.css";

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
  return (
    <>
      <section className={styles.main}>
        <h1 className={styles.title}>Bem vinda, Erica! 🌸 </h1>
        <h3>O que quer ler hoje?</h3>
        {livros.map((livro) => (
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
        ))}
      </section>
    </>
  );
}
