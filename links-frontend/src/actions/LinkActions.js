import { apiPost, apiGet } from '../helpers/api';

export const LINK_CREATE = 'LINKS_CREATE';
export const LINK_LIST = 'LINK_LIST';

export const linkCreate = (data) => {

    const isSocial = !!data.isSocial; //Tranformando em BOOLEAN

    const payload = apiPost('/link', {...data, isSocial});

    return {type: LINK_CREATE, payload};
};

export const linkList = (data) => {

    const payload = apiGet('/link');

    return {type: LINK_LIST, payload};
};

