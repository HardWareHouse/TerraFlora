import ProduitMongo from "../modelsMongo/Produit.mongo.js";

async function getProducts(req, res) {
    try {
        let products = await ProduitMongo.find({
            $text: {
                $search: req.query.search,
                $diacriticSensitive: false,
                $caseSensitive: false,
            },
        }).lean();
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal server error');
    }
}

export { getProducts };