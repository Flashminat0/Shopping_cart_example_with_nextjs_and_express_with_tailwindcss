import Products from "../models/products";

export const CreateProduct = async (req, res) => {

    console.log(req.body);

    const product = new Products({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
    });

    await Products.create(product).then(() => {
        res.status(200).json({
            message: "Product created successfully",
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error creating product",
            error: err,
        });
    });
}



