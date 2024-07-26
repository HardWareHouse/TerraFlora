import {
    getCart,
    createCart,
    updateCart,
    deleteCart,
    deleteProductFromCart,
    reserveCart
} from '../../controllers/cartController';
import Panier from '../../modelsSQL/Panier';
import Produit from '../../modelsSQL/Produit';
import Image from '../../modelsSQL/Image';
import TempReservation from '../../modelsSQL/TempReservation';
import { isValidUUID } from "../../helpers/validatorHelper";

jest.mock('../../modelsSQL/Panier');
jest.mock('../../modelsSQL/Produit');
jest.mock('../../modelsSQL/Image');
jest.mock('../../modelsSQL/TempReservation');
jest.mock('../../helpers/validatorHelper');

describe('Cart Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            user: { id: 'user-id' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('getCart', () => {
        it('should return 400 if cart ID is invalid', async () => {
            req.params.id = 'invalid-id';
            isValidUUID.mockReturnValue(false);

            await getCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing cart ID" });
        });

        it('should return 404 if cart is not found', async () => {
            req.params.id = 'valid-id';
            isValidUUID.mockReturnValue(true);
            Panier.findOne.mockResolvedValue(null);

            await getCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Cart not found" });
        });

        it('should return 403 if user is not authorized', async () => {
            req.params.id = 'valid-id';
            isValidUUID.mockReturnValue(true);
            Panier.findOne.mockResolvedValue({ userId: 'other-user-id' });

            await getCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        });

        it('should return cart if found and authorized', async () => {
            req.params.id = 'user-id';
            isValidUUID.mockReturnValue(true);
            const mockCart = { userId: 'user-id', products: [] };
            Panier.findOne.mockResolvedValue(mockCart);

            await getCart(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCart);
        });
    });

    describe('createCart', () => {
        it('should return 400 if user ID or products are missing', async () => {
            await createCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "User ID and products are required" });
        });

        it('should return 400 if user ID is invalid', async () => {
            req.body = { userId: 'invalid-id', produits: [] };
            isValidUUID.mockReturnValue(false);

            await createCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid UUID format" });
        });

        it('should return 403 if user is not authorized', async () => {
            req.body = { userId: 'other-user-id', produits: [] };
            isValidUUID.mockReturnValue(true);

            await createCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        });

        it('should create a new cart if authorized', async () => {
            req.body = { userId: 'user-id', produits: [{ id: 'product-id', quantity: 1 }] };
            isValidUUID.mockReturnValue(true);
            Panier.findOne.mockResolvedValue(null);
            Panier.create.mockResolvedValue({ id: 'new-cart-id', addProduit: jest.fn() });
            Produit.findByPk.mockResolvedValue({ id: 'product-id' });
            Panier.findByPk.mockResolvedValue({ id: 'new-cart-id', Produits: [{ id: 'product-id' }] });

            await createCart(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'new-cart-id' }));
        });
    });

    describe('updateCart', () => {
        it('should return 400 if user ID is invalid', async () => {
            req.body = { userId: 'invalid-id', produits: [] };
            isValidUUID.mockReturnValue(false);

            await updateCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing user ID" });
        });

        it('should return 400 if products are missing', async () => {
            req.body = { userId: 'user-id' };
            isValidUUID.mockReturnValue(true);

            await updateCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Products are required" });
        });

        it('should return 403 if user is not authorized', async () => {
            req.body = { userId: 'other-user-id', produits: [] };
            isValidUUID.mockReturnValue(true);

            await updateCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        });

        // it('should create a new cart if it does not exist', async () => {
        //     req.body = { userId: 'user-id', produits: [{ id: 'product-id', quantity: 1 }] };
        //     isValidUUID.mockReturnValue(true);
        //     Panier.findOne.mockResolvedValue(null);
        //     Panier.create.mockResolvedValue({ id: 'new-cart-id', addProduit: jest.fn(), getProduits: jest.fn().mockResolvedValue([]) });
        //     Produit.findByPk.mockResolvedValue({ id: 'product-id' });
        //     Panier.findByPk.mockResolvedValue({ id: 'new-cart-id', Produits: [{ id: 'product-id' }] });

        //     await updateCart(req, res);

        //     expect(res.status).toHaveBeenCalledWith(200);
        //     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'new-cart-id' }));
        // });

        it('should update existing products in the cart', async () => {
            req.body = { userId: 'user-id', produits: [{ id: 'product-id', quantity: 2 }] };
            isValidUUID.mockReturnValue(true);
            const mockCart = {
                id: 'cart-id',
                userId: 'user-id',
                addProduit: jest.fn(),
                getProduits: jest.fn().mockResolvedValue([{ id: 'product-id', Panier_Produits: { quantity: 1 } }])
            };
            Panier.findOne.mockResolvedValue(mockCart);
            Produit.findByPk.mockResolvedValue({ id: 'product-id' });
            Panier.findByPk.mockResolvedValue({ ...mockCart, Produits: [{ id: 'product-id', Panier_Produits: { quantity: 2 } }] });

            await updateCart(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'cart-id' }));
            expect(mockCart.addProduit).toHaveBeenCalledWith(expect.anything(), { through: { quantity: 2 } });
        });
    });

    describe('deleteCart', () => {
        it('should return 400 if cart ID is invalid', async () => {
            req.params.id = 'invalid-id';
            isValidUUID.mockReturnValue(false);

            await deleteCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing cart ID" });
        });

        it('should return 404 if cart is not found', async () => {
            req.params.id = 'valid-id';
            isValidUUID.mockReturnValue(true);
            Panier.findByPk.mockResolvedValue(null);

            await deleteCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Cart not found" });
        });

        it('should return 403 if user is not authorized', async () => {
            req.params.id = 'valid-id';
            isValidUUID.mockReturnValue(true);
            Panier.findByPk.mockResolvedValue({ userId: 'other-user-id' });

            await deleteCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        });

        it('should delete the cart if authorized', async () => {
            req.params.id = 'valid-id';
            isValidUUID.mockReturnValue(true);
            const mockCart = { userId: 'user-id', destroy: jest.fn() };
            Panier.findByPk.mockResolvedValue(mockCart);

            await deleteCart(req, res);

            expect(mockCart.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({ message: "Panier supprimé avec succès" });
        });
    });

    describe('deleteProductFromCart', () => {
        it('should return 400 if user ID is invalid', async () => {
            req.params = { userId: 'invalid-id', productId: 'valid-id' };
            isValidUUID.mockReturnValueOnce(false).mockReturnValueOnce(true);

            await deleteProductFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing user ID" });
        });

        // it('should return 400 if product ID is invalid', async () => {
        //     req.params = { userId: 'user-id', productId: 'invalid-id' };
        //     isValidUUID.mockReturnValueOnce(true).mockReturnValueOnce(false);

        //     await deleteProductFromCart(req, res);

        //     expect(res.status).toHaveBeenCalledWith(400);
        //     expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing product ID" });
        // });

        it('should return 404 if cart is not found', async () => {
            req.params = { userId: 'user-id', productId: 'product-id' };
            isValidUUID.mockReturnValue(true);
            Panier.findOne.mockResolvedValue(null);

            await deleteProductFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Cart not found" });
        });

        it('should return 403 if user is not authorized', async () => {
            req.params = { userId: 'other-user-id', productId: 'product-id' };
            isValidUUID.mockReturnValue(true);
            Panier.findOne.mockResolvedValue({ userId: 'other-user-id' });

            await deleteProductFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        });

        it('should delete the product from the cart if authorized', async () => {
            req.params = { userId: 'user-id', productId: 'product-id' };
            isValidUUID.mockReturnValue(true);
            const mockCart = {
                userId: 'user-id',
                removeProduit: jest.fn(),
                Produits: [{ id: 'product-id' }]
            };
            Panier.findOne.mockResolvedValue(mockCart);
            Produit.findByPk.mockResolvedValue({ id: 'product-id' });

            await deleteProductFromCart(req, res);

            expect(mockCart.removeProduit).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('reserveCart', () => {
        it('should return 400 if user ID is invalid', async () => {
            req.body = { userId: 'invalid-id' };
            isValidUUID.mockReturnValue(false);

            await reserveCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing user ID" });
        });

        it('should return 403 if user is not authorized', async () => {
            req.body = { userId: 'other-user-id' };
            isValidUUID.mockReturnValue(true);

            await reserveCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
        });

        it('should return 404 if cart is not found', async () => {
            req.body = { userId: 'user-id' };
            isValidUUID.mockReturnValue(true);
            Panier.findOne.mockResolvedValue(null);

            await reserveCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Cart not found" });
        });

        it('should return 400 if not enough stock', async () => {
            req.body = { userId: 'user-id' };
            isValidUUID.mockReturnValue(true);
            const mockCart = {
                userId: 'user-id',
                Produits: [{ id: 'product-id', Panier_Produits: { quantity: 5 } }]
            };
            Panier.findOne.mockResolvedValue(mockCart);
            Produit.findByPk.mockResolvedValue({ id: 'product-id', stock: 3, nom: 'Test Product' });

            await reserveCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Not enough stock for Test Product" });
        });

        it('should reserve the cart successfully', async () => {
            req.body = { userId: 'user-id' };
            isValidUUID.mockReturnValue(true);
            const mockCart = {
                userId: 'user-id',
                Produits: [{ id: 'product-id', Panier_Produits: { quantity: 2 } }],
                setProduits: jest.fn()
            };
            Panier.findOne.mockResolvedValue(mockCart);
            const mockProduct = { id: 'product-id', stock: 5, nom: 'Test Product', save: jest.fn() };
            Produit.findByPk.mockResolvedValue(mockProduct);
            TempReservation.create.mockResolvedValue({});

            await reserveCart(req, res);

            expect(mockProduct.save).toHaveBeenCalled();
            expect(TempReservation.create).toHaveBeenCalled();
            expect(mockCart.setProduits).toHaveBeenCalledWith([]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Cart reserved successfully" });
        });
    });
});