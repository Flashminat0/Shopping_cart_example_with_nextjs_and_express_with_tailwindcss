import ProductStrip from "../Components/ProductStrip";
import Header from "../Components/Header";

export default function Home() {
    return (
        <>
            <Header/>
            <ProductStrip title={"Header 1"}/>
            <ProductStrip title={"Header 2"}/>
        </>
    )
}
