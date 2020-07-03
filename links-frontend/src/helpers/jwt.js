export const getTokenExpire = (token) => {

    if(!token)return 0;

    try{
        const [, payload] = token.split('.');
        const data = JSON.parse(atob(payload));//Faz um parse de um base 64.
        const expires = data ? data.exp : 0;
        return expires;
    }catch(error){
        return 0;
    }
   
};