type MenuItemProps = {
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function MenuItemCard({name, description, price, image}: MenuItemProps) {
    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-lg font-semibold">${price.toFixed(2)}</p>
        </div>
    )
}