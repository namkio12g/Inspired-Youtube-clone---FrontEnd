import Cookies from 'universal-cookie';
const cookies = new Cookies();
export function assignToken(token){
    cookies.set("token",token,{
        maxAge: 3600000,
    })
};
export function removeToken(token){
    cookies.remove("token", {
        path: '/'
    })
}
