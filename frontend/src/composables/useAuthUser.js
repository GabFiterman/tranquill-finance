import { ref } from 'vue';
import useSupabase from 'boot/supabase';
// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

const useAuthUser = () => {
    const { supabase } = useSupabase();
    /**
     * Login with email and password
     */
    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return user;
    };

    /**
     * Login with google, github, etc
     */
    const loginWithSocialProvider = async (provider) => {
        const { user, error } = await supabase.auth.signIn({ provider });
        if (error) throw error;
        return user;
    };

    /**
     * Logout
     */
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    /**
     * Check if the user is logged in or not
     */
    const isLoggedIn = () => {
        return !!user.value;
    };

    /**
     * Register
     */

    const register = async ({ email, password }) => {
        // const { user, error } = await supabase.auth.signUp(
        //     { email, password },
        //     {
        //         data: meta,
        //         // TODO: Vou precisar refatorar o código e remover o SupabaseAuthClient.
        //         // por nada que esse redirect chega no email.. teria que ser pelo frontend mesmo .... Mas enfim, depois vou remover mesmo.
        //         redirectTo: 'http://localhost:9000/#/me',
        //     },
        // );
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            { redirect_to: 'http://localhost:9000/#/login' },
        );
        if (error) throw error;
        return user;
    };

    /**
     * Update user email, password, or meta data
     */
    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data);
        if (error) throw error;
        return user;
    };

    /**
     * Send user an email to reset their password
     * (ie. support "Forgot Password?")
     */
    const sendPasswordRestEmail = async (email) => {
        try {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:9000/#/reset-password/',
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    // NOTE: É duvidoso se realmente isso funciona, pois vezes sim vezes não. Acho que vou para o Firebase, fazer a API no futuro ... Algo assim.
    const resetPassword = async (new_Password) => {
        try {
            await supabase.auth.updateUser({ password: new_Password });
        } catch (error) {
            throw new Error(error);
        }
    };

    return {
        user,
        login,
        loginWithSocialProvider,
        isLoggedIn,
        logout,
        register,
        update,
        sendPasswordRestEmail,
        resetPassword,
        // maybeHandleEmailConfirmation,
    };
};

export default useAuthUser;
