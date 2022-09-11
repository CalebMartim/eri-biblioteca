import { useRouter } from "next/router";

export default function Livro({ livro }) {
  const router = useRouter();

  const { id } = router.query;

  return <h1>Leia {livro.nome}</h1>;
}

export async function getStaticProps({ params }) {
  const request = await fetch(`http://localhost:3000/${params.livro}.json`);
  const data = await request.json();

  return {
    props: { livro: data },
  };
}
