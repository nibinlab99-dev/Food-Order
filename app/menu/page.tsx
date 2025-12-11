import MenuItemCard from "@/components/MenuItemCard"

export default function MenuPage() {
    const menuItems = [
        {
            id: "1",
            name: 'Margherita Pizza',
            description: 'Classic pizza with fresh mozzarella',
            price: 12.99,
            image: 'https://picsum.photos/200'
        },
        {
            id: "2",
            name: 'Burger',
            description: 'Classic burger with cheese',
            price: 8.99,
            image: 'https://picsum.photos/200'
        },
        {
            id: "3",
            name: 'Pepsi',
            description: 'Refreshing Drink',
            price: 4.99,
            image: 'https://picsum.photos/200'
        },
        {
            id: "4",
            name: 'Coco Cola',
            description: 'Refreshing Drink',
            price: 4.99,
            image: 'https://picsum.photos/200'
        },
    ]
    return (
        <div className="max-w-7xl m-auto py-6">
            <h1 className="text-4xl font-bold text-center mb-12">Our Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map((menu) => (
                    <MenuItemCard
                        key={menu.id}
                        {...menu}
                    />
                ))}
            </div>
        </div>
    )
}