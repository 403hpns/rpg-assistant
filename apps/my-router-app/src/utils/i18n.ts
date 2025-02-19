import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      index: {
        header: {
          badge: 'In-progress',
          heading: 'Your perfect RPG Assistant',
        },
      },
      login: {
        card: {
          title: 'Login',
          description: 'Enter credentials to log in into your account.',
          footer: {
            noAccountText: "Don't have an account?",
            noAccountCta: 'Sign up',
          },
        },
        form: {
          inputs: {
            name: {
              label: 'Username',
              placeholder: 'Enter username',
            },
            password: {
              label: 'Password',
              placeholder: 'Enter password',
            },
          },
          submit: 'Login',
        },
      },
      register: {
        card: {
          title: 'Sign up',
          description:
            'Enter credentials to create new account in application.',
        },
        form: {
          inputs: {
            name: {
              label: 'Username',
              placeholder: 'Enter username',
            },
            email: {
              label: 'E-mail',
              placeholder: 'Enter e-mail',
            },
            password: {
              label: 'Password',
              placeholder: 'Enter password',
            },
            confirmPassword: {
              label: 'Confirm password',
              placeholder: 'Enter password',
            },
          },
          submit: 'Register',
          back: 'Back to login',
        },
      },
    },
  },

  pl: {
    translation: {
      index: {
        header: {
          badge: 'W trakcie rozwoju',
          heading: 'Twój idealny Asystent RPG',
        },
      },
      login: {
        card: {
          title: 'Login',
          description: 'Wprowadź dane, aby zalogować się na swoje konto.',
          footer: {
            noAccountText: 'Nie masz konta?',
            noAccountCta: 'Zarejestruj się',
          },
        },
        form: {
          inputs: {
            name: {
              label: 'Nazwa użytkownika',
              placeholder: 'Podaj nazwę użytkownika',
            },
            password: {
              label: 'Hasło',
              placeholder: 'Podaj hasło',
            },
          },
          submit: 'Zaloguj się',
        },
      },
      register: {
        card: {
          title: 'Rejestracja',
          description: 'Wprowadź dane, aby zarejestrować konto w aplikacji.',
        },
        form: {
          inputs: {
            name: {
              label: 'Nazwa użytkownika',
              placeholder: 'Wprowadź nazwę użytkownika',
            },
            email: {
              label: 'E-mail',
              placeholder: 'Wprowadź e-mail',
            },
            password: {
              label: 'Hasło',
              placeholder: 'Wprowadź hasło',
            },
            confirmPassword: {
              label: 'Potwierdź hasło',
              placeholder: 'Wprowadź hasło',
            },
          },
          submit: 'Zarejestruj się',
          back: 'Wróć do logowania',
        },
      },
      panel: {},
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
