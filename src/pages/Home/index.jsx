import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { ProductCard } from "../../components/ProductCard";
import { useCart } from "../../context/cart-context";

export const Home = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        (async() => {
            const data = await getAllProducts();
            setProducts(data);
        })() // IIFE
    }, []);

    return (
        <>
            <Navbar />
            <main className="flex flex-wrap gap-8 justify-center pt-32">
                {
                    products?.length > 0 && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </main>
        </>
    )
}