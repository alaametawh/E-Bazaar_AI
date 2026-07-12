import { useNavigate } from 'react-router';
import { ShoppingCart } from 'lucide-react'
import Divider from './Divider'

interface item {
  id: number;
  name: string;
  year: number;
  description: string;
  price: number;
  imageurl: string;
  sec_id: string;
  sales: number;
}

const ItemCard = ({ item }: { item: item }) => {
  const navigate = useNavigate();
  
  return (
    <div 
    onClick={() => navigate(`/product/${item.id}`)}
    className="flex flex-col w-50 md:62.5 lg:w-75 bg-accent/10 rounded-lg p-2 lg:p-4 shadow-md hover:shadow-lg transition-shadow duration-300 shrink-0 group h-[stretch]">
      {/* image */}
      <div className="max-w-full mb-4 overflow-hidden rounded-lg relative">
        <img src={item.imageurl} alt={item.name} className="w-full object-cover object-center origin-center rounded-lg group-hover:scale-105 transition-transform duration-300" />
        <p className="text-text text-sm font-light absolute top-1 left-1 min-w-max w-1/3 text-center bg-bg border-2 border-accent p-1 rounded-lg">
          {item.year}
        </p>
      </div>
      {/* Tag */}
      <p className="text-accent/70 text-xs font-bold">{item.sec_id}</p>
      {/* name */}
      <h3 className="md:text-lg font-semibold text-text mb-4">{item.name}</h3>
      {/* description */}
      <p className="text-xs md:text-sm font-description text-text/70 mb-4">{item.description}</p>
      {/* price and cart button */}
      <div className="mt-auto">
        <Divider />
        <div className="flex items-center justify-between px-2">
          <p className="text-accent font-bold mt-auto">${item.price.toFixed(2)}</p>
          < ShoppingCart className="cursor-pointer text-accent" size={20} />
        </div>

      </div>
    </div>
  )
}

export default ItemCard