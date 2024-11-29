import { Character } from "@/Models/character";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CardCharacterInformation from "@/components/characterCardInformation/CharacterCardInformation";
import useFavoritesStore from "@/store/character/CharacterStore";

interface Props {
  params: { id: string };
}

export default async function Home({ params }: Props) {

  const character = await getCharacter(params.id);


  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-[90vh]  p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <CardCharacterInformation character={character} />
      </div>
    </div>
  );
}
export async function generateMetadata({ params }:Props): Promise<Metadata> {

  try {
    const { id, name } = await getCharacter(params.id);
  
    return {
      title: `#${ id } - ${ name }`,
      description: `Página del personaje ${ name }`
    }
    
  } catch (error) {
    return {
      title: 'Página del personaje',
      description: 'Culpa cupidatat ipsum magna reprehenderit ex tempor sint ad minim reprehenderit consequat sit.'
    }
  }
}

const getCharacter = async(id: string): Promise<Character> => {


  try {
    const character = await fetch(`https://rickandmortyapi.com/api/character/${id}`,{
     next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
  

    return character;
    
  } catch (error) {
    notFound();
  }

}