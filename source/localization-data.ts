export const SUPPORTED_LANGUAGES: string[] = ['English', 'Deutsch', 'Français', 'Italiano'];

export interface LocalizationForSupportedLanguages {
    English: string;
    Deutsch: string;
    Français: string;
    Italiano: string;
}

export const LANDING_PAGE_LOCALIZATION = {
    password: {
        title: {
            English: "Log in",
            Deutsch: "Anmelden",
            Français: "S'identifier",
            Italiano: "Accedere"
        },
        email: {
            English: "Email",
            Deutsch: "E-Mail",
            Français: "E-Mail",
            Italiano: "Email"
        },
        password: {
            English: "Password",
            Deutsch: "Passwort",
            Français: "Mot de passe",
            Italiano: "Password"
        },
        forgotPassword: {
            English: "Forgot password?",
            Deutsch: "Passwort vergessen?",
            Français: "Mot de passe oublié?",
            Italiano: "Password dimenticata?"
        }
    }
}

export const loginWithPasswordTitle: LocalizationForSupportedLanguages = {
    English: "Log in",
    Deutsch: "Anmelden",
    Français: "S'identifier",
    Italiano: "Accedere"
}