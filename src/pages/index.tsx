import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({recommendedProducts}: HomeProps) {

  async function handleSum(){
    const math = await import('@/lib/math');
    alert(math.default.sum(2,5));
  }

  return (
    <div>
      <section>
        <SEO title="Seu e-commerce blabla" 
          shouldExcludeTitleSuffix
          image="image.png"
        />

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return(
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
      <button
        onClick={handleSum}
      >Somar</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();
  return {
    props:{
      recommendedProducts
    }
  }
}