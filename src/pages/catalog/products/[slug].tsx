import { Router, useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { useState } from "react";


const AddToCartModal = dynamic(
  ()=> import('@/components/AddToCartModal'),
  {loading:  
    () => <p>Carregando...</p>,
    // ssr: false faz com que o componente nunca seja renderizado pelo servidor 
    // ele aguardar para renderizar no lado do cliente, usamos quando precisa alguma
    //variavel global do Brwoser por exemplo
    
  }
)

export default function Product(){
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleToCart(){
    setIsAddToCartModalVisible(true);
  }
  return(
    <div>
      <h1>{router.query.slug}</h1>

      <button   onClick={handleToCart}>
        Add to cart
      </button>

      {isAddToCartModalVisible &&
        <AddToCartModal />
      }
    </div>
  )
}