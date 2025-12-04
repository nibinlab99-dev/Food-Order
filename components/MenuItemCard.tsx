type MenuItemProps = {
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function MenuItemCard({name, description, price}: MenuItemProps) {
    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-lg font-semibold">${price.toFixed(2)}</p>
        </div>
    )
}