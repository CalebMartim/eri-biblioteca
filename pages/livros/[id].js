import { useRouter } from "next/router";

import Head from "next/head";

export default function Livro({ livro }) {
  const router = useRouter();
  const { id } = router.query;

  <Head>
    <title>
      {livro.nome} {livro.id}
    </title>
  </Head>;

  return (
    <>
      <h1>Leia {livro.id}</h1>
      <p>ano: {livro.ano}</p>
    </>
  );
}

// SERVER SIDE RENDERING

// export async function getServerSideProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();

//   return {
//     props: { livro: data },
//   };
// }

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { livro: data },
  };
}

export async function getStaticPaths() {
  const req = await fetch("http://localhost:3000/livros.json");
  const data = await req.json();

  const paths = data.map((livro) => {
    return { params: { id: livro } };
  });

  return {
    paths,
    fallback: false,
  };
}
