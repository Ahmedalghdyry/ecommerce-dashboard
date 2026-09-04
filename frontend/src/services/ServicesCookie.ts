import Cookies, { type CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();


class ServicesCookie {
    // git

    git(name: string ) {
        return cookies.get(name)
    }

    // set

    set(name: string, value: string, options?: CookieSetOptions) {
        cookies.set(name, value, options);
    }

    // Ramova
    ramova(name:string){
        return cookies.remove(name)
    }
}

export default new ServicesCookie()