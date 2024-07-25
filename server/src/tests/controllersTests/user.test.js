import {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} from '../../controllers/userController.js';
import * as userService from '../../services/userService.js';
import { isValidUUID } from '../../helpers/validatorHelper.js';
import { isEmailAddressValid } from '../../helpers/emailAddressHelper.js';
import { isPasswordValid, comparePasswords } from '../../helpers/passwordHelper.js';

jest.mock('../../services/userService.js');
jest.mock('../../helpers/validatorHelper.js');
jest.mock('../../helpers/emailAddressHelper.js');
jest.mock('../../helpers/passwordHelper.js');

describe('User Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            user: { id: 'user-id', role: 'ROLE_USER' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        it('should return 400 if id is invalid', async () => {
            req.params.id = 'invalid-id';
            isValidUUID.mockReturnValue(false);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing user ID' });
        });

        it('should return 403 if user is not authorized', async () => {
            req.params.id = 'other-user-id';
            isValidUUID.mockReturnValue(true);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });

        it('should return 404 if user is not found', async () => {
            req.params.id = 'user-id';
            isValidUUID.mockReturnValue(true);
            userService.getUserById.mockResolvedValue(null);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });

        it('should return user if found', async () => {
            req.params.id = 'user-id';
            isValidUUID.mockReturnValue(true);
            const mockUser = { id: 'user-id', name: 'Test User' };
            userService.getUserById.mockResolvedValue(mockUser);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('getAllUsers', () => {
        it('should return 403 if user is not admin', async () => {
            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });

        it('should return 404 if no users found', async () => {
            req.user.role = 'ROLE_ADMIN';
            userService.getAllUsers.mockResolvedValue(null);

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Users not found' });
        });

        it('should return all users if found', async () => {
            req.user.role = 'ROLE_ADMIN';
            const mockUsers = [{ id: 'user1' }, { id: 'user2' }];
            userService.getAllUsers.mockResolvedValue(mockUsers);

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });
    });

    describe('updateUser', () => {
        beforeEach(() => {
            req.params.id = 'user-id';
            isValidUUID.mockReturnValue(true);
            userService.getUser.mockResolvedValue({ id: 'user-id', email: 'old@email.com' });
        });

        it('should return 400 if id is invalid', async () => {
            isValidUUID.mockReturnValue(false);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user ID format' });
        });

        it('should return 403 if user is not authorized', async () => {
            req.params.id = 'other-user-id';

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });

        it('should return 404 if user is not found', async () => {
            userService.getUser.mockResolvedValue(null);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });

        it('should return 400 if required fields are missing for admin update', async () => {
            req.user.role = 'ROLE_ADMIN';
            req.body = { nom: 'New Name' };

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing fields to update' });
        });

        it('should return 403 if admin tries to set role to ROLE_ADMIN', async () => {
            req.user.role = 'ROLE_ADMIN';
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', role: 'ROLE_ADMIN' };

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized role update' });
        });

        it('should return 403 if admin tries to set invalid role', async () => {
            req.user.role = 'ROLE_ADMIN';
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', role: 'INVALID_ROLE' };

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid role' });
        });

        it('should return 400 if email is invalid', async () => {
            req.user.role = 'ROLE_ADMIN';
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'invalid-email', telephone: '1234567890', role: 'ROLE_USER' };
            isEmailAddressValid.mockReturnValue(false);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
        });

        it('should return 409 if email already exists', async () => {
            req.user.role = 'ROLE_ADMIN';
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'existing@email.com', telephone: '1234567890', role: 'ROLE_USER' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue({ id: 'other-user-id' });

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
        });

        it('should update user as admin successfully', async () => {
            req.user.role = 'ROLE_ADMIN';
            const updatedUser = { id: 'user-id', nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', role: 'ROLE_USER' };
            req.body = updatedUser;
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            userService.adminUpdateUserById.mockResolvedValue(updatedUser);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });

        it('should return 400 if required fields are missing for user update', async () => {
            req.body = { nom: 'New Name' };

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing fields to update' });
        });

        it('should return 403 if user tries to update role', async () => {
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', password: 'oldpassword', role: 'ROLE_ADMIN' };

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });

        it('should return 400 if password is not strong enough', async () => {
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', password: 'weak', newPassword: 'newweak' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            isPasswordValid.mockReturnValue(false);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Password is not strong enough' });
        });

        it('should return 401 if old password is incorrect', async () => {
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', password: 'oldpassword' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            isPasswordValid.mockReturnValue(true);
            comparePasswords.mockResolvedValue(false);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
        });

        it('should return 400 if new password is provided without confirmation', async () => {
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', password: 'oldpassword', newPassword: 'newpassword' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            isPasswordValid.mockReturnValue(true);
            comparePasswords.mockResolvedValue(true);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing confirm password' });
        });

        it('should return 400 if new password and confirmation do not match', async () => {
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', password: 'oldpassword', newPassword: 'newpassword', confirmPassword: 'different' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            isPasswordValid.mockReturnValue(true);
            comparePasswords.mockResolvedValue(true);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Passwords do not match' });
        });

        it('should return 400 if new password is not strong enough', async () => {
            req.body = { nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890', password: 'oldpassword', newPassword: 'weak', confirmPassword: 'weak' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            isPasswordValid.mockImplementation((pw) => pw === 'oldpassword');
            comparePasswords.mockResolvedValue(true);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'The new password is not strong enough' });
        });

        it('should update user successfully', async () => {
            const updatedUser = { id: 'user-id', nom: 'New Name', prenom: 'New Prenom', email: 'new@email.com', telephone: '1234567890' };
            req.body = { ...updatedUser, password: 'oldpassword', newPassword: 'newStrongPassword', confirmPassword: 'newStrongPassword' };
            isEmailAddressValid.mockReturnValue(true);
            userService.getUserByEmail.mockResolvedValue(null);
            isPasswordValid.mockReturnValue(true);
            comparePasswords.mockResolvedValue(true);
            userService.updateUserById.mockResolvedValue(updatedUser);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });
    });

    describe('deleteUser', () => {
        beforeEach(() => {
            req.params.id = 'user-id';
            isValidUUID.mockReturnValue(true);
            userService.getUserById.mockResolvedValue({ id: 'user-id', role: 'ROLE_USER' });
        });

        it('should return 400 if id is invalid', async () => {
            isValidUUID.mockReturnValue(false);

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing user dsdsID' });
        });

        it('should return 403 if user is not authorized', async () => {
            req.params.id = 'other-user-id';

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        });
    });
});